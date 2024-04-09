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

	const [createItemDialog, setCreateItemDialog] = useState(false);
	const [deleteItemDialog, setDeleteItemDialog] = useState(false);
	const [item, setItem] = useState<Demo.Contact>(emptyItem);
	const [items, setItems] = useState<Demo.Contact[]>([]);

	useEffect(() => {
		const sub = client.models.Contacts.observeQuery().subscribe(({ items }) => setItems([...items]));
		return () => sub.unsubscribe();
	}, []);

	const createItem = () => {
		setItem(emptyItem);
		setCreateItemDialog(true);
	};

	const deleteItem = (item: Demo.Contact) => {
		setItem(item);
		setDeleteItemDialog(true);
	};

	const hideCreateItemDialog = () => {
		setCreateItemDialog(false);
	}

	const hideDeleteItemDialog = () => {
		setDeleteItemDialog(false);
	}

	const startToolbarTemplate = () => {
		return (
			<>
				<div className="my-2">
					<Button label="New" icon="pi pi-plus" severity="success" className="mr-2" onClick={createItem} />
				</div>
			</>
		);
	};

	const actionBodyTemplate = (data: Demo.Contact) => {
		return (
			<>
				<Button icon="pi pi-trash" severity="warning" rounded onClick={() => deleteItem(item)} />
			</>
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
						<Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
					</DataTable>
					<Dialog visible={createItemDialog} style={{ width: '450px' }} modal className="p-fluid" onHide={hideCreateItemDialog} header="Contact Details">
						<ContactsCreateForm />
					</Dialog>
					<Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal onHide={hideDeleteItemDialog}>
						<div className="flex align-items-center justify-content-center">
							<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
							{item && (
								<span>
									Are you sure you want to delete <b>{item.name}</b>?
								</span>
							)}
						</div>
					</Dialog>

				</div>
			</div>
		</div>
	);
};

export default Items;
