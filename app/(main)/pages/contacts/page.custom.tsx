'use client';

import ContactsCreateForm from '@/ui-components/ContactsCreateForm';
import ContactsUpdateForm from '@/ui-components/ContactsUpdateForm';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { generateClient } from 'aws-amplify/data';
import { FilterMatchMode } from 'primereact/api';
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

	const [items, setItems] = useState<Demo.Contact[]>([]);
	const [itemDialog, setItemDialog] = useState(false);
	const [deleteItemDialog, setDeleteItemDialog] = useState(false);
	const [deleteItemsDialog, setDeleteItemsDialog] = useState(false);
	const [item, setItem] = useState(emptyItem);
	const [selectedItems, setSelectedItems] = useState<Demo.Contact[]>([]);
	const [submitted, setSubmitted] = useState(false);
	const [globalFilter, setGlobalFilter] = useState('');
	const toast = useRef<Toast | null>(null);
	const dt = useRef<DataTable<any>>(null);
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
		updatedAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
		name: { value: null, matchMode: FilterMatchMode.CONTAINS },
		phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
		email: { value: null, matchMode: FilterMatchMode.CONTAINS },
		type: { value: null, matchMode: FilterMatchMode.CONTAINS },
		ssn: { value: null, matchMode: FilterMatchMode.CONTAINS },
		ein: { value: null, matchMode: FilterMatchMode.CONTAINS },
		dba: { value: null, matchMode: FilterMatchMode.CONTAINS },
		notes: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	useEffect(() => {
		const sub = client.models.Contacts.observeQuery().subscribe(({ items }) => setItems([...items]));
		return () => sub.unsubscribe();
	}, []);

	const openNew = () => {
		setItem(emptyItem);
		setSubmitted(false);
		setItemDialog(true);
	};

	const hideDialog = () => {
		setSubmitted(false);
		setItemDialog(false);
	};

	const hideDeleteItemDialog = () => {
		setDeleteItemDialog(false);
	};

	const hideDeleteItemsDialog = () => {
		setDeleteItemsDialog(false);
	};

	const saveItem = () => {
		setSubmitted(true);

		if (item.name.trim()) {
			let _items = [...items];
			let _item = { ...item };
			if (item.id) {
				const index = findIndexById(item.id);

				_items[index] = _item;
				toast.current?.show({
					severity: 'success',
					summary: 'Successful',
					detail: 'Item Updated',
					life: 3000,
				});
			} else {
				_item.id = createId();
				_items.push(_item);
				toast.current?.show({
					severity: 'success',
					summary: 'Successful',
					detail: 'Item Created',
					life: 3000,
				});
			}

			setItems(_items);
			setItemDialog(false);
			setItem(emptyItem);
		}
	};

	const editItem = (item: Demo.Contact) => {
		setItem({ ...item });
		setItemDialog(true);
	};

	const confirmDeleteItem = (item: Demo.Contact) => {
		setItem(item);
		setDeleteItemDialog(true);
	};

	const deleteItem = async () => {
		let _items = items.filter((val) => val.id !== item.id);
		console.log(_items);
		setItems(_items);
		setDeleteItemDialog(false);
		setItem(emptyItem);
		// const { data: deletedItem, errors } = await client.models.Contacts.delete(_items)

		toast.current?.show({
			severity: 'success',
			summary: 'Successful',
			detail: 'Item Deleted',
			life: 3000,
		});
	};

	const findIndexById = (id: string) => {
		let index = -1;
		for (let i = 0; i < items.length; i++) {
			if (items[i].id === id) {
				index = i;
				break;
			}
		}
		return index;
	};

	const createId = () => {
		let id = '';
		let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < 5; i++) {
			id += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return id;
	};

	const exportCSV = () => {
		dt.current?.exportCSV();
	};

	const confirmDeleteSelected = () => {
		setDeleteItemsDialog(true);
	};

	const deleteSelectedItems = () => {
		let _items = items?.filter((val) => !selectedItems.includes(val));
		setItems(_items);
		setDeleteItemsDialog(false);
		setSelectedItems([]);
		toast.current?.show({
			severity: 'success',
			summary: 'Successful',
			detail: 'Items Deleted',
			life: 3000,
		});
	};

	const startToolbarTemplate = () => {
		return (
			<React.Fragment>
				<div className="my-2">
					<Button label="New" icon="pi pi-plus" severity="success" className="mr-2" onClick={openNew} />
					<Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedItems || !selectedItems.length} />
				</div>
			</React.Fragment>
		);
	};

	const endToolbarTemplate = () => {
		return (
			<React.Fragment>
				<FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
				<Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
			</React.Fragment>
		);
	};

	const actionBodyTemplate = (rowData: Demo.Contact) => {
		return (
			<>
				<Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editItem(rowData)} />
				<Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteItem(rowData)} />
			</>
		);
	};

	const header = (
		<div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
			<h5 className="m-0">Manage Items</h5>
			<span className="block mt-2 md:mt-0 p-input-icon-left">
				<i className="pi pi-search" />
				<InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search..." />
			</span>
		</div>
	);

	const itemDialogFooter = (
		<>
			<Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" text onClick={saveItem} />
		</>
	);
	const deleteItemDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" text onClick={hideDeleteItemDialog} />
			<Button label="Yes" icon="pi pi-check" text onClick={deleteItem} />
		</>
	);
	const deleteItemsDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" text onClick={hideDeleteItemsDialog} />
			<Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedItems} />
		</>
	);

	const blah = () => {
		console.log(item);
	};

	return (
		<div className="grid crud-demo">
			<div className="col-12">
				<div className="card">
					<Toast ref={toast} />
					<Toolbar className="mb-4" start={startToolbarTemplate} end={endToolbarTemplate}></Toolbar>
					<DataTable
						className="datatable-responsive"
						dataKey="id"
						emptyMessage="No items found."
						filterDisplay="row"
						filters={filters}
						globalFilter={globalFilter}
						header={header}
						multiSortMeta={[{ field: 'name', order: 1 }]}
						onSelectionChange={(e) => setSelectedItems(e.value)}
						ref={dt}
						removableSort
						selection={selectedItems}
						sortMode="multiple"
						value={items}
					>
						<Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
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

					<Dialog visible={itemDialog} style={{ width: '450px' }} header="Item Details" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
						{/* <ContactsCreateForm /> */}
						<ContactsUpdateForm id={item.id} contacts={item} />
					</Dialog>

					<Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
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
