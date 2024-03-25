import type { Demo } from '@/types';

export const ContactService = {
	async getContacts() {
		const res = await fetch('/demo/data/contacts.json', {
			headers: { 'Cache-Control': 'no-cache' }
		});
		const d = await res.json();
		return d.data as Demo.Contact[];
	},
};
