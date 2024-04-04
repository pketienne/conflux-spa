'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const client = generateClient<Schema>();

export default function ContactList() {
	const [contacts, setContacts] = useState<Schema['Contacts'][]>([]);

	useEffect(() => {
		const sub = client.models.Contacts.observeQuery().subscribe(({ items }) => setContacts([...items]));

		return () => sub.unsubscribe();
	}, []);

	async function addContact(data: FormData) {
		const { errors, data: newContact } = await client.models.Contacts.create({
			name: data.get('name') as string,
			phone: data.get('phone') as string,
			email: data.get('email') as string,
			type: data.get('type') as 'PERSON' | 'COMPANY',
			ssn: data.get('ssn') as number | null,
			ein: data.get('ein') as number | null,
			dba: data.get('dba') as string,
			notes: data.get('notes') as string,
		});
		console.log(errors, newContact);
	}

	return (
		<div>
			<h1>Contacts</h1>
			<DataTable value={contacts}>
				<Column field="id" />
				<Column field="createdAt" />
				<Column field="updatedAt" />
				<Column field="name" />
				<Column field="phone" />
				<Column field="email" />
				<Column field="type" />
				<Column field="ssn" />
				<Column field="ein" />
				<Column field="dba" />
				<Column field="notes" />
			</DataTable>
			<br />
			<form action={addContact}>
				<input type="text" placeholder="name" name="name" />
				<br />
				<input type="text" placeholder="phone" name="phone" />
				<br />
				<input type="text" placeholder="email" name="email" />
				<br />
				<select id="type" name="type">
					<option value="PERSON">Person</option>
					<option value="COMPANY">Company</option>
				</select>
				<br />
				<input type="text" placeholder="ssn" name="ssn" />
				<br />
				<input type="text" placeholder="ein" name="ein" />
				<br />
				<input type="text" placeholder="dba" name="dba" />
				<br />
				<input type="text" placeholder="notes" name="notes" />
				<br />
				<button type="submit" value="submit">
					Add Contact
				</button>
			</form>
		</div>
	);
}
