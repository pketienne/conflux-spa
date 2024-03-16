'use client';
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { Page } from '../../../../types/layout';

const ForgotPassword: Page = () => {
    const router = useRouter();
    const navigateToDashboard = () => {
        router.push('/');
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
                                        <stop stop-color="var(--primary-400)" />
                                        <stop offset="1" stop-color="var(--primary-700)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </a>
                        <div className="mb-4">
                            <div className="text-900 text-xl font-bold mb-2">Forgot Password</div>
                            <span className="text-600 font-medium">Enter your email to reset your password</span>
                        </div>
                        <div className="flex flex-column">
                            <span className="p-input-icon-left w-full mb-4">
                                <i className="pi pi-envelope"></i>
                                <InputText id="email" type="text" className="w-full md:w-25rem text-color-secondary surface-50 border-200" placeholder="Email" />
                            </span>
                            <div className="flex flex-wrap gap-2 justify-content-between">
                                <Button v-ripple label="Cancel" className="flex-auto p-button-outlined" onClick={navigateToDashboard}></Button>
                                <Button v-ripple label="Submit" className="flex-auto" onClick={navigateToDashboard}></Button>
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

export default ForgotPassword;
