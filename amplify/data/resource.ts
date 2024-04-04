import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
	Contacts: a
		.model({
			name: a.string(),
			phone: a.phone(),
			email: a.email(),
			type: a.enum(['PERSON', 'COMPANY']),
			ssn: a.integer(),
			ein: a.integer(),
			dba: a.string(),
			notes: a.string(),
		})
		.authorization([a.allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: 'userPool',
	},
});
