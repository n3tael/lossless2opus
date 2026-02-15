import Module from '$lib/wasm/opusenc.js';

self.onmessage = async () => {
	const opusenc = await Module({
		print: (text) => self.postMessage({ version: text })
	});

	await opusenc.callMain(['-V']);
};
