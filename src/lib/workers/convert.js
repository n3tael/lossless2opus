import Module from '$lib/wasm/opusenc.js';

self.onmessage = async (e) => {
	const { input_bytes, bitrate } = e.data;
	const opusenc = await Module({
		preRun: [
			(module) => {
				module.FS.writeFile('in', input_bytes);
			}
		],
		printErr: (text) => {
			if (text.startsWith('Error:')) {
				self.postMessage({ type: 1, data: text });
				return;
			}

			let match = /\] {1,2}([0-9]{1,2})%/.exec(text);
			let number = match?.[1] ? parseInt(match[1]) : NaN;

			if (number) self.postMessage({ type: 2, data: number });
		},
		onExit: (code) => {
			if (code !== 0) {
				self.postMessage({ type: 1, data: `Process exited with code ${code}` });
				return;
			}

			const result = opusenc.FS.readFile("out");

			opusenc.FS.unlink('in');
			opusenc.FS.unlink('out');
			
			self.postMessage({
				type: 0,
				data: result
			}, [result.buffer]);
		}
	});

	await opusenc.callMain(['--bitrate', bitrate + 'k', 'in', 'out']);
};
