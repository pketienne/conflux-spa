/* eslint-disable */
'use client';
import * as React from 'react';
import { Button, Flex, Grid, SelectField, TextField } from '@aws-amplify/ui-react';
import { fetchByPath, getOverrideProps, validateField } from './utils';
import { generateClient } from 'aws-amplify/api';
import { getContacts } from './graphql/queries';
import { updateContacts } from './graphql/mutations';
const client = generateClient();
export default function ContactsUpdateForm(props) {
	const { id: idProp, contacts: contactsModelProp, onSuccess, onError, onSubmit, onValidate, onChange, overrides, ...rest } = props;
	const initialValues = {
		name: '',
		phone: '',
		email: '',
		type: '',
		ssn: '',
		ein: '',
		dba: '',
		notes: '',
	};
	const [name, setName] = React.useState(initialValues.name);
	const [phone, setPhone] = React.useState(initialValues.phone);
	const [email, setEmail] = React.useState(initialValues.email);
	const [type, setType] = React.useState(initialValues.type);
	const [ssn, setSsn] = React.useState(initialValues.ssn);
	const [ein, setEin] = React.useState(initialValues.ein);
	const [dba, setDba] = React.useState(initialValues.dba);
	const [notes, setNotes] = React.useState(initialValues.notes);
	const [errors, setErrors] = React.useState({});
	const resetStateValues = () => {
		const cleanValues = contactsRecord ? { ...initialValues, ...contactsRecord } : initialValues;
		setName(cleanValues.name);
		setPhone(cleanValues.phone);
		setEmail(cleanValues.email);
		setType(cleanValues.type);
		setSsn(cleanValues.ssn);
		setEin(cleanValues.ein);
		setDba(cleanValues.dba);
		setNotes(cleanValues.notes);
		setErrors({});
	};
	const [contactsRecord, setContactsRecord] = React.useState(contactsModelProp);
	React.useEffect(() => {
		const queryData = async () => {
			const record = idProp
				? (
						await client.graphql({
							query: getContacts.replaceAll('__typename', ''),
							variables: { id: idProp },
						})
				  )?.data?.getContacts
				: contactsModelProp;
			setContactsRecord(record);
		};
		queryData();
	}, [idProp, contactsModelProp]);
	React.useEffect(resetStateValues, [contactsRecord]);
	const validations = {
		name: [],
		phone: [{ type: 'Phone' }],
		email: [{ type: 'Email' }],
		type: [],
		ssn: [],
		ein: [],
		dba: [],
		notes: [],
	};
	const runValidationTasks = async (fieldName, currentValue, getDisplayValue) => {
		const value = currentValue && getDisplayValue ? getDisplayValue(currentValue) : currentValue;
		let validationResponse = validateField(value, validations[fieldName]);
		const customValidator = fetchByPath(onValidate, fieldName);
		if (customValidator) {
			validationResponse = await customValidator(value, validationResponse);
		}
		setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
		return validationResponse;
	};
	return (
		<Grid
			as="form"
			rowGap="15px"
			columnGap="15px"
			padding="20px"
			onSubmit={async (event) => {
				event.preventDefault();
				let modelFields = {
					name: name ?? null,
					phone: phone ?? null,
					email: email ?? null,
					type: type ?? null,
					ssn: ssn ?? null,
					ein: ein ?? null,
					dba: dba ?? null,
					notes: notes ?? null,
				};
				const validationResponses = await Promise.all(
					Object.keys(validations).reduce((promises, fieldName) => {
						if (Array.isArray(modelFields[fieldName])) {
							promises.push(...modelFields[fieldName].map((item) => runValidationTasks(fieldName, item)));
							return promises;
						}
						promises.push(runValidationTasks(fieldName, modelFields[fieldName]));
						return promises;
					}, []),
				);
				if (validationResponses.some((r) => r.hasError)) {
					return;
				}
				if (onSubmit) {
					modelFields = onSubmit(modelFields);
				}
				try {
					Object.entries(modelFields).forEach(([key, value]) => {
						if (typeof value === 'string' && value === '') {
							modelFields[key] = null;
						}
					});
					await client.graphql({
						query: updateContacts.replaceAll('__typename', ''),
						variables: {
							input: {
								id: contactsRecord.id,
								...modelFields,
							},
						},
					});
					if (onSuccess) {
						onSuccess(modelFields);
					}
				} catch (err) {
					if (onError) {
						const messages = err.errors.map((e) => e.message).join('\n');
						onError(modelFields, messages);
					}
				}
			}}
			{...getOverrideProps(overrides, 'ContactsUpdateForm')}
			{...rest}
		>
			<TextField
				label="Name"
				isRequired={false}
				isReadOnly={false}
				value={name}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							name: value,
							phone,
							email,
							type,
							ssn,
							ein,
							dba,
							notes,
						};
						const result = onChange(modelFields);
						value = result?.name ?? value;
					}
					if (errors.name?.hasError) {
						runValidationTasks('name', value);
					}
					setName(value);
				}}
				onBlur={() => runValidationTasks('name', name)}
				errorMessage={errors.name?.errorMessage}
				hasError={errors.name?.hasError}
				{...getOverrideProps(overrides, 'name')}
			></TextField>
			<TextField
				label="Phone"
				isRequired={false}
				isReadOnly={false}
				type="tel"
				value={phone}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							name,
							phone: value,
							email,
							type,
							ssn,
							ein,
							dba,
							notes,
						};
						const result = onChange(modelFields);
						value = result?.phone ?? value;
					}
					if (errors.phone?.hasError) {
						runValidationTasks('phone', value);
					}
					setPhone(value);
				}}
				onBlur={() => runValidationTasks('phone', phone)}
				errorMessage={errors.phone?.errorMessage}
				hasError={errors.phone?.hasError}
				{...getOverrideProps(overrides, 'phone')}
			></TextField>
			<TextField
				label="Email"
				isRequired={false}
				isReadOnly={false}
				value={email}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							name,
							phone,
							email: value,
							type,
							ssn,
							ein,
							dba,
							notes,
						};
						const result = onChange(modelFields);
						value = result?.email ?? value;
					}
					if (errors.email?.hasError) {
						runValidationTasks('email', value);
					}
					setEmail(value);
				}}
				onBlur={() => runValidationTasks('email', email)}
				errorMessage={errors.email?.errorMessage}
				hasError={errors.email?.hasError}
				{...getOverrideProps(overrides, 'email')}
			></TextField>
			<SelectField
				label="Type"
				placeholder="Please select an option"
				isDisabled={false}
				value={type}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							name,
							phone,
							email,
							type: value,
							ssn,
							ein,
							dba,
							notes,
						};
						const result = onChange(modelFields);
						value = result?.type ?? value;
					}
					if (errors.type?.hasError) {
						runValidationTasks('type', value);
					}
					setType(value);
				}}
				onBlur={() => runValidationTasks('type', type)}
				errorMessage={errors.type?.errorMessage}
				hasError={errors.type?.hasError}
				{...getOverrideProps(overrides, 'type')}
			>
				<option children="Person" value="PERSON" {...getOverrideProps(overrides, 'typeoption0')}></option>
				<option children="Company" value="COMPANY" {...getOverrideProps(overrides, 'typeoption1')}></option>
			</SelectField>
			<TextField
				label="Ssn"
				isRequired={false}
				isReadOnly={false}
				type="number"
				step="any"
				value={ssn}
				onChange={(e) => {
					let value = isNaN(parseInt(e.target.value)) ? e.target.value : parseInt(e.target.value);
					if (onChange) {
						const modelFields = {
							name,
							phone,
							email,
							type,
							ssn: value,
							ein,
							dba,
							notes,
						};
						const result = onChange(modelFields);
						value = result?.ssn ?? value;
					}
					if (errors.ssn?.hasError) {
						runValidationTasks('ssn', value);
					}
					setSsn(value);
				}}
				onBlur={() => runValidationTasks('ssn', ssn)}
				errorMessage={errors.ssn?.errorMessage}
				hasError={errors.ssn?.hasError}
				{...getOverrideProps(overrides, 'ssn')}
			></TextField>
			<TextField
				label="Ein"
				isRequired={false}
				isReadOnly={false}
				type="number"
				step="any"
				value={ein}
				onChange={(e) => {
					let value = isNaN(parseInt(e.target.value)) ? e.target.value : parseInt(e.target.value);
					if (onChange) {
						const modelFields = {
							name,
							phone,
							email,
							type,
							ssn,
							ein: value,
							dba,
							notes,
						};
						const result = onChange(modelFields);
						value = result?.ein ?? value;
					}
					if (errors.ein?.hasError) {
						runValidationTasks('ein', value);
					}
					setEin(value);
				}}
				onBlur={() => runValidationTasks('ein', ein)}
				errorMessage={errors.ein?.errorMessage}
				hasError={errors.ein?.hasError}
				{...getOverrideProps(overrides, 'ein')}
			></TextField>
			<TextField
				label="Dba"
				isRequired={false}
				isReadOnly={false}
				value={dba}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							name,
							phone,
							email,
							type,
							ssn,
							ein,
							dba: value,
							notes,
						};
						const result = onChange(modelFields);
						value = result?.dba ?? value;
					}
					if (errors.dba?.hasError) {
						runValidationTasks('dba', value);
					}
					setDba(value);
				}}
				onBlur={() => runValidationTasks('dba', dba)}
				errorMessage={errors.dba?.errorMessage}
				hasError={errors.dba?.hasError}
				{...getOverrideProps(overrides, 'dba')}
			></TextField>
			<TextField
				label="Notes"
				isRequired={false}
				isReadOnly={false}
				value={notes}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							name,
							phone,
							email,
							type,
							ssn,
							ein,
							dba,
							notes: value,
						};
						const result = onChange(modelFields);
						value = result?.notes ?? value;
					}
					if (errors.notes?.hasError) {
						runValidationTasks('notes', value);
					}
					setNotes(value);
				}}
				onBlur={() => runValidationTasks('notes', notes)}
				errorMessage={errors.notes?.errorMessage}
				hasError={errors.notes?.hasError}
				{...getOverrideProps(overrides, 'notes')}
			></TextField>
			<Flex justifyContent="space-between" {...getOverrideProps(overrides, 'CTAFlex')}>
				<Button
					children="Reset"
					type="reset"
					onClick={(event) => {
						event.preventDefault();
						resetStateValues();
					}}
					isDisabled={!(idProp || contactsModelProp)}
					{...getOverrideProps(overrides, 'ResetButton')}
				></Button>
				<Flex gap="15px" {...getOverrideProps(overrides, 'RightAlignCTASubFlex')}>
					<Button children="Submit" type="submit" variation="primary" isDisabled={!(idProp || contactsModelProp) || Object.values(errors).some((e) => e?.hasError)} {...getOverrideProps(overrides, 'SubmitButton')}></Button>
				</Flex>
			</Flex>
		</Grid>
	);
}
