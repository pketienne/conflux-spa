'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { ChartData, ChartOptions } from 'chart.js';
import { ObjectUtils, classNames } from 'primereact/utils';
import { Demo } from '../../../../types/demo';
import { useMountEffect, useUnmountEffect } from 'primereact/hooks';
import { Toast } from 'primereact/toast';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Carousel } from 'primereact/carousel';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { TabPanel, TabView } from 'primereact/tabview';
import { AutoComplete } from 'primereact/autocomplete';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Messages } from 'primereact/messages';

let chartData: ChartData;
let usdChartData: ChartData;
let btcChartData: ChartData;
let poundChartData: ChartData;
let pieData: ChartData;
let dailyData;
let weeklyData;
let monthlyData: ChartData;

interface IDateRange {
    name?: string;
    code?: string;
}
interface ISubscription {
    image?: string;
    accountNo?: string;
    name?: string;
    amount?: number;
    due?: string;
}
interface ITransaction {
    image?: string;
    accountNo?: string;
    action?: string;
    name?: string;
    amount?: number;
}
interface IAccount {
    photo?: string;
    accountNo?: string;
    name?: string;
}

interface ICard {
    logo?: string;
    cardNo?: string;
    validDate?: string;
    name?: string;
}

export default function Banking() {
    const dateRange: IDateRange[] = [
        { name: 'Daily', code: 'DAY' },
        { name: 'Weekly', code: 'WEEK' },
        { name: 'Monthly', code: 'MONTH' }
    ];
    const dateRange2: IDateRange[] = [
        { name: 'Last 7 Days', code: '7day' },
        { name: 'Last 30 Days', code: '30day' },
        { name: 'Last 90 Days', code: '90day' }
    ];
    const [chartOptions, setChartOptions] = useState<ChartOptions>({});
    const [pieOptions, setPieOptions] = useState<ChartOptions>({});
    const [filteredAccounts, setFilteredAccounts] = useState<IAccount[] | null>(null);
    const [filteredSubscriptions, setFilteredSubscription] = useState<ISubscription[] | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
    const [selectedSubscription, setSelectedSubscription] = useState<ISubscription | null>(null);
    const [selectedDate, setSelectedDate] = useState<IDateRange | null>(dateRange[2]);
    const [selectedDate2, setSelectedDate2] = useState<IDateRange | null>(dateRange2[0]);
    const [isHidden, setIsHidden] = useState(false);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [cards, setCards] = useState<ICard[]>([
        {
            logo: '/layout/images/logo-freya-single.svg',
            cardNo: '5454-5454-9999-8888',
            validDate: '05/28',
            name: 'John Doe'
        },
        {
            logo: '/layout/images/logo-freya-single.svg',
            cardNo: '5454-5454-9999-7777',
            validDate: '08/26',
            name: 'John Doe'
        }
    ]);
    const [selectedCard, setSelectedCard] = useState<ICard | null>(null);
    const [cardno, setCardNo] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [cardName, setCardName] = useState('');
    const [cvv, setCvv] = useState('');
    const [inputValue, setInputValue] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const toast = useRef(null);
    const barChartRef = useRef<Chart | null>(null);
    const pieChartRef = useRef<Chart | null>(null);
    const msgs = useRef<Messages | null>(null);
    const dt = useRef<DataTable<ITransaction[]> | null>(null);
    const op1 = useRef(null);
    const op2 = useRef(null);
    const op3 = useRef(null);
    const { layoutConfig } = useContext(LayoutContext);

    const transactions: ITransaction[] = [
        {
            image: '/demo/images/avatar/amyelsner.png',
            accountNo: '** 4848',
            action: 'Bank Transfer',
            name: 'Amy Elsner',
            amount: 112.0
        },
        {
            image: '/demo/images/avatar/annafali.png',
            accountNo: '** 4848',
            action: 'Bank Transfer',
            name: 'Anna Fali',
            amount: -112.0
        },
        {
            image: '/demo/images/dashboard/brands/netflix-logo.png',
            accountNo: '** 4848',
            action: 'Subscription Payment',
            name: 'Netflix Subscription',
            amount: -48.0
        },
        {
            image: '',
            accountNo: '** 4848',
            action: 'Bill Payment',
            name: 'Electric Bill',
            amount: -48.0
        },
        {
            image: '/demo/images/avatar/ivanmagalhaes.png',
            accountNo: '** 4848',
            action: 'Bank Transfer',
            name: 'Ivan Magalhaes',
            amount: -112.0
        },
        {
            image: '/demo/images/avatar/stephenshaw.png',
            accountNo: '** 4848',
            action: 'Bank Transfer',
            name: 'Stephen Shaw',
            amount: 112.0
        }
    ];

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const accounts: IAccount[] = [
        {
            photo: '/demo/images/avatar/amyelsner.png',
            accountNo: '** 4848',
            name: 'Amy Elsner'
        },
        {
            photo: '/demo/images/avatar/annafali.png',
            accountNo: '** 4848',
            name: 'Anna Fali'
        },
        {
            photo: '/demo/images/avatar/bernardodominic.png',
            accountNo: '** 4848',
            name: 'Bernardo Dominic'
        },
        {
            photo: '/demo/images/avatar/ivanmagalhaes.png',
            accountNo: '** 4848',
            name: 'Ivan Magalhaes'
        },
        {
            photo: '/demo/images/avatar/stephenshaw.png',
            accountNo: '** 4848',
            name: 'Stephen Shaw'
        }
    ];
    const subscriptions: ISubscription[] = [
        {
            image: '',
            accountNo: '548268',
            name: 'Electric Bill',
            amount: 15,
            due: 'close'
        },
        {
            image: '/demo/images/dashboard/brands/hbo-logo.png',
            accountNo: '845152848',
            name: 'TV Subscription',
            amount: 120,
            due: ''
        },
        {
            image: '/demo/images/dashboard/brands/netflix-logo.png',
            accountNo: '659815523',
            name: 'Netflix Subscription',
            amount: 48,
            due: 'close'
        },
        {
            image: '/demo/images/dashboard/brands/harvard-logo.png',
            accountNo: '*6585122',
            name: 'Education Payment',
            amount: 45,
            due: 'late'
        }
    ];
    const items = [
        {
            icon: 'pi pi-refresh',
            label: 'Re-send or Pay'
        },
        {
            icon: 'pi pi-external-link',
            label: 'Details'
        },
        {
            icon: 'pi pi-download',
            label: 'Download doc'
        }
    ];
    const getChartData = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Income',
                    data: [8000, 8100, 5600, 5500, 4000, 6500, 5900, 8000, 8100, 5600, 5500, 4000],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-300') || '#90cd93',
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: '#4caf5061',
                    borderRadius: 6
                },
                {
                    label: 'Expenses',
                    data: [1200, 5100, 6200, 3300, 2100, 6200, 4500, 1200, 5100, 6200, 3300, 2100],
                    borderColor: documentStyle.getPropertyValue('--red-300') || '#e47e7e',
                    backgroundColor: '#ff3d3238',
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };
    };
    const getUsdChartData = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Euro to US Dollar',
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color') || '#8adcd3',
                    borderColor: documentStyle.getPropertyValue('--primary-light-color') || '#8adcd3',
                    data: [1.1, 1.12, 1.15, 1.18, 1.2, 1.25, 1.3],
                    barThickness: 10
                }
            ]
        };
    };
    const getBtcChartData = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Bitcoin to US Dollar',
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color') || '#8adcd3',
                    borderColor: documentStyle.getPropertyValue('--primary-light-color') || '#8adcd3',
                    data: [35000, 40000, 45000, 55000, 60000, 65000, 60000],
                    barThickness: 10
                }
            ]
        };
    };
    const getPoundChartData = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'GBP to US Dollar',
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color') || '#8adcd3',
                    borderColor: documentStyle.getPropertyValue('--primary-light-color') || '#8adcd3',
                    data: [1.3, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6],
                    barThickness: 10
                }
            ]
        };
    };
    const getPiedata = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dee2e6';
        return {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [300, 50, 100, 80],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-300') || '#6dd3c8',
                        documentStyle.getPropertyValue('--orange-300') || '#f9ae61',
                        documentStyle.getPropertyValue('--green-300') || '#90cd93',
                        documentStyle.getPropertyValue('--cyan-300') || '#61d5e4'
                    ],
                    borderColor: surfaceBorder
                }
            ]
        };
    };
    const getDailyData = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        return {
            labels: [
                'Day 1',
                'Day 2',
                'Day 3',
                'Day 4',
                'Day 5',
                'Day 6',
                'Day 7',
                'Day 8',
                'Day 9',
                'Day 10',
                'Day 11',
                'Day 12',
                'Day 13',
                'Day 14',
                'Day 15',
                'Day 16',
                'Day 17',
                'Day 18',
                'Day 19',
                'Day 20',
                'Day 21',
                'Day 22',
                'Day 23',
                'Day 24',
                'Day 25',
                'Day 26',
                'Day 27',
                'Day 28',
                'Day 29',
                'Day 30'
            ],
            datasets: [
                {
                    label: 'Income',
                    data: [100, 200, 150, 50, 75, 150, 200, 250, 300, 400, 350, 500, 550, 700, 600, 650, 550, 450, 350, 300, 250, 200, 150, 100, 50, 75, 150, 200, 250],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-300') || '#90cd93',
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: '#4caf5061',
                    borderRadius: 6
                },
                {
                    label: 'Expenses',
                    data: [75, 150, 100, 200, 250, 300, 350, 400, 450, 550, 600, 650, 550, 700, 600, 550, 350, 400, 300, 250, 200, 150, 100, 50, 75, 150, 200, 250, 300],
                    borderColor: documentStyle.getPropertyValue('--red-300') || '#e47e7e',
                    backgroundColor: '#ff3d3238',
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };
    };
    const getWeeklyData = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        return {
            labels: [
                'Week 1',
                'Week 2',
                'Week 3',
                'Week 4',
                'Week 5',
                'Week 6',
                'Week 7',
                'Week 8',
                'Week 9',
                'Week 10',
                'Week 11',
                'Week 12',
                'Week 13',
                'Week 14',
                'Week 15',
                'Week 16',
                'Week 17',
                'Week 18',
                'Week 19',
                'Week 20',
                'Week 21',
                'Week 22',
                'Week 23',
                'Week 24'
            ],
            datasets: [
                {
                    label: 'Income',
                    data: [2500, 2000, 1500, 1000, 500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 6000, 5000, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 500],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-300') || '#90cd93',
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: '#4caf5061',
                    borderRadius: 6
                },
                {
                    label: 'Expenses',
                    data: [1500, 1000, 500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 6000, 5000, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 500, 2000, 2500],
                    borderColor: documentStyle.getPropertyValue('--red-300') || '#e47e7e',
                    backgroundColor: '#ff3d3238',
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };
    };
    const getMonthlyChartData = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Income',
                    data: [8000, 8100, 5600, 5500, 4000, 6500, 5900, 8000, 8100, 5600, 5500, 4000],
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--green-300') || '#90cd93',
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: '#4caf5061',
                    borderRadius: 6
                },
                {
                    label: 'Expenses',
                    data: [1200, 5100, 6200, 3300, 2100, 6200, 4500, 1200, 5100, 6200, 3300, 2100],
                    borderColor: documentStyle.getPropertyValue('--red-300') || '#e47e7e',
                    backgroundColor: '#ff3d3238',
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };
    };

    const onDateChangePieChart = (e: DropdownChangeEvent) => {
        const documentStyle = getComputedStyle(document.documentElement);
        setSelectedDate2(e.value);

        const last30Data = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [300, 50, 100, 80],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-300') || '#6dd3c8',
                        documentStyle.getPropertyValue('--orange-300') || '#f9ae61',
                        documentStyle.getPropertyValue('--green-300') || '#90cd93',
                        documentStyle.getPropertyValue('--cyan-300') || '#61d5e4'
                    ]
                }
            ]
        };

        const last7Data = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [450, 50, 200, 120],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-300') || '#6dd3c8',
                        documentStyle.getPropertyValue('--orange-300') || '#f9ae61',
                        documentStyle.getPropertyValue('--green-300') || '#90cd93',
                        documentStyle.getPropertyValue('--cyan-300') || '#61d5e4'
                    ]
                }
            ]
        };

        const last90Data = {
            labels: ['Entertainment', 'Platform', 'Shopping', 'Transfers'],
            datasets: [
                {
                    data: [30, 200, 150, 20],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--primary-300') || '#6dd3c8',
                        documentStyle.getPropertyValue('--orange-300') || '#f9ae61',
                        documentStyle.getPropertyValue('--green-300') || '#90cd93',
                        documentStyle.getPropertyValue('--cyan-300') || '#61d5e4'
                    ]
                }
            ]
        };

        let newPieData = { ...pieData };
        switch (e.value.code) {
            case '7day':
                newPieData = last7Data;
                break;
            case '30day':
                newPieData = last30Data;
                break;
            case '90day':
                newPieData = last90Data;
                break;
            default:
                break;
        }
        pieData = newPieData;
        pieChartRef.current?.refresh();
    };
    const onDateChangeBarChart = (e: any) => {
        setSelectedDate(e.value);

        monthlyData = getMonthlyChartData();
        weeklyData = getWeeklyData();
        dailyData = getDailyData();

        let newBarData = { ...chartData };
        switch (e.value.code) {
            case 'MONTH':
                newBarData = monthlyData;
                break;
            case 'WEEK':
                newBarData = weeklyData;
                break;
            case 'DAY':
                newBarData = dailyData;
                break;
            default:
                break;
        }

        chartData = newBarData;
        barChartRef.current?.refresh();
    };

    const filterAccounts = (event: any) => {
        let filtered: IAccount[] = [];
        let query = event.query;

        for (let i = 0; i < accounts.length; i++) {
            let country = accounts[i];
            if (country?.name?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        setFilteredAccounts(filtered);
    };
    const showBasicDialog = () => {
        setDisplayBasic(true);
    };
    const addCreditCard = () => {
        const card = {
            logo: '/layout/images/logo-freya-single.svg',
            cardNo: cardno,
            validDate: cardDate,
            name: cardName
        };
        setCards((prevState) => [...prevState, card]);
        setDisplayBasic(false);
    };

    const confirm1 = (name: string, amount: string) => {
        confirmDialog({
            message: 'Are you sure that you want to send $' + amount + ' to ' + name + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                (toast as any)?.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You sent $' + amount + ' to ' + name, life: 3000 });
            },
            reject: () => {
                (toast as any)?.current.show({ severity: 'warn', summary: 'canceled', detail: 'Your transaction canceled', life: 3000 });
            }
        });
    };
    const confirm2 = (name: string, amount: string) => {
        confirmDialog({
            message: 'Are you sure that you want to pay $' + amount + ' for your ' + name + '?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                (toast as any)?.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You sent $' + amount + ' to ' + name, life: 3000 });
            },
            reject: () => {
                (toast as any)?.current.show({ severity: 'warn', summary: 'canceled', detail: 'Your transaction canceled', life: 3000 });
            }
        });
    };
    let subscription: any = null;
    const filterSubscription = (event: any) => {
        let filtered: ISubscription[] = [];
        let query = event.query;
        for (let i = 0; i < subscriptions.length; i++) {
            let country = subscriptions[i];
            if (country?.name?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        setFilteredSubscription(filtered);
    };

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#343a40';
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#83888f';
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dee2e6';
        chartData = getChartData();
        usdChartData = getUsdChartData();
        btcChartData = getBtcChartData();
        poundChartData = getPoundChartData();
        pieData = getPiedata();
        dailyData = getDailyData();
        weeklyData = getWeeklyData();
        setSelectedCard(cards[0]);
        setChartOptions({
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        boxHeight: 15,
                        pointStyleWidth: 17,
                        padding: 14
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ':';
                            }

                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        });
        setPieOptions({
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 14,
                        boxHeight: 15,
                        pointStyleWidth: 17
                    },
                    position: 'bottom'
                }
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig]);

    useUnmountEffect(() => {
        if (subscription) (subscription as any)?.unsubscribe();
    });

    const carouselItemTemplate = (product: Demo.Product) => {
        return (
            <div className="px-2 pb-2">
                <div className="px-3 xl:px-5 py-5 w-full border-round-2xl shadow-3" style={{ background: 'linear-gradient(to left bottom, var(--primary-100), var(--primary-400))' }}>
                    <div className="mb-5">
                        <img src={(product as any)?.logo} className="w-2rem" alt="" />
                    </div>
                    <div className="mb-3">
                        <h3 className="text-0" style={{ letterSpacing: '-0.5px' }}>
                            **** **** **** {(product as any).cardNo.split('-')[3]}
                        </h3>
                        <div className="text-0 flex align-items-center justify-content-end">
                            <span className="m-0 text-sm p-0 mr-2">
                                Valid <br />
                                thru
                            </span>
                            <h4 className="m-0 text-0">{(product as any).validDate}</h4>
                        </div>
                        <h4 className="text-0">{(product as any).name}</h4>
                    </div>
                </div>
            </div>
        );
    };

    const dropdownItemTemplate = (option: any) => {
        return <span className="block">****{option.cardNo.split('-')[3]}</span>;
    };
    const autoCompleteItemTemplate = (item: any) => {
        return (
            <div className="name-item flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    {
                        <>
                            {item.photo.length > 0 ? (
                                <img className="w-2rem h-2rem border-circle" src={item.photo} alt={item.name} />
                            ) : (
                                <div className="w-2rem h-2rem border-circle flex justify-content-center align-items-center uppercase font-medium surface-100">{item.name[0]}</div>
                            )}
                            <div className="ml-2">{item.name}</div> */
                        </>
                    }
                </div>
                <div>{item.accountNo}</div>
            </div>
        );
    };
    const autoCompleteOptionTemplate = (subscription: any) => {
        return (
            <div className="name-item flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    {subscription.image && subscription.image.length > 0 ? (
                        <img className="w-2rem h-2rem border-circle" src={subscription.image} alt={subscription.name} />
                    ) : (
                        <span v-else className="w-2rem h-2rem border-circle flex justify-content-center align-items-center uppercase font-medium surface-100">
                            {subscription.name[0]}
                        </span>
                    )}

                    <div className="ml-2">{subscription.name}</div>
                </div>
                <div className="flex align-items-center gap-1">
                    <small style={{ color: subscription.due === 'late' ? '#fe572c' : subscription.due === 'close' ? '#ffc800' : '' }}>{subscription.due === 'late' ? 'late' : subscription.due === 'close' ? 'close' : ''}</small>
                    <div className="border-round-2xl p-1 text-center" style={{ backgroundColor: subscription.due === 'late' ? '#ff6e493a' : subscription.due === 'close' ? '#ffd8493a' : '' }}>
                        ${subscription.amount}
                    </div>
                </div>
            </div>
        );
    };

    const onGlobalFilterChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        (_filters['global'] as any) = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const nameBodyTemplate = (data: any) => {
        return (
            <>
                {data.image ? (
                    <img className="w-2rem h-2rem border-circle mt-2" src={data.image} alt="avatar-image" />
                ) : (
                    <span className="w-2rem h-2rem border-circle flex justify-content-center align-items-center uppercase font-medium surface-100 mt-2">{data.name[0]}</span>
                )}
            </>
        );
    };

    const statusBodyTemplate = (data: any) => {
        return (
            <>
                <span className="border-round-xl p-1 w-4rem text-center block font-medium" style={{ backgroundColor: data.amount > 0 ? '#8fff493a' : '#ff6e493a' }}>
                    ${data.amount}
                </span>
            </>
        );
    };

    const searchBodyTemplate = (data: any) => {
        return <Button icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text" onClick={() => data.menu.toggle(event)} />;
    };

    const footerTemplate = () => {
        return <Button label="Save Card" className="p-button-text" icon="pi pi-check" onClick={addCreditCard}></Button>;
    };

    useMountEffect(() => {
        msgs?.current?.show({ sticky: true, content: <div>👋 Hello! Welcome to Freya! Before start please complete your profile to know you better.</div> });
    });

    return (
        <>
            <Toast ref={toast}></Toast>
            <div className="layout-banking-dashboard">
                <div className="grid">
                    <Messages ref={msgs} className={classNames('w-full border-round-3xl font-medium text-color-secondary -mt-1', { 'dark-mode': layoutConfig.colorScheme === 'dark', 'surface-card': !isHidden })} onRemove={() => setIsHidden(true)} />
                    <div className="col-12">
                        <div className="flex flex-column sm:flex-row align-items-center gap-4">
                            <div className="flex flex-column sm:flex-row align-items-center gap-3 pb-2">
                                <img src="/demo/images/avatar/amyelsner.png" className="w-3rem h-3rem flex-shrink-0" alt="avatar-amy" />
                                <div className="flex flex-column align-items-center sm:align-items-start">
                                    <h4 className="text-800 font-medium m-0 mb-1">Welcome Amy</h4>
                                    <p className="text-600 m-0">Your last login was on 01/02/2023 at 10:24 am</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 sm:ml-auto justify-content-center">
                                <div className="exchnage-rates flex">
                                    <div className="flex align-items-center p-2 cursor-pointer hover:surface-0 border-round transition-duration-200" onClick={(e) => (op1 as any).current?.toggle(e)}>
                                        <i className="pi pi-angle-up text-green-500 mr-1"></i>
                                        <i className="pi pi-dollar"></i> <span>1.32</span>
                                    </div>
                                    <OverlayPanel ref={op1} style={{ width: '300px' }}>
                                        <h5 className="font-medium m-0 mb-1">USD to EUR</h5>
                                        <p className="m-0 p-0 mb-3">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.{' '}
                                            <a className="ml-1">
                                                more detail <i className="pi pi-arrow-up" style={{ transform: 'rotate(45deg)' }}></i>
                                            </a>
                                        </p>
                                        <Chart type="bar" height="280" data={usdChartData} options={chartOptions}></Chart>
                                    </OverlayPanel>
                                    <div className="flex align-items-center p-2 cursor-pointer hover:surface-0 border-round transition-duration-200" onClick={(e) => (op2 as any).current.toggle(e)}>
                                        <i className="pi pi-angle-down mr-1" style={{ color: '#ff6e49' }}></i>
                                        <i className="pi pi-fw pi-bitcoin"></i> <span>60,000</span>
                                    </div>
                                    <OverlayPanel ref={op2} style={{ width: '300px' }}>
                                        <h5 className="font-medium m-0 mb-1">BTC to USD</h5>
                                        <p className="m-0 p-0 mb-3">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.{' '}
                                            <a className="ml-1">
                                                more detail <i className="pi pi-arrow-up" style={{ transform: 'rotate(45deg)' }}></i>
                                            </a>
                                        </p>

                                        <Chart type="bar" height="280" data={btcChartData} options={chartOptions}></Chart>
                                    </OverlayPanel>
                                    <div className="flex align-items-center p-2 cursor-pointer hover:surface-0 border-round transition-duration-200" onClick={(e) => (op3 as any).current.toggle(e)}>
                                        <i className="pi pi-angle-up text-green-500 mr-1"></i>
                                        <i className="pi pi-pound"></i> <span>1.60</span>
                                    </div>
                                    <OverlayPanel ref={op3} style={{ width: '300px' }}>
                                        <h5 className="font-medium m-0 mb-1">GBP to USD</h5>
                                        <p className="m-0 p-0 mb-3">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.{' '}
                                            <a className="ml-1">
                                                more detail <i className="pi pi-arrow-up" style={{ transform: 'rotate(45deg)' }}></i>
                                            </a>
                                        </p>
                                        <Chart type="bar" height="280" data={poundChartData} options={chartOptions}></Chart>
                                    </OverlayPanel>
                                </div>
                                <div className="flex gap-2">
                                    <Button type="button" tooltip="'Exchange'" icon="pi pi-arrows-h" className="p-button-rounded p-button-outlined flex-shrink-0"></Button>
                                    <Button type="button" tooltip="'Withdraw'" icon="pi pi-download" className="p-button-rounded p-button-outlined flex-shrink-0"></Button>
                                    <Button type="button" tooltip="'Send'" icon="pi pi-send" className="p-button-rounded flex-shrink-0"></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 xl:col-8 p-3">
                        <div className="grid" style={{ margin: '-1rem' }}>
                            <div className="col-12 sm:col">
                                <div className="card surface-card text-700 flex justify-content-between pt-4 h-full">
                                    <div className="overview-info">
                                        <h6 className="m-0 mb-1">Total Balance</h6>
                                        <h1 className="m-0">$3879.76</h1>
                                    </div>
                                    <i className="pi pi-dollar text-3xl"></i>
                                </div>
                            </div>
                            <div className="col-12 sm:col">
                                <div className="card bg-orange-300 text-white flex justify-content-between pt-4 h-full">
                                    <div className="overview-info">
                                        <h6 className="m-0 mb-1 text-white">Total Spending</h6>
                                        <h1 className="m-0 text-white">$843.64</h1>
                                    </div>
                                    <i className="pi pi-dollar text-3xl"></i>
                                </div>
                            </div>
                            <div className="col-12 sm:col">
                                <div className="card bg-blue-300 text-white flex justify-content-between pt-4 h-full">
                                    <div className="overview-info">
                                        <h6 className="m-0 mb-1 text-white">Subscriptions</h6>
                                        <h1 className="m-0 text-white">$126.82</h1>
                                    </div>
                                    <i className="pi pi-dollar text-3xl"></i>
                                </div>
                            </div>
                            <div className="col-12 p-3">
                                <div className="card">
                                    <div className="card-header gap-3">
                                        <div className="card-title">
                                            <h6>Money Flow</h6>
                                            <p className="subtitle">
                                                Your <b>{(selectedDate as any)?.name}</b> Income & Expenses data.
                                            </p>
                                        </div>
                                        <Dropdown options={dateRange} value={selectedDate} placeholder="Monthly" optionLabel="name" showClear={false} className="w-9rem" onChange={onDateChangeBarChart}></Dropdown>
                                    </div>
                                    <Chart ref={barChartRef} type="bar" height="540" data={chartData} options={chartOptions}></Chart>
                                </div>
                            </div>
                        </div>
                        <Menu popup model={items}></Menu>
                    </div>
                    <div className="col-12 xl:col-4">
                        <Dialog visible={displayBasic} modal style={{ width: '50vw' }} onHide={() => setDisplayBasic(false)} footer={footerTemplate}>
                            <div className="block w-8">
                                <h2 className="p-0 m-0 mb-3">Add your new card</h2>
                                <p className="p-0 m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolores quasi consequuntur eveniet iure perspiciatis.</p>
                            </div>
                            <div className="flex justify-content-between align-items-center gap-7">
                                <div className="card-form w-full">
                                    <label htmlFor="name" className="block">
                                        Name on your card
                                    </label>
                                    <InputText className="w-full mb-3" type="text" id="name" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                                    <label htmlFor="cardno" className="block">
                                        Your card number
                                    </label>
                                    <InputMask className="w-full mb-3" id="cardno" value={cardno} onChange={(e) => setCardNo(e.target.value ?? '')} mask="9999-9999-9999-9999" autoClear={false}></InputMask>
                                    <div className="flex gap-3">
                                        <div className="mb-3 w-6">
                                            <label htmlFor="carddate" className="block">
                                                Your card&lsquo;s valid date
                                            </label>
                                            <InputMask className="w-full" id="carddate" value={cardDate} onChange={(e: any) => setCardDate(e.target.value)} autoClear={false} mask="99/99"></InputMask>
                                        </div>
                                        <div className="mb-3 w-6">
                                            <label htmlFor="cvv" className="block">
                                                CVV on your card
                                            </label>
                                            <InputMask className="w-full" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value ?? '')} autoClear={false} mask="999"></InputMask>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-3 xl:px-5 py-5 w-full border-round-2xl shadow-3" style={{ background: 'linear-gradient(to left bottom, var(--primary-100), var(--primary-400))', minHeight: '19rem' }}>
                                    <div className="mb-5">
                                        <img src="/layout/images/logo-freya-single.svg" className="w-2rem" alt="" />
                                    </div>
                                    <div className="mb-3">
                                        <h3 className="text-0" style={{ letterSpacing: '-0.5px', minHeight: '2.09rem' }}>
                                            {cardno}
                                        </h3>
                                        <div className="text-0 flex align-items-center justify-content-end">
                                            <span className="m-0 text-sm p-0 mr-2">
                                                Valid <br />
                                                thru
                                            </span>
                                            <h4 className="m-0 text-0" style={{ minWidth: '4.1rem' }}>
                                                {cardDate}
                                            </h4>
                                        </div>
                                        <h4 className="text-0" style={{ minHeight: '1.7rem' }}>
                                            {cardName}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                        <div className="grid">
                            <div className="col-12 md:col-6 xl:col-12 p-3">
                                <div className="card px-0">
                                    {!ObjectUtils.isEmpty(cards) && (
                                        <>
                                            <div className="card-header gap-3" style={{ padding: '0 28px 16px' }}>
                                                <div className="card-title">
                                                    <h6>My Cards ({cards.length})</h6>
                                                    <p className="subtitle">You can always add more</p>
                                                </div>
                                                <Button type="button" icon="pi pi-plus" className="p-button-secondary p-button-text p-button-rounded" onClick={showBasicDialog}></Button>
                                            </div>
                                            <Carousel value={cards} numVisible={1} numScroll={1} itemTemplate={carouselItemTemplate} circular></Carousel>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 md:col-6 xl:col-12">
                                <div className="card">
                                    {!ObjectUtils.isEmpty(cards) && (
                                        <>
                                            <div className="card-header gap-3">
                                                <div className="card-title">
                                                    <h6>Quick Actions</h6>
                                                    <p className="subtitle">Send money or pay your bills.</p>
                                                </div>
                                                <Dropdown
                                                    options={cards}
                                                    value={selectedCard}
                                                    onChange={(e) => setSelectedCard(e.value)}
                                                    placeholder={selectedCard?.cardNo}
                                                    optionLabel="cardNo"
                                                    showClear={false}
                                                    className="w-8rem"
                                                    panelClassName="w-8rem"
                                                    itemTemplate={dropdownItemTemplate}
                                                ></Dropdown>
                                            </div>
                                            <ConfirmDialog style={{ width: '360px' }} baseZIndex={10000} rejectClassName="p-button-text"></ConfirmDialog>
                                            <TabView>
                                                <TabPanel header="Send Money">
                                                    <div style={{ margin: '0 -1.5rem' }} className="w-full p-0">
                                                        <AutoComplete
                                                            className="w-full p-0"
                                                            value={selectedAccount}
                                                            placeholder="Enter Name"
                                                            suggestions={filteredAccounts as IAccount[]}
                                                            itemTemplate={autoCompleteItemTemplate}
                                                            completeMethod={filterAccounts}
                                                            onChange={(e) => setSelectedAccount(e.value)}
                                                            field="name"
                                                            dropdown
                                                        ></AutoComplete>

                                                        <div className="flex align-items-center my-3 gap-3">
                                                            <InputText className="w-8" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter Account No" />
                                                            <InputNumber
                                                                value={amount}
                                                                onValueChange={(e: InputNumberValueChangeEvent) => setAmount(e.value as number)}
                                                                inputId="currency-us"
                                                                mode="currency"
                                                                placeholder="$00.00"
                                                                currency="USD"
                                                                locale="en-US"
                                                            ></InputNumber>
                                                        </div>
                                                        <Button icon="pi pi-send" type="button" label="Send" className="p-button-outlined w-full" onClick={() => confirm1(selectedAccount?.name as string, amount.toString())}></Button>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel header="Pay Subscriptions or Bills">
                                                    <div style={{ margin: '0 -1.5rem' }}>
                                                        <AutoComplete
                                                            className="w-full"
                                                            value={selectedSubscription}
                                                            onChange={(e) => setSelectedSubscription(e.value)}
                                                            placeholder="Enter Subscription or Bill Company"
                                                            suggestions={filteredSubscriptions as ISubscription[]}
                                                            itemTemplate={autoCompleteOptionTemplate}
                                                            completeMethod={(event) => filterSubscription(event)}
                                                            field="name"
                                                            dropdown={true}
                                                        ></AutoComplete>

                                                        <div className="flex align-items-center my-3 gap-3">
                                                            <InputText
                                                                className="w-8"
                                                                type="text"
                                                                value={selectedSubscription?.accountNo}
                                                                onChange={(e) =>
                                                                    setSelectedSubscription((prevState) => ({
                                                                        ...prevState,
                                                                        accountNo: e.target.value
                                                                    }))
                                                                }
                                                                placeholder="Enter Account No"
                                                            />
                                                            <InputNumber
                                                                value={selectedSubscription ? selectedSubscription.amount : amount}
                                                                onChange={(e) =>
                                                                    setSelectedSubscription((prevState) => ({
                                                                        ...prevState,
                                                                        amount: e.value as number
                                                                    }))
                                                                }
                                                                inputId="currency-us"
                                                                placeholder="$00.00"
                                                                mode="currency"
                                                                currency="USD"
                                                                locale="en-US"
                                                            ></InputNumber>
                                                        </div>
                                                        <Button
                                                            icon="pi pi-wallet"
                                                            type="button"
                                                            label="Pay"
                                                            className="p-button-outlined w-full"
                                                            onClick={() => confirm2(selectedSubscription?.name as string, selectedSubscription!.amount!.toString())}
                                                        ></Button>
                                                    </div>
                                                </TabPanel>
                                            </TabView>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 xl:col-6 p-3">
                        <div className="card h-full">
                            <div className="card-header gap-3 flex-wrap md:flex-nowrap">
                                <div className="card-title">
                                    <h6>Transactions</h6>
                                    <p className="subtitle">
                                        Your <b>{selectedDate?.name}</b> Income & Expenses data.
                                    </p>
                                </div>
                                <div className="inline-flex align-items-center w-full md:w-auto">
                                    <span className="p-input-icon-left flex-auto">
                                        <i className="pi pi-search"></i>
                                        <InputText type={'text'} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" className="w-full" style={{ borderRadius: '2rem' }} />
                                    </span>
                                    <Button icon="pi pi-upload" className="p-button-rounded mx-3 flex-shrink-0" onClick={exportCSV}></Button>
                                </div>
                            </div>

                            <DataTable ref={dt} value={transactions} dataKey="id" globalFilter={globalFilterValue} paginator rows={5} className="datatable-responsive" responsiveLayout="scroll">
                                <Column sortable body={nameBodyTemplate}></Column>
                                <Column sortable field="name" header="Name"></Column>
                                <Column field="action" header="Action"></Column>
                                <Column sortable field="accountNo" header="Account&User No"></Column>
                                <Column field="amount" header="Amount" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
                                <Column body={searchBodyTemplate} style={{ textAlign: 'center' }}></Column>
                            </DataTable>
                        </div>
                    </div>
                    <div className="col-12 sm:col-6 xl:col-3">
                        <div className="card h-full">
                            <div className="card-header gap-3">
                                <div className="card-title">
                                    <h6>All Expenses</h6>
                                    <p className="subtitle">
                                        Your <b>{selectedDate?.name}</b> Expenses data.
                                    </p>
                                </div>
                                <Dropdown options={dateRange2} value={selectedDate2} placeholder="Last 7 Days" optionLabel="name" showClear={false} className="w-8rem" onChange={onDateChangePieChart}></Dropdown>
                            </div>
                            <Chart ref={pieChartRef} type="doughnut" data={pieData} options={pieOptions} height="300"></Chart>
                        </div>
                    </div>
                    <div className="col-12 sm:col-6 xl:col-3 p-3">
                        <div className="card h-full flex align-items-center justify-content-start p-5" style={{ background: 'linear-gradient(to left bottom, var(--primary-lighter-color), var(--primary-400))' }}>
                            <div className="flex flex-column">
                                <h2 className="m-0 mb-4 w-9 font-bold">Upgrade to premium banking!</h2>
                                <h4 className="m-0 mb-6 w-10">Lightning-fast transactions, no fees, and exclusive discounts from top brands!</h4>
                                <Button icon="pi pi-wallet" type="button" label="Upgrade Now" className="p-button-primary w-full p-button-lg"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
