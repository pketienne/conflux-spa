import AppSubMenu from './AppSubMenu';
import type { MenuModel } from '@/types';

const AppMenu = () => {
	const model: MenuModel[] = [
		{
			label: 'Dashboards',
			items: [
				{
					label: 'Home',
					icon: 'pi pi-fw pi-home',
					to: '/',
				},
				{
					label: 'Timeclock',
					icon: 'pi pi-fw pi-clock',
					to: '/apps/timeclock',
				},
				{
					label: 'Projects',
					icon: 'pi pi-fw pi-check-square',
					items: [
						{
							label: 'Estimates',
							icon: 'pi pi-fw pi-eye',
							to: '/apps/',
						},
						{
							label: 'Actuals',
							icon: 'pi pi-fw pi-stopwatch',
							to: '/apps/',
						},
						{
							label: 'Invoices',
							icon: 'pi pi-fw pi-file-pdf',
							to: '/apps/',
						},
					]
				},
				{
					label: 'Accounting',
					icon: 'pi pi-fw pi-money-bill',
					items: [
						{
							label: 'Enter Expenses',
							icon: 'pi pi-fw pi-dollar',
							to: '/apps/accounting/enter-expenses',
						},
						{
							label: 'Bank Transactions',
							icon: 'pi pi-fw pi-file-import',
							to: '/apps/accounting/bank-transactions',
						},
						{
							label: 'Match Expenses',
							icon: 'pi pi-fw pi-arrow-right-arrow-left',
							to: '/apps/blog/detail',
						},
					]
				},
				{
					label: 'Reporting',
					icon: 'pi pi-fw pi-chart-bar',
					to: '/dashboards/timeclock',
				},
			],
		},
		{
			label: 'Administration',
			items: [
				{
					label: 'Retool CSV Import',
					icon: 'pi pi-fw pi-file-import',
					to: '/apps/import',
				},
			],
		},
	];

	return <AppSubMenu model={model} />;
}

export default AppMenu;
