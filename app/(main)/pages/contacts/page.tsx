'use client';

import ContactsCreateForm from '@/ui-components/ContactsCreateForm';
import ContactsUpdateForm from '@/ui-components/ContactsUpdateForm';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { generateClient } from 'aws-amplify/data';
import { useEffect, useRef, useState } from 'react';
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
	const [itemUpdateDialogVisible, setItemUpdateDialogVisible] = useState(false);
	const [itemDeleteDialogVisible, setItemDeleteDialogVisible] = useState(false);
	const toast = useRef<Toast | null>(null);

	useEffect(() => {
		const sub = client.models.Contacts.observeQuery().subscribe(({ items }) => setItems([...items]));
		return () => sub.unsubscribe();
	}, []);

	const itemDeleteAPI = async () => {
		const { data: deletedItem, errors } = await client.models.Contacts.delete(item);
		setItemDeleteDialogVisible(false);
		setItem(emptyItem);
		toast.current?.show({
			severity: 'success',
			summary: 'Successful',
			detail: 'Item Deleted',
			life: 3000,
		});
	};

	const itemCreateDialogShow = () => {
		setItem(emptyItem);
		setItemCreateDialogVisible(true);
	};

	const itemCreateDialogHide = () => {
		setItemCreateDialogVisible(false);
	};

	const itemUpdateDialogShow = (item: Demo.Contact) => {
		setItem(item);
		setItemUpdateDialogVisible(true);
	};

	const itemUpdateDialogHide = () => {
		setItemUpdateDialogVisible(false);
	};

	const itemDeleteDialogShow = (item: Demo.Contact) => {
		setItem(item);
		setItemDeleteDialogVisible(true);
	};

	const itemDeleteDialogHide = () => {
		setItemDeleteDialogVisible(false);
	};

	const itemDeleteDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" text onClick={itemDeleteDialogHide} />
			<Button label="Yes" icon="pi pi-check" text onClick={itemDeleteAPI} />
		</>
	);

	const startToolbarTemplate = () => {
		return (
			<div className="my-2">
				<Button label="New" icon="pi pi-plus" severity="success" className="mr-2" onClick={itemCreateDialogShow} />
			</div>
		);
	};

	const actionBodyTemplate = (item: Demo.Contact) => {
		return (
			<>
				<Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => itemUpdateDialogShow(item)} />
				<Button icon="pi pi-trash" severity="warning" rounded onClick={() => itemDeleteDialogShow(item)} />
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

					<Dialog visible={itemCreateDialogVisible} style={{ width: '450px' }} header="Item Details" modal className="p-fluid" onHide={itemCreateDialogHide}>
						<ContactsCreateForm />
					</Dialog>

					<Dialog visible={itemUpdateDialogVisible} style={{ width: '450px' }} header="Item Details" modal className="p-fluid" onHide={itemUpdateDialogHide}>
						<ContactsUpdateForm id={item.id} contacts={item} />
					</Dialog>

					<Dialog visible={itemDeleteDialogVisible} style={{ width: '450px' }} header="Confirm" modal footer={itemDeleteDialogFooter} onHide={itemDeleteDialogHide}>
						<div className="flex align-items-center justify-content-center">
							<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
							{item && <span>Are you sure you want to delete the selected products?</span>}
						</div>
					</Dialog>
				</div>
			</div>
		</div>
	);
};

export default Items;
