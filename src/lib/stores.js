import { writable } from 'svelte/store';

export const selectedAgency = writable('All');

export let hazardAddress= writable('');

export let searchQuery=writable('');