export function downloadObject(filename: string, url: string) {
	const a = document.createElement('a');
	a.style.display = 'none';

	a.download = filename;
	a.href = url;

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);

	URL.revokeObjectURL(url);
}
