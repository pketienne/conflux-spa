'use client';
import { Suspense } from 'react';
import AppMailLayout from '../../../../demo/components/apps/mail/AppMailLayout';

interface AppMailLayoutProps {
	children: React.ReactNode;
}

export default function AppLayout({ children }: AppMailLayoutProps) {
	return (
		<Suspense>
			<AppMailLayout>{children}</AppMailLayout>
		</Suspense>
	);
}
