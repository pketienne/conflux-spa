import type { Metadata } from 'next';
import AppConfig from '../../layout/AppConfig';
import React from 'react';
import '@aws-amplify/ui-react/styles.css';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';

interface FullPageLayoutProps {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function FullPageLayout({ children }: FullPageLayoutProps) {
	return (
		<React.Fragment>
			<ConfigureAmplifyClientSide />
			{children}
			<AppConfig minimal />
		</React.Fragment>
	);
}
