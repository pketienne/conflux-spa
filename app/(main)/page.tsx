'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chart } from 'primereact/chart';
import { ChartData, ChartOptions } from 'chart.js';
import { InputText } from 'primereact/inputtext';
import { Menu } from 'primereact/menu';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { classNames } from 'primereact/utils';
import { Message } from 'primereact/message';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { TabPanel, TabView, TabPanelHeaderTemplateOptions } from 'primereact/tabview';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';
import { Ripple } from 'primereact/ripple';
import { Messages } from 'primereact/messages';
import { useMountEffect } from 'primereact/hooks';

interface IDateRange {
    name: string;
    code: string;
}

let chartData: ChartData;
let chart1: ChartData;
let pieData: ChartData;

function Dashboard() {
    const dateRanges: IDateRange[] = [
        { name: 'Daily', code: 'DAY' },
        { name: 'Weekly', code: 'WEEK' },
        { name: 'Monthly', code: 'MONTH' }
    ];
    const [chartOptions, setChartOptions] = useState<ChartOptions | null>(null);
    const [chart1Options, setChart1Options] = useState<ChartOptions | null>(null);
    const [pieOptions, setPieOptions] = useState<ChartOptions | null>(null);
    const [selectedDate, setSelectedDate] = useState<IDateRange>(dateRanges[0]);
    const [expendedRows, setExpandedRows] = useState<any>(null);
    const [filters, setFilters] = useState<DataTableFilterMeta>({});
    const [isHidden, setIsHidden] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const menu1 = useRef<Menu | null>(null);
    const menu2 = useRef<Menu | null>(null);
    const chart = useRef<Chart | null>(null);
    const dt = useRef<DataTable<any>>(null);
    const msgs = useRef<Messages | null>(null);

    const { layoutConfig } = useContext(LayoutContext);

    const orders = {
        monthlyData: {
            dateRange: 'last 12 months',
            orders: [122, 584, 646, 221, 135, 453, 111, 158, 425, 156, 454, 456],
            orderUnits: [145, 584, 676, 281, 137, 459, 136, 178, 435, 176, 456, 480],
            avarageUnitByOrder: 1.2,
            avarageSalesByOrder: '$28.00',
            totalSales: '$109,788.00'
        },
        weeklyData: {
            dateRange: 'last 24 weeks',
            orders: [28, 58, 44, 16, 42, 8, 15, 26, 38, 46, 15, 46, 89, 45, 41, 22, 17, 43, 12, 45, 24, 16, 54, 49],
            orderUnits: [32, 62, 48, 19, 49, 10, 16, 26, 38, 54, 19, 52, 100, 53, 41, 22, 26, 43, 18, 47, 29, 18, 62, 51],
            avarageUnitByOrder: 1.2,
            avarageSalesByOrder: '$24.00',
            totalSales: '$20,136.00'
        },
        dailyData: {
            dateRange: 'last 30 days',
            orders: [8, 5, 4, 6, 2, 8, 5, 2, 8, 6, 5, 6, 12, 8, 11, 6, 2, 8, 3, 4, 6, 2, 11, 6, 4, 7, 6, 7, 6, 4],
            orderUnits: [10, 6, 5, 6, 2, 8, 5, 6, 8, 6, 7, 7, 12, 12, 14, 6, 2, 8, 7, 4, 6, 5, 13, 6, 7, 9, 6, 7, 6, 6],
            avarageUnitByOrder: 1.2,
            avarageSalesByOrder: '$29.00',
            totalSales: '$5,162.00'
        }
    };

    const items = [
        {
            icon: 'pi pi-check',
            label: 'Complete'
        },
        {
            icon: 'pi pi-times',
            label: 'Cancel'
        },
        {
            icon: 'pi pi-external-link',
            label: 'Details'
        }
    ];

    const activeAds = [
        {
            image: '/demo/images/product/black-watch.jpg',
            name: 'Experience Timeless Elegance with the Black-Watch',
            adDesc: `Upgrade your style with the Black-Watch. Its sleek and sophisticated design will elevate your wardrobe to new heights. With its precise timekeeping, you'll never miss an important appointment again. Invest in a piece that will last a lifetime. Get your Black-Watch today.`,
            adCTR: '6%',
            adROI: '10%',
            detailedData: [
                {
                    name: 'Mail',
                    adROI: '10%',
                    adCTR: '3%',
                    adCR: '2%',
                    impressions: 5000,
                    clicks: 100,
                    adCPA: '$50.00',
                    adCPC: '$2.00'
                },
                {
                    name: 'Google Ads',
                    adROI: '15%',
                    adCTR: '6%',
                    adCR: '4%',
                    impressions: 10000,
                    clicks: 400,
                    adCPA: '$37.50',
                    adCPC: '$1.50'
                },
                {
                    name: 'FB Ads',
                    adROI: '20%',
                    adCTR: '7%',
                    adCR: '5%',
                    impressions: 15000,
                    clicks: 750,
                    adCPA: '$31.25',
                    adCPC: '$1.25'
                }
            ]
        },
        {
            image: '/demo/images/product/green-earbuds.jpg',
            name: 'Eco-Friendly Sound with Green-Earbuds',
            adDesc: `Listen to your music while helping the environment with Green-Earbuds. Made with sustainable materials, these earbuds offer high-quality sound while reducing your carbon footprint. With a comfortable fit and long battery life, you can enjoy your music all day. Join the eco-movement and get your Green-Earbuds today.`,
            adCTR: '6%',
            adROI: '15%',
            detailedData: [
                {
                    name: 'Mail',
                    adROI: '10%',
                    adCTR: '3%',
                    adCR: '2%',
                    impressions: 5000,
                    clicks: 100,
                    adCPA: '$50.00',
                    adCPC: '$2.00'
                },
                {
                    name: 'Google Ads',
                    adROI: '15%',
                    adCTR: '6%',
                    adCR: '4%',
                    impressions: 10000,
                    clicks: 400,
                    adCPA: '$37.50',
                    adCPC: '$1.50'
                },
                {
                    name: 'FB Ads',
                    adROI: '20%',
                    adCTR: '7%',
                    adCR: '5%',
                    impressions: 15000,
                    clicks: 750,
                    adCPA: '$31.25',
                    adCPC: '$1.25'
                }
            ]
        },
        {
            image: '/demo/images/product/yoga-set.jpg',
            name: 'Find Your Zen with the Yoga-Set',
            adDesc: `Take your yoga practice to the next level with the Yoga-Set. This comprehensive kit includes everything you need to enhance your stretch and strength. Whether you're a beginner or an experienced practitioner, the non-slip mat, blocks, and strap will support you in your journey. Embrace a healthier, happier lifestyle with the Yoga-Set. Order now.`,
            adCTR: '6%',
            adROI: '10%',
            detailedData: [
                {
                    name: 'Mail',
                    adROI: '10%',
                    adCTR: '3%',
                    adCR: '2%',
                    impressions: 5000,
                    clicks: 100,
                    adCPA: '$50.00',
                    adCPC: '$2.00'
                },
                {
                    name: 'Google Ads',
                    adROI: '15%',
                    adCTR: '6%',
                    adCR: '4%',
                    impressions: 10000,
                    clicks: 400,
                    adCPA: '$37.50',
                    adCPC: '$1.50'
                },
                {
                    name: 'FB Ads',
                    adROI: '20%',
                    adCTR: '7%',
                    adCR: '5%',
                    impressions: 15000,
                    clicks: 750,
                    adCPA: '$31.25',
                    adCPC: '$1.25'
                }
            ]
        },
        {
            image: '/demo/images/product/gold-phone-case.jpg',
            name: 'Add a Touch of Luxury to Your Phone with the Gold Case',
            adDesc: `Make a statement with the Gold Phone Case. Its sleek and stylish design will turn heads and keep your phone protected. Crafted with premium materials, this case will not only protect your phone but also elevate your style. Don't settle for a boring case. Get the Gold Phone Case today.`,
            adCTR: '6%',
            adROI: '13%',
            detailedData: [
                {
                    name: 'Mail',
                    adROI: '10%',
                    adCTR: '3%',
                    adCR: '2%',
                    impressions: 5000,
                    clicks: 100,
                    adCPA: '$50.00',
                    adCPC: '$2.00'
                },
                {
                    name: 'Google Ads',
                    adROI: '15%',
                    adCTR: '6%',
                    adCR: '4%',
                    impressions: 10000,
                    clicks: 400,
                    adCPA: '$37.50',
                    adCPC: '$1.50'
                },
                {
                    name: 'FB Ads',
                    adROI: '20%',
                    adCTR: '7%',
                    adCR: '5%',
                    impressions: 15000,
                    clicks: 750,
                    adCPA: '$31.25',
                    adCPC: '$1.25'
                }
            ]
        },
        {
            image: '/demo/images/product/bamboo-watch.jpg',
            name: 'Eco-Friendly Timepiece: Experience Style with our Bamboo Watch',
            adDesc: `Stay on time and on trend with the Bamboo-Watch. Made with sustainable bamboo materials, this watch not only looks great but also helps protect the environment. With its precise timekeeping and versatile design, the Bamboo-Watch is perfect for any occasion. Get yours today and join the eco-movement in style.`,
            adCTR: '6%',
            adROI: '22%',
            detailedData: [
                {
                    name: 'Mail',
                    adROI: '10%',
                    adCTR: '3%',
                    adCR: '2%',
                    impressions: 5000,
                    clicks: 100,
                    adCPA: '$50.00',
                    adCPC: '$2.00'
                },
                {
                    name: 'Google Ads',
                    adROI: '15%',
                    adCTR: '6%',
                    adCR: '4%',
                    impressions: 10000,
                    clicks: 400,
                    adCPA: '$37.50',
                    adCPC: '$1.50'
                },
                {
                    name: 'FB Ads',
                    adROI: '20%',
                    adCTR: '7%',
                    adCR: '5%',
                    impressions: 15000,
                    clicks: 750,
                    adCPA: '$31.25',
                    adCPC: '$1.25'
                }
            ]
        }
    ];

    const getChartData = (): ChartData<'bar'> => {
        const documentStyle = getComputedStyle(document.documentElement);
        return {
            labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            datasets: [
                {
                    label: 'Orders',
                    data: orders.dailyData.orders,
                    backgroundColor: documentStyle.getPropertyValue('--primary-color') || '#14b8a6',
                    borderRadius: 6
                },

                {
                    label: 'Units',
                    data: orders.dailyData.orderUnits,
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color') || '#8adcd3',
                    borderRadius: 6
                }
            ]
        };
    };
    const getChart1Data = (): ChartData<'line'> => {
        const documentStyle = getComputedStyle(document.documentElement);
        return {
            labels: ['8Sun', '9Mon', '10Thu', '11Wed', '12Fri', '13Sat', '14Sun'],
            datasets: [
                {
                    label: 'New Clients',
                    data: [12, 19, 15, 28, 32, 22, 39],
                    borderColor: documentStyle.getPropertyValue('--primary-light-color') || '#8adcd3',
                    borderWidth: 4,
                    fill: true,
                    backgroundColor: documentStyle.getPropertyValue('--primary-lighter-color') || 'rgba(138, 220, 211, 0.1)',
                    tension: 0.4
                }
            ]
        };
    };
    const getPiedata = (): ChartData<'line'> => {
        const documentStyle = getComputedStyle(document.documentElement);
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dee2e6';
        return {
            labels: ['Watches', 'Clothing', 'Gadgets', 'Accessories'],
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
    const getOrCreateTooltip = (chart: any) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');

        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
            tooltipEl.style.borderRadius = '12px';
            tooltipEl.style.color = 'white';
            tooltipEl.style.opacity = 1;
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.transform = 'translate(-50%, 0)';
            tooltipEl.style.transition = 'all .2s ease';

            const table = document.createElement('table');
            table.style.margin = '0px';

            tooltipEl.appendChild(table);
            chart.canvas.parentNode.appendChild(tooltipEl);
        }

        return tooltipEl;
    };
    const onDateChangeBarChart = (e: DropdownChangeEvent) => {
        const documentStyle = getComputedStyle(document.documentElement);
        setSelectedDate(e.value);

        const monthlyData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Orders',
                    data: orders.monthlyData.orders,
                    fill: false,
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: documentStyle.getPropertyValue('--primary-color') || '#14b8a6',
                    borderRadius: 6
                },
                {
                    label: 'Units',
                    data: [1200, 5100, 6200, 3300, 2100, 6200, 4500, 1200, 5100, 6200, 3300, 2100],
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color') || '#8adcd3',
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };

        const dailyData = {
            labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            datasets: [
                {
                    label: 'Orders',
                    data: orders.dailyData.orders,
                    fill: false,
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: documentStyle.getPropertyValue('--primary-color') || '#14b8a6',
                    borderRadius: 6
                },
                {
                    label: 'Units',
                    data: orders.dailyData.orderUnits,
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color') || '#8adcd3',
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };

        const weeklyData = {
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
                    label: 'Orders',
                    data: orders.weeklyData.orders,
                    fill: false,
                    tension: 0.4,
                    borderWidth: 2,
                    backgroundColor: documentStyle.getPropertyValue('--primary-color'),
                    borderRadius: 6
                },
                {
                    label: 'Units',
                    data: orders.weeklyData.orderUnits,
                    backgroundColor: documentStyle.getPropertyValue('--primary-light-color'),
                    tension: 0.4,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        };

        let newBarData = { ...chartData };
        switch (e.value.code) {
            case 'DAY':
                newBarData = dailyData;
                break;
            case 'WEEK':
                newBarData = weeklyData;
                break;
            case 'MONTH':
                newBarData = monthlyData;
                break;
            default:
                break;
        }

        chartData = newBarData;
        chart.current?.refresh();
    };

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color') || '#343a40';
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary') || '#83888f';
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border') || '#dee2e6';

        const externalTooltipHandler = (context: any) => {
            // Tooltip Element
            const { chart, tooltip } = context;
            const tooltipEl = getOrCreateTooltip(chart);

            // Hide if no tooltip
            if (tooltip.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            // Set Text
            if (tooltip.body) {
                const titleLines = tooltip.title || [];
                const bodyLines = tooltip.body.map((b: any) => b.lines);
                const tableHead = document.createElement('thead');

                titleLines.forEach((title: string) => {
                    const tr = document.createElement('tr');
                    tr.style.borderWidth = '0';

                    const th = document.createElement('th');
                    th.style.borderWidth = '0';
                    th.innerText = selectedDate?.code == 'DAY' ? 'Day ' : '';
                    const text = document.createTextNode(title);

                    th.appendChild(text);
                    tr.appendChild(th);
                    tableHead.appendChild(tr);
                });

                const tableBody = document.createElement('tbody');
                bodyLines.forEach((body: any, i: number) => {
                    const colors = tooltip.labelColors[i];

                    const span = document.createElement('span');
                    span.style.background = colors.backgroundColor;
                    span.style.borderColor = colors.borderColor;
                    span.style.borderWidth = '2px';
                    span.style.marginRight = '10px';

                    span.style.height = '10px';
                    span.style.width = '10px';
                    span.style.display = 'inline-block';

                    const tr = document.createElement('tr');
                    tr.style.backgroundColor = 'inherit';
                    tr.style.borderWidth = '0';
                    const td = document.createElement('td');
                    td.style.borderWidth = '0';

                    const text = document.createTextNode(body);

                    td.appendChild(span);
                    td.appendChild(text);
                    tr.appendChild(td);
                    tableBody.appendChild(tr);
                });

                const tableFooter = document.createElement('tfooter');
                const trFooter = document.createElement('tr');
                trFooter.style.backgroundColor = 'inherit';
                trFooter.style.borderWidth = '0';
                trFooter.innerHTML =
                    `</br> <span> Avarage Unit/Order: </span>
                    </br> <b>` +
                    (selectedDate?.code == 'DAY' ? orders.dailyData.avarageUnitByOrder : selectedDate?.code == 'WEEK' ? orders.weeklyData.avarageUnitByOrder : orders.monthlyData.avarageUnitByOrder) +
                    `</b></br></br> ` +
                    `<span> Avarage Sales/Order: </span>
                    </br> <b>` +
                    (selectedDate?.code == 'DAY' ? orders.dailyData.avarageSalesByOrder : selectedDate?.code == 'WEEK' ? orders.weeklyData.avarageSalesByOrder : orders.monthlyData.avarageSalesByOrder) +
                    `</b></br></br> ` +
                    `<span> Total Sales: </span>
                    </br> <b>` +
                    (selectedDate?.code == 'DAY' ? orders.dailyData.totalSales : selectedDate?.code == 'WEEK' ? orders.weeklyData.totalSales : orders.monthlyData.totalSales) +
                    `</b>`;
                tableFooter.appendChild(trFooter);

                const tableRoot = tooltipEl.querySelector('table');

                // Remove old children
                while (tableRoot.firstChild) {
                    tableRoot.firstChild.remove();
                }

                // Add new children
                tableRoot.appendChild(tableHead);
                tableRoot.appendChild(tableBody);
                tableRoot.appendChild(tableFooter);
            }

            const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.left = positionX + tooltip.caretX + 'px';
            tooltipEl.style.top = positionY + tooltip.caretY + 'px';
            tooltipEl.style.font = tooltip.options.bodyFont.string;
            tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
        };
        chartData = getChartData();
        chart1 = getChart1Data();
        pieData = getPiedata();
        setChartOptions({
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
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
                    enabled: false,
                    position: 'nearest',
                    external: externalTooltipHandler
                }
            },
            scales: {
                x: {
                    stacked: true,
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
        setChart1Options({
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        boxHeight: 15,
                        pointStyleWidth: 17,
                        padding: 14
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },

            maintainAspectRatio: false,
            hover: {
                mode: 'index'
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            }
        });
        setPieOptions({
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    display: false,
                    position: 'bottom'
                }
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutConfig]);
    const sumOf = (array: number[]) => {
        let sum = 0;
        array.forEach((a) => (sum += a));
        return sum;
    };
    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const expansionTemplate = (data: any) => {
        return (
            <>
                <div className="flex">
                    <img src={data?.image} alt={data?.name} height="160" className="border-round" />
                    <div className="ml-3 w-8">
                        <div className="p-3">
                            <h4 className="font-medium m-0 mb-2">{data?.name}</h4>
                            <p className="p-0 m-0">{data?.adDesc}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 mb-3">
                    <DataTable value={data?.detailedData}>
                        <Column field="name" header="Name" />
                        <Column field="adROI" header="ROI" headerClassName="white-space-nowrap text-right" />
                        <Column field="adCTR" header="CTR" headerClassName="white-space-nowrap text-right" />
                        <Column field="adCR" header="CR" headerClassName="white-space-nowrap text-right" />
                        <Column field="adCPA" header="CPA" headerClassName="white-space-nowrap text-right" />
                        <Column field="adCPC" header="CPC" headerClassName="white-space-nowrap text-right" />
                        <Column field="impressions" header="Imp." headerClassName="white-space-nowrap text-right" />
                        <Column field="clicks" header="Clicks" headerClassName="white-space-nowrap text-right" />
                    </DataTable>
                </div>
            </>
        );
    };

    const bodyTemplate = (data: any) => {
        return <img src={data.image} alt={data.name} height="60" className="border-round" />;
    };

    const tab1HeaderTemplate = (options: TabPanelHeaderTemplateOptions) => {
        return (
            <button type="button" onClick={options.onClick} className={classNames('p-ripple', options.className)}>
                <div className="pr-2 p-overlay-badge">
                    <h6 className="m-0 mr-2 text-left">Unshipped Orders</h6>
                    <Badge value={6} severity="info" />
                </div>
                <Ripple />
            </button>
        );
    };
    const tab2HeaderTemplate = (options: TabPanelHeaderTemplateOptions) => {
        return (
            <button type="button" onClick={options.onClick} className={classNames('p-ripple', options.className)}>
                <div className="pr-2 p-overlay-badge">
                    <h6 className="m-0 mr-2 text-left">Unreturned Messages</h6>
                    <Badge value={3} severity="warning" />
                </div>
                <Ripple />
            </button>
        );
    };
    const onGlobalFilterChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        (_filters['global'] as any) = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    useMountEffect(() => {
        msgs?.current?.show({ sticky: true, content: <div>👋 Hello! Welcome to Freya! Before start please complete your profile to know you better.</div> });
    });

    return (
        <>
            <div className="grid">
                <div className="col-12">
                    <Messages ref={msgs} className={classNames('w-full border-round-3xl font-medium text-color-secondary -mt-1', { 'dark-mode': layoutConfig.colorScheme === 'dark', 'surface-card': !isHidden })} onRemove={() => setIsHidden(true)} />
                    <div className="grid p-3" style={{ margin: '-1rem' }}>
                        <div className="col-12 sm:col p-3">
                            <div className="card surface-card text-500 flex justify-content-between pt-4 h-full" style={{ minWidth: '17rem' }}>
                                <div className="overview-info">
                                    <h6 className="m-0 mb-1 text-500">Orders</h6>
                                    <h1 className="m-0 text-500">23</h1>
                                </div>
                                <i className="pi pi-chart-line text-3xl"></i>
                            </div>
                        </div>
                        <div className="col-12 sm:col p-3">
                            <div className="card text-0 flex justify-content-between pt-4 h-full" style={{ backgroundColor: 'var(--primary-color)', minWidth: '17rem' }}>
                                <div className="overview-info">
                                    <h6 className="m-0 mb-1 text-0">Revenue</h6>
                                    <h1 className="m-0 text-0">$1548.26</h1>
                                </div>
                                <i className="pi pi-dollar text-3xl"></i>
                            </div>
                        </div>
                        <div className="col-12 sm:col p-3">
                            <div className="card bg-gray-400 text-white flex justify-content-between pt-4 h-full" style={{ minWidth: '17rem' }}>
                                <div className="overview-info">
                                    <h6 className="m-0 mb-1 text-white">Buyer Messages</h6>
                                    <h1 className="m-0 text-white">2</h1>
                                </div>
                                <i className="pi pi-envelope text-3xl"></i>
                            </div>
                        </div>
                        <div className="col-12 sm:col p-3">
                            <div className="card bg-gray-600 text-white flex justify-content-between pt-4 h-full" style={{ minWidth: '17rem' }}>
                                <div className="overview-info">
                                    <h6 className="m-0 mb-1 text-white">CTR</h6>
                                    <h1 className="m-0 text-white">12%</h1>
                                </div>
                                <i className="pi pi-chart-bar text-3xl"></i>
                            </div>
                        </div>
                        <div className="col-12 sm:col p-3">
                            <div className="card text-white flex justify-content-between pt-4 h-full" style={{ background: 'linear-gradient(90deg, #ffb340 0%, #ffa740 100%)', minWidth: '17rem' }}>
                                <div className="overview-info">
                                    <h6 className="m-0 mb-1 text-white">Out of Stock Products</h6>
                                    <h1 className="m-0 text-white">4</h1>
                                </div>
                                <i className="pi pi-box text-3xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 xl:col-8 p-3">
                    <div className="card">
                        <div className="card-header gap-3">
                            <div className="card-title">
                                <h6>Orders</h6>
                                <p className="subtitle">
                                    Your <b>{selectedDate?.name}</b> orders data from <b>{selectedDate?.code == 'DAY' ? orders?.dailyData?.dateRange : selectedDate?.code == 'WEEK' ? orders?.weeklyData?.dateRange : orders?.monthlyData?.dateRange}</b>
                                </p>
                            </div>
                            <Dropdown options={dateRanges} value={selectedDate} placeholder="Monthly" optionLabel="name" showClear={false} className="w-9rem" onChange={onDateChangeBarChart}></Dropdown>
                        </div>
                        <div className="chart-info mb-3 flex align-items-center gap-5 flex-wrap">
                            <div className="info">
                                <h6 className="m-0 mb-1 text-color-secondary font-normal">Total Orders</h6>
                                <p className="m-0 p-0 font-bold">{selectedDate?.code == 'DAY' ? sumOf(orders?.dailyData?.orders) : selectedDate?.code == 'WEEK' ? sumOf(orders?.weeklyData?.orders) : sumOf(orders?.monthlyData?.orders)}</p>
                            </div>
                            <div className="info">
                                <h6 className="m-0 mb-1 text-color-secondary font-normal">Total Units</h6>
                                <p className="m-0 p-0 font-bold">{selectedDate?.code == 'DAY' ? sumOf(orders?.dailyData?.orderUnits) : selectedDate?.code == 'WEEK' ? sumOf(orders?.weeklyData?.orderUnits) : sumOf(orders?.monthlyData?.orderUnits)}</p>
                            </div>
                            <div className="info">
                                <h6 className="m-0 mb-1 text-color-secondary font-normal">Total Sales</h6>
                                <p className="m-0 p-0 font-bold">{selectedDate?.code == 'DAY' ? orders?.dailyData?.totalSales : selectedDate?.code == 'WEEK' ? orders?.weeklyData?.totalSales : orders?.monthlyData?.totalSales}</p>
                            </div>
                            <div className="info">
                                <h6 className="m-0 mb-1 text-color-secondary font-normal">Avg. sales/orders item</h6>
                                <p className="m-0 p-0 font-bold">
                                    {selectedDate?.code == 'DAY' ? orders?.dailyData?.avarageSalesByOrder : selectedDate?.code == 'WEEK' ? orders?.weeklyData?.avarageSalesByOrder : orders?.monthlyData?.avarageSalesByOrder}
                                </p>
                            </div>
                            <div className="info">
                                <h6 className="m-0 mb-1 text-color-secondary font-normal">Avg. units/orders item</h6>
                                <p className="m-0 p-0 font-bold">
                                    {selectedDate?.code == 'DAY' ? orders?.dailyData?.avarageUnitByOrder : selectedDate?.code == 'WEEK' ? orders?.weeklyData?.avarageUnitByOrder : orders?.monthlyData?.avarageUnitByOrder}
                                </p>
                            </div>
                        </div>
                        <Chart ref={chart} type="bar" height="530" data={chartData} options={chartOptions as ChartOptions}></Chart>
                    </div>
                </div>

                <div className="col-12 xl:col-4 p-3">
                    <div className="grid">
                        <div className="col-12 md:col-6 xl:col-12">
                            <div className="card">
                                <div className="card-header gap-3 pb-2">
                                    <div className="card-title">
                                        <h6>Waiting Actions</h6>
                                        <p className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </div>
                                </div>
                                <TabView className="w-full p-0">
                                    <TabPanel headerTemplate={tab1HeaderTemplate}>
                                        <ul className="list-none p-0 overflow-auto" style={{ margin: '0 -1.5rem -1rem', maxHeight: '17.745rem' }}>
                                            <li className="border-round-lg pt-2 px-3 pb-2 mb-3" style={{ backgroundColor: 'var(--primary-lighter-color)' }}>
                                                <div className="flex justify-content-between align-items-center mb-1">
                                                    <div className="flex align-items-center gap-1">
                                                        <h6 className="line-height-3 m-0 font-medium">Order</h6>
                                                        <Tag className="m-0 mr-2 px-2 text-xs bg-blue-300" value="#05895"></Tag>
                                                    </div>

                                                    <span className="text-gray-300 font-semibold text-sm line-height-1">4h ago</span>
                                                </div>
                                                <div className="flex justify-content-between align-items-center">
                                                    <span className="mt-1 text-400 block text-sm line-height-1">
                                                        {' '}
                                                        <b>1</b> Bamboo Watch, <b>3</b> Blue Band,{' '}
                                                    </span>
                                                    <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-sm flex-shrink-0" onClick={() => (menu1 as any)?.current.toggle(event)}></Button>
                                                </div>
                                            </li>
                                            <li className="border-round-lg pt-2 px-3 pb-2 mb-3" style={{ backgroundColor: 'var(--primary-lighter-color)' }}>
                                                <div className="flex justify-content-between align-items-center mb-1">
                                                    <div className="flex align-items-center gap-1">
                                                        <h6 className="line-height-3 m-0 font-medium">Order</h6>
                                                        <Tag className="m-0 mr-2 px-2 text-xs bg-blue-300" value="#05852"></Tag>
                                                    </div>

                                                    <span className="text-gray-300 font-semibold text-sm line-height-1">6h ago</span>
                                                </div>
                                                <div className="flex justify-content-between align-items-center">
                                                    <span className="mt-1 text-400 block text-sm line-height-1">
                                                        {' '}
                                                        <b>1</b> Bamboo Watch, <b>3</b> Blue Band,{' '}
                                                    </span>
                                                    <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-sm flex-shrink-0" onClick={() => (menu1 as any)?.current.toggle(event)}></Button>
                                                </div>
                                            </li>
                                            <li className="border-round-lg pt-2 px-3 pb-2 mb-3" style={{ backgroundColor: 'var(--primary-lighter-color)' }}>
                                                <div className="flex justify-content-between align-items-center mb-1">
                                                    <div className="flex align-items-center gap-1">
                                                        <h6 className="line-height-3 m-0 font-medium">Order</h6>
                                                        <Tag className="m-0 mr-2 px-2 text-xs bg-blue-300" value="#05605"></Tag>
                                                    </div>

                                                    <span className="text-gray-300 font-semibold text-sm line-height-1">1d ago</span>
                                                </div>
                                                <div className="flex justify-content-between align-items-center">
                                                    <span className="mt-1 text-400 block text-sm line-height-1">
                                                        {' '}
                                                        <b>1</b> Bamboo Watch, <b>3</b> Blue Band,{' '}
                                                    </span>
                                                    <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-sm flex-shrink-0" onClick={() => (menu1 as any)?.current.toggle(event)}></Button>
                                                </div>
                                            </li>
                                            <li className="border-round-lg pt-2 px-3 pb-2 mb-3" style={{ backgroundColor: 'var(--primary-lighter-color)' }}>
                                                <div className="flex justify-content-between align-items-center mb-1">
                                                    <div className="flex align-items-center gap-1">
                                                        <h6 className="line-height-3 m-0 font-medium">Order</h6>
                                                        <Tag className="m-0 mr-2 px-2 text-xs bg-blue-300" value="#05462"></Tag>
                                                    </div>

                                                    <span className="text-gray-300 font-semibold text-sm line-height-1">1d ago</span>
                                                </div>
                                                <div className="flex justify-content-between align-items-center">
                                                    <span className="mt-1 text-400 block text-sm line-height-1">
                                                        {' '}
                                                        <b>1</b> Bamboo Watch, <b>3</b> Blue Band,{' '}
                                                    </span>
                                                    <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-sm flex-shrink-0" onClick={() => (menu1 as any)?.current.toggle(event)}></Button>
                                                </div>
                                            </li>
                                            <li className="border-round-lg pt-2 px-3 pb-2 mb-3" style={{ backgroundColor: 'var(--primary-lighter-color)' }}>
                                                <div className="flex justify-content-between align-items-center mb-1">
                                                    <div className="flex align-items-center gap-1">
                                                        <h6 className="line-height-3 m-0 font-medium">Order</h6>
                                                        <Tag className="m-0 mr-2 px-2 text-xs bg-blue-300" value="#05241"></Tag>
                                                    </div>

                                                    <span className="text-gray-300 font-semibold text-sm line-height-1">1w 2d ago</span>
                                                </div>
                                                <div className="flex justify-content-between align-items-center">
                                                    <span className="mt-1 text-400 block text-sm line-height-1">
                                                        {' '}
                                                        <b>1</b> Bamboo Watch, <b>3</b> Blue Band,{' '}
                                                    </span>
                                                    <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-sm flex-shrink-0" onClick={() => (menu1 as any)?.current.toggle(event)}></Button>
                                                </div>
                                            </li>
                                            <li className="border-round-lg pt-2 px-3 pb-2 mb-3" style={{ backgroundColor: 'var(--primary-lighter-color)' }}>
                                                <div className="flex justify-content-between align-items-center mb-1">
                                                    <div className="flex align-items-center gap-1">
                                                        <h6 className="line-height-3 m-0 font-medium">Order</h6>
                                                        <Tag className="m-0 mr-2 px-2 text-xs bg-blue-300" value="#05241"></Tag>
                                                    </div>

                                                    <span className="text-gray-300 font-semibold text-sm line-height-1">1w 2d ago</span>
                                                </div>
                                                <div className="flex justify-content-between align-items-center">
                                                    <span className="mt-1 text-400 block text-sm line-height-1">
                                                        {' '}
                                                        <b>1</b> Bamboo Watch, <b>3</b> Blue Band,{' '}
                                                    </span>
                                                    <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-sm flex-shrink-0" onClick={() => (menu1 as any)?.current.toggle(event)}></Button>
                                                </div>
                                            </li>
                                        </ul>
                                        <Menu ref={menu1} popup={true} model={items}></Menu>
                                    </TabPanel>
                                    <TabPanel headerTemplate={tab2HeaderTemplate}>
                                        <ul className="list-none p-0 overflow-auto" style={{ margin: '0 -1.5rem -1rem', maxHeight: '17.745rem' }}>
                                            <li className="border-round-lg pt-2 px-3 pb-2 mb-3" style={{ backgroundColor: 'var(--primary-lighter-color)' }}>
                                                <div className="flex justify-content-between align-items-center mb-1">
                                                    <div className="flex align-items-center gap-1">
                                                        <h6 className="line-height-3 m-0 font-medium font-medium">
                                                            Message from <b>Anna K.</b>
                                                        </h6>
                                                        <Tag className="m-0 mr-2 px-2 text-xs bg-orange-300" value="#05895"></Tag>
                                                    </div>

                                                    <span className="text-gray-300 font-semibold text-sm line-height-1">4h ago</span>
                                                </div>
                                                <div className="flex justify-content-between align-items-center">
                                                    <span className="mt-1 text-400 block text-sm line-height-1 white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam ad itaque voluptatum deleniti impedit! Inventore eius soluta maxime a quisquam alias, at minima ullam reiciendis blanditiis
                                                        voluptate. Dolore, nisi vel.
                                                    </span>
                                                    <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-sm flex-shrink-0" onClick={() => (menu2 as any)?.current.toggle(event)}></Button>
                                                </div>
                                            </li>
                                            <li className="border-round-lg pt-2 px-3 pb-2 mb-3" style={{ backgroundColor: 'var(--primary-lighter-color)' }}>
                                                <div className="flex justify-content-between align-items-center mb-1">
                                                    <div className="flex align-items-center gap-1">
                                                        <h6 className="line-height-3 m-0 font-medium font-medium">
                                                            Message from <b>Daniel F.</b>
                                                        </h6>
                                                        <Tag className="m-0 mr-2 px-2 text-xs bg-orange-300" value="#05895"></Tag>
                                                    </div>

                                                    <span className="text-gray-300 font-semibold text-sm line-height-1">6h ago</span>
                                                </div>
                                                <div className="flex justify-content-between align-items-center">
                                                    <span className="mt-1 text-400 block text-sm line-height-1 white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam ad itaque voluptatum deleniti impedit! Inventore eius soluta maxime a quisquam alias, at minima ullam reiciendis blanditiis
                                                        voluptate. Dolore, nisi vel.
                                                    </span>
                                                    <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-sm flex-shrink-0" onClick={() => (menu2 as any)?.current.toggle(event)}></Button>
                                                </div>
                                            </li>
                                            <li className="border-round-lg pt-2 px-3 pb-2 mb-3" style={{ backgroundColor: 'var(--primary-lighter-color)' }}>
                                                <div className="flex justify-content-between align-items-center mb-1">
                                                    <div className="flex align-items-center gap-1">
                                                        <h6 className="line-height-3 m-0 font-medium font-medium">
                                                            Message from <b>Judy F.</b>
                                                        </h6>
                                                        <Tag className="m-0 mr-2 px-2 text-xs bg-orange-300" value="#05895"></Tag>
                                                    </div>

                                                    <span className="text-gray-300 font-semibold text-sm line-height-1">1d ago</span>
                                                </div>
                                                <div className="flex justify-content-between align-items-center">
                                                    <span className="mt-1 text-400 block text-sm line-height-1 white-space-nowrap overflow-hidden text-overflow-ellipsis">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam ad itaque voluptatum deleniti impedit! Inventore eius soluta maxime a quisquam alias, at minima ullam reiciendis blanditiis
                                                        voluptate. Dolore, nisi vel.
                                                    </span>
                                                    <Button type="button" icon="pi pi-ellipsis-v" className="p-button-rounded p-button-text p-button-sm flex-shrink-0" onClick={() => (menu2 as any)?.current.toggle(event)}></Button>
                                                </div>
                                            </li>
                                        </ul>
                                        <Menu ref={menu2} popup={true} model={items}></Menu>
                                    </TabPanel>
                                </TabView>
                            </div>
                        </div>
                        <div className="col-12 md:col-6 xl:col-12">
                            <div className="card">
                                <div className="card-header gap-3 pb-2">
                                    <div className="card-title">
                                        <h6>Sales By Category</h6>
                                        <p className="subtitle">Categorized sales data</p>
                                    </div>
                                </div>
                                <div className="flex align-items-center justify-content-between">
                                    <ul className="list-none p-0 m-0">
                                        <li className="mb-3 flex align-items-center">
                                            <i className="pi pi-circle-fill text-primary-300 mr-2"></i>
                                            <span>Watches</span>
                                        </li>
                                        <li className="mb-3 flex align-items-center">
                                            <i className="pi pi-circle-fill text-orange-300 mr-2"></i>
                                            <span>Clothing</span>
                                        </li>
                                        <li className="mb-3 flex align-items-center">
                                            <i className="pi pi-circle-fill text-green-300 mr-2"></i>
                                            <span>Gadgets</span>
                                        </li>
                                        <li className="mb-3 flex align-items-center">
                                            <i className="pi pi-circle-fill text-cyan-300 mr-2"></i>
                                            <span>Accessories</span>
                                        </li>
                                    </ul>
                                    <Chart type="doughnut" data={pieData} options={pieOptions as ChartOptions} height="140" width="140"></Chart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 xl:col-3 p-3">
                    <div className="card overflow-auto">
                        <div className="card-header gap-3">
                            <div className="card-title">
                                <h6>Clients</h6>
                                <p className="subtitle">Your Clients Data</p>
                            </div>
                            <p className="subtitle">8 May</p>
                        </div>
                        <Chart type="line" data={chart1} options={chart1Options as ChartOptions} style={{ maxHeight: '160px' }}></Chart>
                        <div className="p-3 border-round-xl my-3 mx-0" style={{ backgroundColor: 'var(--primary-lighter-color)' }}>
                            <div className="flex align-items-center b-2">
                                <img src="/demo/images/dashboard/subtract.svg" alt="freya-layout" />
                                <h6 className="my-0 mx-2">Insights</h6>
                            </div>
                            <ul className="list-none p-0 m-0">
                                <li className="flex align-items-center justify-content-between text-gray-300 my-2 mx-0">
                                    <span className="font-semibold">
                                        <span className="font-normal text-sm">1</span> Client from Mail CTA
                                    </span>
                                    <span className="p-tag p-tag-warning">12%</span>
                                </li>
                                <li className="flex align-items-center justify-content-between text-gray-300 my-2 mx-0">
                                    <span className="font-semibold">
                                        <span className="font-normal text-sm">2</span> Clients from FB Ads
                                    </span>
                                    <span className="p-tag p-tag-success">UP!</span>
                                </li>
                                <a href="#">See all(4)</a>
                            </ul>
                        </div>
                        <Button type="button" label="Go to Clients Reports" className="p-button-outlined w-full"></Button>
                    </div>
                </div>
                <div className="col-12 xl:col-9 p-3">
                    <div className="card h-full">
                        <div className="card-header gap-3">
                            <div className="card-title">
                                <h6>Ad Managment</h6>
                                <p className="subtitle">
                                    Your <b>Active</b> Ad&lsquo;s ROI&lsquo;s
                                </p>
                            </div>
                            <div className="inline-flex align-items-center">
                                <span className="p-input-icon-left flex-auto">
                                    <i className="pi pi-search"></i>
                                    <InputText type="text" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" className="w-full" style={{ borderRadius: '2rem' }} />
                                </span>
                                <Button icon="pi pi-upload" className="p-button-rounded mx-3" onClick={exportCSV}></Button>
                            </div>
                        </div>
                        <DataTable ref={dt} value={activeAds} expandedRows={expendedRows} globalFilter={globalFilterValue} onRowToggle={(e) => setExpandedRows(e.data)} rowExpansionTemplate={expansionTemplate} rows={3} paginator={true}>
                            <Column expander style={{ width: '3rem' }} />
                            <Column field="name" header="Name" className="px-1" sortable={true} />
                            <Column body={bodyTemplate}></Column>
                            <Column field="adROI" header="Ad ROI" sortable={true} headerClassName="px-1 py-2 text-right" />
                            <Column field="adCTR" header="Ad CTR" sortable={true} headerClassName="px-1 py-2 text-right" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
