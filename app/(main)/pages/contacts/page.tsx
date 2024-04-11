'use client';

import ContactsCreateForm from '@/ui-components/ContactsCreateForm';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { generateClient } from 'aws-amplify/data';
import { useEffect, useState } from 'react';
import type { Demo } from '@/types';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

const Items = () => {
	let emptyItem: Demo.Contact = {
		id: '',
		createdAt: '',
		updatedAt: '',
		name: '',
		phone: '',
		email: '',
		type: '',
		ssn: 0,
		ein: 0,
		dba: 0,
		notes: '',
	};

	const [item, setItem] = useState<Demo.Contact>(emptyItem);
	const [items, setItems] = useState<Demo.Contact[]>([]);
	const [itemCreateDialogVisible, setItemCreateDialogVisible] = useState(false);

	useEffect(() => {
		const sub = client.models.Contacts.observeQuery().subscribe(({ items }) => setItems([...items]));
		return () => sub.unsubscribe();
	}, []);

	const itemCreateDialog = () => {
		setItem(emptyItem);
		setItemCreateDialogVisible(true);
	};

	const itemCreateDialogHide = () => {
		setItemCreateDialogVisible(false);
	}

	const startToolbarTemplate = () => {
		return (
			<div className="my-2">
				<Button label="New" icon="pi pi-plus" severity="success" className="mr-2" onClick={itemCreateDialog} />
			</div>
		);
	};

	return (
		<div className="grid">
			<div className="col-12">
				<div className="card">
					<Toolbar className="mb-4" start={startToolbarTemplate}></Toolbar>
					<DataTable className="datatable-responsive" dataKey="id" emptyMessage="No items found." filterDisplay="row" multiSortMeta={[{ field: 'name', order: 1 }]} removableSort sortMode="multiple" value={items}>
						<Column selectionMode="multiple" headerStyle={{ width: '1rem' }}></Column>
						<Column sortable filter style={{ minWidth: '15rem' }} field="createdAt" header="Created" filterPlaceholder="Created" />
						<Column sortable filter style={{ minWidth: '15rem' }} field="updatedAt" header="Updated" filterPlaceholder="Updated" />
						<Column sortable filter style={{ minWidth: '15rem' }} field="name" header="Name" filterPlaceholder="Name" />
						<Column sortable filter style={{ minWidth: ' 1rem' }} field="phone" header="Phone" filterPlaceholder="Phone" />
						<Column sortable filter style={{ minWidth: ' 1rem' }} field="email" header="Email" filterPlaceholder="Email" />
						<Column sortable filter style={{ minWidth: ' 1rem' }} field="type" header="Type" filterPlaceholder="Type" />
						<Column sortable filter style={{ minWidth: ' 1rem' }} field="ssn" header="SSN" filterPlaceholder="SSN" />
						<Column sortable filter style={{ minWidth: ' 1rem' }} field="ein" header="EIN" filterPlaceholder="EIN" />
						<Column sortable filter style={{ minWidth: '15rem' }} field="dba" header="DBA" filterPlaceholder="DBA" />
						<Column sortable filter style={{ minWidth: '15rem' }} field="notes" header="Notes" filterPlaceholder="Notes" />
					</DataTable>
					<Dialog visible={itemCreateDialogVisible} style={{ width: '450px' }} header="Item Details" modal className="p-fluid" onHide={itemCreateDialogHide}>
						<ContactsCreateForm />
					</Dialog>
				</div>
			</div>
		</div>
	);
};

export default Items;
