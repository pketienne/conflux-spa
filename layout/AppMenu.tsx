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
					to: '/dashboards/ecommerce'
				},
				{
					label: 'Property Management',
					icon: 'pi pi-fw pi-building',
					to: '/dashboards/property-management'
				},
				{
					label: 'Web Services',
					icon: 'pi pi-fw pi-server',
					to: '/dashboards/saas'
				}
			]
		},
		{
			label: 'Apps',
			items: [
				{
					label: 'Accounting',
					icon: 'pi pi-fw pi-money-bill',
					to: '/apps/accounting',
					items: [
						{
							label: 'Chart of Accounts',
							icon: 'pi pi-fw pi-briefcase',
							to: '/apps/accounting/chart-of-accounts'
						},
						{
							label: 'Expenses',
							icon: 'pi pi-fw pi-dollar',
							to: '/apps/accounting/expenses'
						},
						{
							label: 'Transactions',
							icon: 'pi pi-fw pi-dollar',
							to: '/apps/accounting/import-transactions'
						}
					]
				},
				{
					label: 'Calendar',
					icon: 'pi pi-fw pi-calendar',
					to: '/apps/calendar'
				},
				{
					label: 'Contacts',
					icon: 'pi pi-fw pi-user',
					to: '/apps/contacts'
				},
				{
					label: 'Documents',
					icon: 'pi pi-fw pi-file',
					to: '/apps/documents'
				},
				{
					label: 'Fleet',
					icon: 'pi pi-fw pi-truck',
					to: '/apps/fleet'
				},
				{
					label: 'Helpdesk',
					icon: 'pi pi-fw pi-question-circle',
					to: '/apps/helpdesk'
				},
				{
					label: 'Inventory',
					icon: 'pi pi-fw pi-box',
					to: '/apps/inventory'
				},
				{
					label: 'Knowledge',
					icon: 'pi pi-fw pi-book',
					to: '/apps/knowledge'
				},
				{
					label: 'Maintenance',
					icon: 'pi pi-fw pi-wrench',
					to: '/apps/maintenance'
				},
				{
					label: 'Passwords',
					icon: 'pi pi-fw pi-lock-open',
					to: '/apps/projects'
				},
				{
					label: 'Projects',
					icon: 'pi pi-fw pi-check',
					to: '/apps/projects'
				},
				{
					label: 'Rentals',
					icon: 'pi pi-fw pi-key',
					to: '/apps/rentals'
				},
				{
					label: 'Repairs',
					icon: 'pi pi-fw pi-wrench',
					to: '/apps/repairs'
				}
			]
		},
		{
			label: 'Other',
			icon: 'pi pi-fw pi-download',
			items: [
				{
					label: 'Documentation',
					icon: 'pi pi-fw pi-info-circle',
					to: '/documentation'
				}
			]
		}
	];

	return <AppSubMenu model={model} />;
};

export default AppMenu;
