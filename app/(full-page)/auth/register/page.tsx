'use client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import type { Page } from '@/types';
import { Password } from 'primereact/password';
import { useRouter } from 'next/navigation';
import { Checkbox } from 'primereact/checkbox';

const Register: Page = () => {
    const [checked, setChecked] = useState(Boolean);

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
                            <div className="text-900 text-xl font-bold mb-2">Register</div>
                            <span className="text-600 font-medium">Let&apos;s get started</span>
                        </div>
                        <div className="flex flex-column">
                            <span className="p-input-icon-left w-full mb-4">
                                <i className="pi pi-user"></i>
                                <InputText id="username" type="text" className="w-full md:w-25rem text-color-secondary surface-50 border-200" placeholder="Username" />
                            </span>
                            <span className="p-input-icon-left w-full mb-4">
                                <i className="pi pi-envelope"></i>
                                <InputText id="email" type="text" className="w-full md:w-25rem text-color-secondary surface-50 border-200" placeholder="Email" />
                            </span>
                            <span className="p-input-icon-left w-full mb-4">
                                <i className="pi pi-lock z-2"></i>
                                <Password
                                    id="password"
                                    placeholder="Password"
                                    v-model="value"
                                    className="w-full"
                                    inputStyle={{ paddingLeft: '2.5rem' }}
                                    inputClassName="w-full md:w-25rem text-color-secondary surface-50 border-200"
                                    toggleMask
                                ></Password>
                            </span>
                            <div className="mb-4 flex flex-wrap align-items-center">
                                <Checkbox id="rememberme" onChange={(e) => setChecked(e.checked as boolean)} checked={checked} className="mr-2" />
                                <label htmlFor="checkbox" className="text-900 font-medium mr-2">
                                    {' '}
                                    I have read the
                                </label>
                                <a className="text-600 cursor-pointer hover:text-primary cursor-pointer">Terms and Conditions</a>
                            </div>
                            <Button label="Sign Up" className="w-full mb-4" onClick={navigateToDashboard} v-ripple></Button>
                            <span className="font-medium text-600">
                                Already have an account? <a className="font-semibold cursor-pointer text-900 hover:text-primary transition-colors transition-duration-300">Login</a>
                            </span>
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

export default Register;
