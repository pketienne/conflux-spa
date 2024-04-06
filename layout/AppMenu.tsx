import AppSubMenu from './AppSubMenu';
import type { MenuModel } from '@/types';

const AppMenu = () => {
	const model: MenuModel[] = [
		{
			label: 'Dashboards',
			items: [
				{
					label: 'Construction Jobs',
					icon: 'pi pi-fw pi-home',
				},
				{
					label: 'Property Management',
					icon: 'pi pi-fw pi-building',
				},
				{
					label: 'Web Services',
					icon: 'pi pi-fw pi-server',
				},
			],
		},
		{
			label: 'Apps',
			items: [
				{
					label: 'Accounting',
					icon: 'pi pi-fw pi-money-bill',
					items: [
						{
							label: 'Chart of Accounts',
							icon: 'pi pi-fw pi-briefcase',
						},
						{
							label: 'Expenses',
							icon: 'pi pi-fw pi-dollar',
						},
						{
							label: 'Transactions',
							icon: 'pi pi-fw pi-dollar',
						},
					],
				},
				{
					label: 'Calendar',
					icon: 'pi pi-fw pi-calendar',
				},
				{
					label: 'Contacts',
					icon: 'pi pi-fw pi-user',
					to: '/pages/contacts',
				},
				{
					label: 'Documents',
					icon: 'pi pi-fw pi-file',
				},
				{
					label: 'Fleet',
					icon: 'pi pi-fw pi-truck',
				},
				{
					label: 'Helpdesk',
					icon: 'pi pi-fw pi-question-circle',
				},
				{
					label: 'Inventory',
					icon: 'pi pi-fw pi-box',
				},
				{
					label: 'Knowledge',
					icon: 'pi pi-fw pi-book',
				},
				{
					label: 'Maintenance',
					icon: 'pi pi-fw pi-wrench',
				},
				{
					label: 'Passwords',
					icon: 'pi pi-fw pi-lock-open',
				},
				{
					label: 'Projects',
					icon: 'pi pi-fw pi-check',
				},
				{
					label: 'Rentals',
					icon: 'pi pi-fw pi-key',
				},
				{
					label: 'Repairs',
					icon: 'pi pi-fw pi-wrench',
				},
			],
		},
		{
			label: 'Other',
			icon: 'pi pi-fw pi-download',
			items: [
				{
					label: 'Documentation',
					icon: 'pi pi-fw pi-info-circle',
				},
			],
		},
	];

	return <AppSubMenu model={model} />;
};

export default AppMenu;
