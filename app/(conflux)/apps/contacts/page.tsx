'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ContactService } from '@/demo/service/ContactService';
import { Dropdown } from 'primereact/dropdown';
import type { Demo } from '@/types';
import { cookiesClient } from '@/utils/amplify-utils';

const Crud = () => {
	let emptyContact = {
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
	const [contactDialog, setContactDialog] = useState(false);
	const [deleteContactDialog, setDeleteContactDialog] = useState(false);
	const [deleteContactsDialog, setDeleteContactsDialog] = useState(false);
	const [contact, setContact] = useState(emptyContact);
	const [selectedContacts, setSelectedContacts] = useState<Demo.Contact[]>([]);
	const [submitted, setSubmitted] = useState(false);
	const [globalFilter, setGlobalFilter] = useState('');
	const toast = useRef<Toast | null>(null);
	const dt = useRef<DataTable<any>>(null);
	const [selectedCity, setSelectedCity] = useState('');

	const { data: contacts } = await cookiesClient.models.Contacts.list();

	useEffect(() => {
		ContactService.getContacts().then((data) => setContacts(data));
	}, []);

	// const formatCurrency = (value: number) => {
	// 	return value.toLocaleString('en-US', {
	// 		style: 'currency',
	// 		currency: 'USD'
	// 	});
	// };

	const openNew = () => {
		setContact(emptyContact);
		setSubmitted(false);
		setContactDialog(true);
	};

	const hideDialog = () => {
		setSubmitted(false);
		setContactDialog(false);
	};

	const hideDeleteContactDialog = () => {
		setDeleteContactDialog(false);
	};

	const hideDeleteContactsDialog = () => {
		setDeleteContactsDialog(false);
	};

	const saveContact = () => {
		setSubmitted(true);

		if (contact.name.trim()) {
			let _contacts = [...contacts];
			let _contact = { ...contact };
			if (contact.id) {
				const index = findIndexById(contact.id);

				_contacts[index] = _contact;
				toast.current?.show({
					severity: 'success',
					summary: 'Successful',
					detail: 'Contact Updated',
					life: 3000
				});
			} else {
				_contact.id = createId();
				_contact.code = createId();
				_contact.image = 'contact-placeholder.svg';
				_contacts.push(_contact);
				toast.current?.show({
					severity: 'success',
					summary: 'Successful',
					detail: 'Contact Created',
					life: 3000
				});
			}

			setContacts(_contacts);
			setContactDialog(false);
			setContact(emptyContact);
		}
	};

	const editContact = (contact: Demo.Contact) => {
		setContact({ ...contact });
		setContactDialog(true);
	};

	const confirmDeleteContact = (contact: Demo.Contact) => {
		setContact(contact);
		setDeleteContactDialog(true);
	};

	const deleteContact = () => {
		let _contacts = contacts.filter((val) => val.id !== contact.id);
		setContacts(_contacts);
		setDeleteContactDialog(false);
		setContact(emptyContact);
		toast.current?.show({
			severity: 'success',
			summary: 'Successful',
			detail: 'Contact Deleted',
			life: 3000
		});
	};

	const findIndexById = (id: string) => {
		let index = -1;
		for (let i = 0; i < contacts.length; i++) {
			if (contacts[i].id === id) {
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
		setDeleteContactsDialog(true);
	};

	const deleteSelectedContacts = () => {
		let _contacts = contacts?.filter((val) => !selectedContacts.includes(val));
		setContacts(_contacts);
		setDeleteContactsDialog(false);
		setSelectedContacts([]);
		toast.current?.show({
			severity: 'success',
			summary: 'Successful',
			detail: 'Contacts Deleted',
			life: 3000
		});
	};

	const onCategoryChange = (e: RadioButtonChangeEvent) => {
		let _contact = { ...contact };
		_contact['type'] = e.value;
		setContact(_contact);
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
		const val = (e.target && e.target.value) || '';
		let _contact = { ...contact };
		_contact[`${name}`] = val;

		setContact(_contact);
	};

	const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
		const val = e.value || 0;
		let _contact = { ...contact };
		_contact[`${name}`] = val;

		setContact(_contact);
	};

	const startToolbarTemplate = () => {
		return (
			<React.Fragment>
				<div className="my-2">
					<Button label="New" icon="pi pi-plus" severity="success" className="mr-2" onClick={openNew} />
					<Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedContacts || !selectedContacts.length} />
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

	const codeBodyTemplate = (rowData: Demo.Contact) => {
		return (
			<>
				<span className="p-column-title">ID</span>
				{rowData.id}
			</>
		);
	};

	const nameBodyTemplate = (rowData: Demo.Contact) => {
		return (
			<>
				<span className="p-column-title">Name</span>
				{rowData.name}
			</>
		);
	};

	// const imageBodyTemplate = (rowData: Demo.Contact) => {
	// 	return (
	// 		<>
	// 			<span className="p-column-title">Image</span>
	// 			<img src={`/demo/images/contact/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
	// 		</>
	// 	);
	// };

	// const priceBodyTemplate = (rowData: Demo.Contact) => {
	// 	return (
	// 		<>
	// 			<span className="p-column-title">Price</span>
	// 			{/* {formatCurrency(rowData.price as number)} */}
	// 		</>
	// 	);
	// };

	const ssnBodyTemplate = (rowData: Demo.Contact) => {
		return (
			<>
				<span className="p-column-title">SSN</span>
				{rowData.ssn as number}
			</>
		);
	};

	// const categoryBodyTemplate = (rowData: Demo.Contact) => {
	// 	return (
	// 		<>
	// 			<span className="p-column-title">type</span>
	// 			{rowData.category}
	// 		</>
	// 	);
	// };

	const typeBodyTemplate = (rowData: Demo.Contact) => {
		return (
			<>
				<span className="p-column-title">Type</span>
				{rowData.type}
			</>
		);
	};

	const phoneBodyTemplate = (rowData: Demo.Contact) => {
		return (
			<>
				<span className="p-column-title">Phone</span>
				{rowData.phone}
			</>
		);
	};

	const emailBodyTemplate = (rowData: Demo.Contact) => {
		return (
			<>
				<span className="p-column-title">Email</span>
				{rowData.email}
			</>
		);
	};

	const dbaBodyTemplate = (rowData: Demo.Contact) => {
		return (
			<>
				<span className="p-column-title">DBA</span>
				{rowData.dba}
			</>
		);
	};

	const einBodyTemplate = (rowData: Demo.Contact) => {
		return (
			<>
				<span className="p-column-title">EIN</span>
				{rowData.ein}
			</>
		);
	};

	// const ratingBodyTemplate = (rowData: Demo.Contact) => {
	// 	return (
	// 		<>
	// 			<span className="p-column-title">Reviews</span>
	// 			<Rating value={rowData.rating} readOnly cancel={false} />
	// 		</>
	// 	);
	// };

	// const statusBodyTemplate = (rowData: Demo.Contact) => {
	// 	return (
	// 		<>
	// 			<span className="p-column-title">Status</span>
	// 			<span className={`contact-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>
	// 		</>
	// 	);
	// };

	const actionBodyTemplate = (rowData: Demo.Contact) => {
		return (
			<>
				<Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editContact(rowData)} />
				<Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteContact(rowData)} />
			</>
		);
	};

	const header = (
		<div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
			<h5 className="m-0">Manage Contacts</h5>
			<span className="block mt-2 md:mt-0 p-input-icon-left">
				<i className="pi pi-search" />
				<InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search..." />
			</span>
		</div>
	);

	const contactDialogFooter = (
		<>
			<Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" text onClick={saveContact} />
		</>
	);
	const deleteContactDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" text onClick={hideDeleteContactDialog} />
			<Button label="Yes" icon="pi pi-check" text onClick={deleteContact} />
		</>
	);
	const deleteContactsDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" text onClick={hideDeleteContactsDialog} />
			<Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedContacts} />
		</>
	);

	return (
		<div className="grid crud-demo">
			<div className="col-12">
				<div className="card">
					<Toast ref={toast} />
					<Toolbar className="mb-4" start={startToolbarTemplate} end={endToolbarTemplate}></Toolbar>

					<DataTable
						ref={dt}
						value={contacts}
						selection={selectedContacts}
						onSelectionChange={(e) => setSelectedContacts(e.value)}
						dataKey="id"
						// paginator
						// rows={10}
						// rowsPerPageOptions={[5, 10, 25]}
						// className="datatable-responsive"
						// paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
						currentPageReportTemplate="Showing {first} to {last} of {totalRecords} contacts"
						globalFilter={globalFilter}
						emptyMessage="No contacts found."
						header={header}
						// responsiveLayout="scroll"
						size="small"
					>
						<Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
						<Column field="id" header="ID" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
						<Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
						{/* <Column header="Image" body={imageBodyTemplate}></Column> */}
						{/* <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column> */}
						{/* <Column field="category" header="Category" sortable body={categoryBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column> */}
						{/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column> */}
						{/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column> */}
						<Column field="phone" header="Phone" sortable body={phoneBodyTemplate} headerStyle={{ minWidth: '8rem' }}></Column>
						<Column field="email" header="Email" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
						<Column field="type" header="Type" sortable body={typeBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
						<Column field="ssn" header="SSN" sortable body={ssnBodyTemplate} headerStyle={{ minWidth: '8rem' }}></Column>
						<Column field="ein" header="EIN" sortable body={einBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
						<Column field="dba" header="DBA" sortable body={dbaBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
						<Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
					</DataTable>

					<Dialog visible={contactDialog} style={{ width: '650px' }} header="Contact Details" modal className="p-fluid" footer={contactDialogFooter} onHide={hideDialog}>
						{/* {contact.image && <img src={`/demo/images/contact/${contact.image}`} alt={contact.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
						<div className="field">
							<label className="mb-3">Type</label>
							<div className="formgrid grid">
								<div className="field-radiobutton col-6">
									<RadioButton inputId="person" name="type" value="person" onChange={onCategoryChange} checked={contact.type === 'Person'} />
									<label htmlFor="category1">Person</label>
								</div>
								<div className="field-radiobutton col-6">
									<RadioButton inputId="company" name="type" value="company" onChange={onCategoryChange} checked={contact.type === 'Company'} />
									<label htmlFor="category2">Company</label>
								</div>
							</div>
						</div>

						<div className="formgrid grid">
							<div className="field col">
								<label htmlFor="name">Name</label>
								<InputText id="name" value={contact.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !contact.name })} />
							</div>
							<div className="field col">
								<label htmlFor="dba">DBA</label>
								<InputText id="dba" value={contact.dba} onChange={(e) => onInputChange(e, 'dba')} required autoFocus className={classNames({ 'p-invalid': submitted && !contact.dba })} />
							</div>
						</div>

						<div className="formgrid grid">
							<div className="field col">
								<label htmlFor="phone">Phone</label>
								{/* <InputText id="phone" value={contact.phone} onChange={(e) => onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !contact.phone})} /> */}
								<InputNumber value={contact.phone} onValueChange={(e) => onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !contact.phone })} useGrouping={false} />
								{/* <InputNumber value={contact.phone + ' blatherskite'} onValueChange={(e) => onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !contact.phone })} useGrouping={false} /> */}
							</div>
							<div className="field col">
								<label htmlFor="email">Email</label>
								<InputText id="email" value={contact.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !contact.email })} />
							</div>
						</div>

						<div className="formgrid grid">
							<div className="field col">
								<label htmlFor="price">SSN</label>
								{/* <InputText id="ssn" value={contact.ssn} onChange={(e) => onInputChange(e, 'ssn')} required autoFocus className={classNames({ 'p-invalid': submitted && !contact.ssn})} /> */}
								<InputNumber value={contact.ssn} onValueChange={(e) => onInputChange(e, 'ssn')} required autoFocus className={classNames({ 'p-invalid': submitted && !contact.ssn})} useGrouping={false} />
							</div>
							<div className="field col">
								<label htmlFor="quantity">EIN</label>
								{/* <InputText id="ein" value={contact.ein} onChange={(e) => onInputChange(e, 'ein')} required autoFocus className={classNames({ 'p-invalid': submitted && !contact.ein})} /> */}
								<InputNumber value={contact.ein} onValueChange={(e) => onInputChange(e, 'ein')} required autoFocus className={classNames({ 'p-invalid': submitted && !contact.ein})} useGrouping={false} />
							</div>
						</div>

						<div className="field">
							<label htmlFor="description">Notes</label>
							<InputTextarea id="notes" value={contact.notes} onChange={(e) => onInputChange(e, 'notes')} required rows={3} cols={20} />
						</div>
					</Dialog>

					<Dialog visible={deleteContactDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteContactDialogFooter} onHide={hideDeleteContactDialog}>
						<div className="flex align-items-center justify-content-center">
							<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
							{contact && (
								<span>
									Are you sure you want to delete <b>{contact.name}</b>?
								</span>
							)}
						</div>
					</Dialog>

					<Dialog visible={deleteContactsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteContactsDialogFooter} onHide={hideDeleteContactsDialog}>
						<div className="flex align-items-center justify-content-center">
							<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
							{contact && <span>Are you sure you want to delete the selected contacts?</span>}
						</div>
					</Dialog>
				</div>
			</div>
		</div>
	);
};

export default Crud;
