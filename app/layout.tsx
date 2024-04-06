'use client';

import { LayoutProvider } from '@/layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import ConfigureAmplifyClientSide from '@/components/ConfigureAmplify';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import '@/styles/layout/layout.scss';
import '@/styles/demo/demo.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link id="theme-link" href={`/theme/theme-dark/teal/theme.css`} rel="stylesheet"></link>
			</head>
			<body>
				<ConfigureAmplifyClientSide />
				<PrimeReactProvider>
					<LayoutProvider>{children}</LayoutProvider>
				</PrimeReactProvider>
			</body>
		</html>
	);
}
