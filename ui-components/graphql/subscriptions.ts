/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateContacts = /* GraphQL */ `
	subscription OnCreateContacts($filter: ModelSubscriptionContactsFilterInput, $owner: String) {
		onCreateContacts(filter: $filter, owner: $owner) {
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
export const onDeleteContacts = /* GraphQL */ `
	subscription OnDeleteContacts($filter: ModelSubscriptionContactsFilterInput, $owner: String) {
		onDeleteContacts(filter: $filter, owner: $owner) {
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
export const onUpdateContacts = /* GraphQL */ `
	subscription OnUpdateContacts($filter: ModelSubscriptionContactsFilterInput, $owner: String) {
		onUpdateContacts(filter: $filter, owner: $owner) {
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
