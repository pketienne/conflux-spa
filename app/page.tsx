'use client';

import { withAuthenticator } from '@aws-amplify/ui-react';
import ContactList from '@/components/ContactList';
import '@aws-amplify/ui-react/styles.css';

function App() {
	return (
		<>
			<h1>Hello, Amplify 👋</h1>
			<br />
			<ContactList />
		</>
	);
}

export default withAuthenticator(App);
