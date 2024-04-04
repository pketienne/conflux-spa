'use client';

import { withAuthenticator } from '@aws-amplify/ui-react';
import TodoList from '@/components/TodoList';
import '@aws-amplify/ui-react/styles.css';

function App() {
	return (
		<>
			<h1>Hello, Amplify 👋</h1>
			<TodoList />
		</>
	);
}

export default withAuthenticator(App);
