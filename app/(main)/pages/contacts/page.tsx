'use client';

import ContactList from '@/components/ContactList';

function Contacts() {
	return (
		<div className="grid">
			<div className="col-12">
				<div className="card">
					<ContactList />
				</div>
			</div>
		</div>
	);
}

export default Contacts;
