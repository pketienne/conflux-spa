'use client';
import React from 'react';
import { Button } from 'primereact/button';
import { Page } from '../../../../types/layout';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';

const Lockscreen: Page = () => {
    const router = useRouter();
    const navigateToDashboard = () => {
        router.push('/');
    };
    return (
        <div className="surface-0">
            <div className="flex align-items-center justify-content-between flex-column h-screen">
                <div className="flex flex-column align-items-center justify-content-center w-full md:w-4 h-full text-center py-6 px-4">
                    <a onClick={navigateToDashboard} style={{ cursor: 'pointer' }}>
                        <svg height="56" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H6.00019V3.82345L17 1.66667V6.66667L6.00019 8.82345V10.4901L17 8.33333V13.3333L6.00019 15.4901V20H0V0Z" fill="url(#paint0_linear)" />
                            <defs>
                                <linearGradient id="paint0_linear" x1="3.33335" y1="3.08442e-08" x2="8.49995" y2="20" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="var(--primary-400)" />
                                    <stop offset="1" stop-color="var(--primary-700)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </a>
                    <div className="text-center mt-6" style={{ marginBottom: '3.5rem' }}>
                        <div className="text-primary text-xl font-semibold mb-2">Lock Screen</div>
                        <span className="text-500 font-normal mb-5">Please enter your password</span>
                    </div>
                    <div className="mb-4 w-full md:w-25rem flex gap-4 align-items-center justify-content-between">
                        <div className="text-center flex align-items-center">
                            <img src="/demo/images/avatar/amyelsner.png" className="w-3rem h-3rem mb-2" alt="Avatar" />
                            <div className="flex flex-column gap-1 ml-3 text-left">
                                <span className="font-normal text-lg text-900">Amy Elsner</span>
                                <span className="font-normal text-500">Webmaster</span>
                            </div>
                        </div>

                        <Button v-ripple icon="pi pi-sign-out" label="Signout" className="p-button-text" onClick={navigateToDashboard}></Button>
                    </div>
                    <div className="flex flex-column w-full md:w-25rem">
                        <span className="p-input-icon-left w-full mb-4">
                            <i className="pi pi-lock"></i>
                            <InputText id="password" type="password" className="w-full md:w-25rem text-color-secondary surface-50 border-200" placeholder="Password" />
                        </span>
                        <Button label="Unlock" className="w-full" onClick={navigateToDashboard}></Button>
                        <span className="font-normal text-500 mt-4">Forgot password? </span>
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
    );
};

export default Lockscreen;
