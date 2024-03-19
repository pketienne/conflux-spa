'use client';
import React, { useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import type { Page } from '@/types';
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/navigation';

const Verification: Page = () => {
    const [value1, setValue1] = useState<number | null>();
    const [value2, setValue2] = useState<number | null>();
    const [value3, setValue3] = useState<number | null>();
    const [value4, setValue4] = useState<number | null>();
    const router = useRouter();
    const navigateToDashboard = () => {
        router.push('/');
    };

    const onDigitInput = (event: React.KeyboardEvent<HTMLSpanElement>, currentInputId: number) => {
        const isDigit = event.code.includes('Numpad') || event.code.includes('Digit');
        const isBackspace = event.code === 'Backspace';
        let nextInputId: number | null = null;

        if (isDigit) {
            nextInputId = currentInputId + 1;
        } else if (isBackspace) {
            nextInputId = currentInputId - 1;
        }

        const element = nextInputId !== null ? document.getElementById('val' + nextInputId) : null;

        if (element) {
            element.focus();
        }
    };

    return (
        <>
            <div className="surface-0">
                <div className="flex align-items-center justify-content-between flex-column h-screen">
                    <div className="flex flex-column align-items-center justify-content-center w-full md:w-4 h-full text-center py-6 px-4">
                        <a onClick={navigateToDashboard} className="mb-6" style={{ cursor: 'pointer' }}>
                            <svg height="56" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H6.00019V3.82345L17 1.66667V6.66667L6.00019 8.82345V10.4901L17 8.33333V13.3333L6.00019 15.4901V20H0V0Z" fill="url(#paint0_linear)" />
                                <defs>
                                    <linearGradient id="paint0_linear" x1="3.33335" y1="3.08442e-08" x2="8.49995" y2="20" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="var(--primary-400)" />
                                        <stop offset="1" stopColor="var(--primary-700)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </a>
                        <div className="mb-4">
                            <div className="text-900 text-xl font-bold mb-2">Verification</div>
                            <span className="text-600 font-medium">We have sent code to you email:</span>
                            <div className="flex align-items-center mt-1">
                                <i className="pi pi-envelope text-600"></i>
                                <span className="text-900 font-bold ml-2">dm**@gmail.com</span>
                            </div>
                        </div>
                        <div className="flex flex-column">
                            <div className="flex justify-content-between w-full align-items-center mb-4 gap-3">
                                <InputNumber id="input1" inputId="val1" value={value1} onValueChange={(e) => setValue1(e.value)} inputClassName="w-3rem text-center" maxLength={1} onKeyUp={(e) => onDigitInput(e, 1)}></InputNumber>
                                <InputNumber id="input2" inputId="val2" value={value2} onValueChange={(e) => setValue2(e.value)} inputClassName="w-3rem text-center" maxLength={1} onKeyUp={(e) => onDigitInput(e, 2)}></InputNumber>
                                <InputNumber id="input3" inputId="val3" value={value3} onValueChange={(e) => setValue3(e.value)} inputClassName="w-3rem text-center" maxLength={1} onKeyUp={(e) => onDigitInput(e, 3)}></InputNumber>
                                <InputNumber id="input4" inputId="val4" value={value4} onValueChange={(e) => setValue4(e.value)} inputClassName="w-3rem text-center" maxLength={1} onKeyUp={(e) => onDigitInput(e, 4)}></InputNumber>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-content-between">
                                <Button label="Cancel" className="flex-auto p-button-outlined" onClick={navigateToDashboard}></Button>
                                <Button label="Verify" className="flex-auto" onClick={navigateToDashboard}></Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap align-items-center pb-8 px-4">
                        <h4 className="m-0 mr-5" style={{ lineHeight: '22px' }}>
                            freya
                        </h4>
                        <h6 className="m-0 font-medium text-300" style={{ lineHeight: '17px' }}>
                            Copyright Ⓒ PrimeTek Informatics
                        </h6>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Verification;
