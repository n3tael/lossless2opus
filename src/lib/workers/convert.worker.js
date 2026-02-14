import Module from '$lib/wasm/opusenc.js';

function waitFor(conditionFunction, interval = 100) {
	const poll = (resolve) => {
		if (conditionFunction()) {
			resolve();
		} else {
			setTimeout((_) => poll(resolve), interval);
		}
	};
	return new Promise(poll);
}

self.onmessage = async (e) => {
	const { input_file, bitrate } = e.data;
	const arrayBuffer = await input_file.arrayBuffer();

	let done = false;

	const opusenc = await Module({
		print: (text) => {
			self.postMessage({ type: 'debug', value: text });
		},
		printErr: (text) => {
			if (text.startsWith('Error:')) {
				self.postMessage({ type: 'error', value: text });
				return;
			}

			self.postMessage({ type: 'debug', value: text });

			let match = /\] {1,2}([0-9]{1,2})%/gm.exec(text);

			if (match && !Number.isNaN(parseInt(match[1]))) {
				self.postMessage({ type: 'progress', value: match[1] });
			}

			if (text.includes('Encoding complete')) {
				done = true;
				return;
			}
		}
	});

	await opusenc.FS.writeFile('input', new Uint8Array(arrayBuffer));

	await opusenc.callMain(['--bitrate', bitrate + 'k', 'input', 'output']);

	await waitFor(() => done === true);
	const outputFile = await opusenc.FS.readFile('output');

	self.postMessage(
		{
			type: 'done',
			data: outputFile
		},
		[outputFile.buffer]
	);
};
