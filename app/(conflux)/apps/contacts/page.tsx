'use client'
import React, { useRef, useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ContactService } from '@/demo/service/ContactService'
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import type { Demo } from '@/types';


const Crud = () => {
	let emptyContact= {
		id: null,
		name: '',
		ssn: 0,
		phone: 0,
		email: '',
		type: '',
		ein: 0,
		dba: '',
		notes: ''
	};

	const [contacts, setContacts] = useState<Demo.Contact[]>([]);
	const [contact, setContact] = useState<Demo.Contact>(emptyContact);
	const [contactDialog, setContactDialog] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [filters, setFilters] = useState<DataTableFilterMeta>({
		id: { value: null, matchMode: FilterMatchMode.CONTAINS },
		name: { value: null, matchMode: FilterMatchMode.CONTAINS },
		ssn: { value: null, matchMode: FilterMatchMode.CONTAINS },
		phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
		email: { value: null, matchMode: FilterMatchMode.CONTAINS },
		type: { value: null, matchMode: FilterMatchMode.CONTAINS },
		ein: { value: null, matchMode: FilterMatchMode.CONTAINS },
		dba: { value: null, matchMode: FilterMatchMode.CONTAINS },
		notes: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	useEffect(() => {
		ContactService.getItems().then((data) => setContacts(data));
		setLoading(false);
	}, []);

	const onCellEditComplete = (e) => {
		let { rowData, newValue, field, originalEvent: event } = e;
		if (newValue.trim().length > 0) rowData[field] = newValue;
		event.preventDefault();
	};

	const cellEditor = (options) => {
		return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
	}

	const openNew = () => {
		setContacts(emptyContact);
		setSubmitted(false);
		setContactDialog(true);
	};

	const hideDialog = () => {
		setSubmitted(false);
		setContactDialog(false);
	}

	const confirmDeleteSelected = () => {};
	const selectedProducts = () => {};
	const exportCSV = () => {};

	const startToolbarTemplate = () => {
		return (
			<div className="flex flex-wrap gap-2">
				<Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
				<Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
			</div>
		);
	};

	const endToolbarTemplate = () => {
		return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
	};

	const contactDialogFooter = () => {
		<React.Fragment>
			<Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" onClick={saveContact} />
		</React.Fragment>		
	}

	const saveContact = () => {
		setSubmitted(true);
	}

	const onInputChange = () => {}

	return (
		<div className="grid crud-demo">
			<div className="col-12">
				<div className="card">
					<Toolbar className="mb-4" start={startToolbarTemplate} end={endToolbarTemplate}></Toolbar>
					<DataTable
						value={contacts}
						header="Contacts"
						size="small"
						dataKey="id"
						sortMode="multiple"
						multiSortMeta={[{field: 'name', order: 1}]}
						removableSort
						filters={filters}
						filterDisplay="row"
						editMode="cell"
						loading={loading}
					>
						<Column selectionMode="multiple" exportable={false}></Column>
						<Column filter sortable field="id" header="ID" filterPlaceholder="id" filterField="id" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column filter sortable field="name" header="Name" filterPlaceholder="name" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column filter sortable field="ssn" header="SSN" filterPlaceholder="ssn" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column filter sortable field="phone" header="Phone" filterPlaceholder="phone" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column filter sortable field="email" header="Email" filterPlaceholder="email" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column filter sortable field="type" header="Type" filterPlaceholder="type" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column filter sortable field="ein" header="EIN" filterPlaceholder="ein" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column filter sortable field="dba" header="DBA" filterPlaceholder="dba" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column filter field="notes" header="Notes" filterPlaceholder="notes" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
					</DataTable>
				</div>
			</div>
			<Dialog modal visible={true} header="New Contact" className="col-9" onHide={hideDialog} footer={contactDialogFooter}>
				<div className="card">
					<DataTable value={[emptyContact]}>
						<Column field="name" header="Name" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column field="ssn" header="SSN" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column field="phone" header="Phone" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column field="email" header="Email" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column field="type" header="Type" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column field="ein" header="EIN" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column field="dba" header="DBA" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
						<Column field="notes" header="Notes" editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
					</DataTable>
				</div>
			</Dialog>
		</div>
	)
}

export default Crud;
