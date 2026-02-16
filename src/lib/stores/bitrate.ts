import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const LOCALSTORAGE_KEY = 'bitrate';

const stored = browser ? (localStorage.getItem(LOCALSTORAGE_KEY) ?? null) : null;

export const bitrate = writable(isNaN(parseInt(stored ?? '')) ? null : stored);

bitrate.subscribe((n) =>
	browser ? localStorage.setItem(LOCALSTORAGE_KEY, n?.toString() ?? 'null') : null
);
