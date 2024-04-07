/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContacts = /* GraphQL */ `
	mutation CreateContacts($condition: ModelContactsConditionInput, $input: CreateContactsInput!) {
		createContacts(condition: $condition, input: $input) {
			createdAt
			dba
			ein
			email
			id
			name
			notes
			owner
			phone
			ssn
			type
			updatedAt
			__typename
		}
	}
`;
export const deleteContacts = /* GraphQL */ `
	mutation DeleteContacts($condition: ModelContactsConditionInput, $input: DeleteContactsInput!) {
		deleteContacts(condition: $condition, input: $input) {
			createdAt
			dba
			ein
			email
			id
			name
			notes
			owner
			phone
			ssn
			type
			updatedAt
			__typename
		}
	}
`;
export const updateContacts = /* GraphQL */ `
	mutation UpdateContacts($condition: ModelContactsConditionInput, $input: UpdateContactsInput!) {
		updateContacts(condition: $condition, input: $input) {
			createdAt
			dba
			ein
			email
			id
			name
			notes
			owner
			phone
			ssn
			type
			updatedAt
			__typename
		}
	}
`;
