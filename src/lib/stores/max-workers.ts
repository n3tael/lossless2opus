import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const LOCALSTORAGE_KEY = 'max-workers';

const stored = browser ? parseInt(localStorage.getItem(LOCALSTORAGE_KEY) ?? '') : 1;

export const maxWorkers = writable(isNaN(stored) ? (navigator.hardwareConcurrency ?? 1) : stored);

maxWorkers.subscribe((n) =>
	browser ? localStorage.setItem(LOCALSTORAGE_KEY, n.toString()) : null
);
