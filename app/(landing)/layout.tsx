import { Metadata } from 'next';
import React from 'react';
import AppConfig from '../../layout/AppConfig';

interface LandingLayoutProps {
	children: React.ReactNode;
}

export const metadata: Metadata = {
	title: 'PrimeReact Freya',
	description: 'The ultimate collection of design-agnostic, flexible and accessible React UI Components.',
};

export default function LandingLayout({ children }: LandingLayoutProps) {
	return (
		<React.Fragment>
			{children}
			<AppConfig minimal></AppConfig>
		</React.Fragment>
	);
}
