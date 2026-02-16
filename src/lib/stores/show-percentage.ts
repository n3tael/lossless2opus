import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const LOCALSTORAGE_KEY = 'show-percentage';

const stored = browser ? Boolean(localStorage.getItem(LOCALSTORAGE_KEY) ?? true) : true;

export const showPercentage = writable(stored);

showPercentage.subscribe((n) =>
	browser ? localStorage.setItem(LOCALSTORAGE_KEY, n.toString()) : null
);
