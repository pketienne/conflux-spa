/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContacts = /* GraphQL */ `
	query GetContacts($id: ID!) {
		getContacts(id: $id) {
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
export const listContacts = /* GraphQL */ `
	query ListContacts($filter: ModelContactsFilterInput, $limit: Int, $nextToken: String) {
		listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
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
			nextToken
			__typename
		}
	}
`;
