'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import type { Demo } from '@/types';

const client = generateClient<Schema>();

export default function ContactList() {
	const toast = useRef<Toast | null>(null);
	const [contacts, setContacts] = useState<Schema['Contacts'][]>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const [selectedContacts, setSelectedContacts] = useState<Schema['Contacts'][]>([]);
	const [rowClick, setRowClick] = useState(true);
	const [filters, setFilters] = useState({
		global:			{ value: null, matchMode: FilterMatchMode.CONTAINS },
		createdAt:	{ value: null, matchMode: FilterMatchMode.CONTAINS },
		updatedAt:	{ value: null, matchMode: FilterMatchMode.CONTAINS },
		name:				{ value: null, matchMode: FilterMatchMode.CONTAINS },
		phone:			{ value: null, matchMode: FilterMatchMode.CONTAINS },
		email:			{ value: null, matchMode: FilterMatchMode.CONTAINS },
		type:				{ value: null, matchMode: FilterMatchMode.CONTAINS },
		ssn:				{ value: null, matchMode: FilterMatchMode.CONTAINS },
		ein:				{ value: null, matchMode: FilterMatchMode.CONTAINS },
		dba:				{ value: null, matchMode: FilterMatchMode.CONTAINS },
		notes:			{ value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	useEffect(() => {
		const sub = client.models.Contacts.observeQuery().subscribe(({ items }) => setContacts([...items]));
		return () => sub.unsubscribe();
	}, []);

	async function addContact(data: FormData) {
		const { errors, data: newContact } = await client.models.Contacts.create({
			name:		data.get('name')	as string,
			phone:	data.get('phone')	as string,
			email:	data.get('email')	as string,
			type:		data.get('type')	as 'PERSON' | 'COMPANY',
			ssn:		data.get('ssn')		as number | null,
			ein:		data.get('ein')		as number | null,
			dba:		data.get('dba')		as string,
			notes:	data.get('notes')	as string,
		});
		console.log(errors, newContact);
	}

	const startToolbarTemplate = () => {
		return (
			<React.Fragment>
				<div className="my-2">
					<Button label="New" icon="pi pi-plus" severity="success" className="mr-2" />
					<Button label="Delete" icon="pi pi-trash" severity="danger" />
				</div>
			</React.Fragment>
		);
	};

	const endToolbarTemplate = () => {
		return (
			<React.Fragment>
				<FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
				<Button label="Export" icon="pi pi-upload" severity="help" />
			</React.Fragment>
		);
	};
	
	const header = (
		<div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
			<h5 className="m-0">Manage Products</h5>
			<span className="block mt-2 md:mt-0 p-input-icon-left">
				<i className="pi pi-search" />
				<InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search..." />
			</span>
		</div>
	);

	const actionBodyTemplate = (rowData: Demo.Product) => {
		return (
			<>
				<Button icon="pi pi-pencil" rounded severity="success" className="mr-2" />
				<Button icon="pi pi-trash" severity="warning" rounded />
			</>
		);
	};

	return (
		<>
			<Toast ref={toast} />
			<Toolbar className="mb-4" start={startToolbarTemplate} end={endToolbarTemplate}></Toolbar>
			<DataTable
				className="datatable-responsive"
				dataKey="id"
				filterDisplay="row"
				filters={filters}
				globalFilter={globalFilter}
				header={header}
				multiSortMeta={[{field: 'name', order: 1}]}
				onSelectionChange={(e) => setSelectedContacts(e.value)}
				removableSort
				selection={selectedContacts}
				selectionMode={rowClick ? null: 'checkbox'}
				sortMode="multiple"
				value={contacts}
			>
				<Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
				{/* <Column sortable filter style={{ minWidth: '15rem' }} field="createdAt"	header="Created"	filterPlaceholder="Created" /> */}
				{/* <Column sortable filter style={{ minWidth: '15rem' }} field="updatedAt"	header="Updated"	filterPlaceholder="Updated" /> */}
				<Column sortable filter style={{ minWidth: '15rem' }} field="name"			header="Name"			filterPlaceholder="Name" />
				<Column sortable filter style={{ minWidth: ' 1rem' }} field="phone"			header="Phone"		filterPlaceholder="Phone" />
				<Column sortable filter style={{ minWidth: ' 1rem' }} field="email"			header="Email"		filterPlaceholder="Email" />
				<Column sortable filter style={{ minWidth: ' 1rem' }} field="type"			header="Type"			filterPlaceholder="Type" />
				<Column sortable filter style={{ minWidth: ' 1rem' }} field="ssn"				header="SSN"			filterPlaceholder="SSN" />
				<Column sortable filter style={{ minWidth: ' 1rem' }} field="ein"				header="EIN"			filterPlaceholder="EIN" />
				<Column sortable filter style={{ minWidth: '15rem' }} field="dba"				header="DBA"			filterPlaceholder="DBA" />
				<Column sortable filter style={{ minWidth: '15rem' }} field="notes"			header="Notes"		filterPlaceholder="Notes" />
				<Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
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
		</>
	);
}
