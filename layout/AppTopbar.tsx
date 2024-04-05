import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { LayoutContext } from './context/layoutcontext';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';
import { signOut } from 'aws-amplify/auth';
import { classNames } from 'primereact/utils';
import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AppSidebar from './AppSidebar';

const AppTopbar = forwardRef((props: { sidebarRef: React.RefObject<HTMLDivElement> }, ref) => {
	const { onMenuToggle, showRightSidebar, showConfigSidebar, isHorizontal } = useContext(LayoutContext);

	const menubuttonRef = useRef(null);
	const buttonref = useRef(null);
	const btnRef1 = useRef(null);
	const imgRef = useRef(null);
	const privacyRef = useRef(null);
	const settingsRef = useRef(null);
	const logoutRef = useRef(null);

	const router = useRouter();

	const onMenuButtonClick = () => {
		onMenuToggle();
	};

	const onConfigButtonClick = () => {
		showConfigSidebar();
	};

	const onLogoutLinkClick = async () => {
		await signOut();
		router.push('/auth');
	};

	useImperativeHandle(ref, () => ({
		menubutton: menubuttonRef.current,
	}));

	return (
		<>
			<div className="layout-topbar">
				<div className="topbar-start">
					<button ref={buttonref} type="button" className="topbar-menubutton p-link p-trigger transition-duration-300" onClick={onMenuButtonClick}>
						<i className="pi pi-bars"></i>
					</button>
				</div>
				<div className="layout-topbar-menu-section">
					<AppSidebar sidebarRef={props.sidebarRef} />
				</div>
				<div className="topbar-end">
					<ul className="topbar-menu">
						<li className={classNames({ 'topbar-search hidden ': isHorizontal(), 'topbar-search hidden sm:block': !isHorizontal() })}>
							<span className="p-input-icon-left">
								<i className="pi pi-search"></i>
								<InputText type="text" placeholder="Search" className="w-12rem sm:w-full" />
							</span>
						</li>

						<li className={classNames({ 'block topbar-item ': isHorizontal(), 'block sm:hidden topbar-item': !isHorizontal() })}>
							<StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="px-scalein" leaveToClassName="hidden" leaveActiveClassName="px-fadeout" hideOnOutsideClick>
								<Button ref={btnRef1} type="button" icon="pi pi-search" className="p-button-text p-button-secondary"></Button>
							</StyleClass>
							<ul className="hidden topbar-menu active-topbar-menu p-3 w-15rem  z-5" style={{ bottom: '-5.8rem' }}>
								<span className="p-input-icon-left w-full">
									<i className="pi pi-search"></i>
									<InputText type="text" placeholder="Search" className="w-full" />
								</span>
							</ul>
						</li>
						<li className="topbar-item">
							<StyleClass nodeRef={imgRef} selector="@next" enterClassName="hidden" enterActiveClassName="px-scalein" leaveToClassName="hidden" leaveActiveClassName="px-fadeout" hideOnOutsideClick>
								<a ref={imgRef} className="p-ripple cursor-pointer">
									<img className="border-round-xl" src="/layout/images/avatar/square/avatar-m-1.jpg" alt="Profile" />
									<Ripple />
								</a>
							</StyleClass>
							<ul className="topbar-menu active-topbar-menu p-4 w-15rem z-5 hidden">
								<li role="menuitem" className="m-0 mb-3">
									<StyleClass nodeRef={privacyRef} selector="@grandparent" enterClassName="hidden" enterActiveClassName="px-scalein" leaveToClassName="hidden" leaveActiveClassName="px-fadeout" hideOnOutsideClick>
										<a ref={privacyRef} className="flex align-items-center hover:text-primary-500 transition-duration-200">
											<i className="pi pi-fw pi-lock mr-2"></i>
											<span>Privacy</span>
										</a>
									</StyleClass>
								</li>
								<li role="menuitem" className="m-0 mb-3">
									<StyleClass nodeRef={settingsRef} selector="@grandparent" enterClassName="hidden" enterActiveClassName="px-scalein" leaveToClassName="hidden" leaveActiveClassName="px-fadeout" hideOnOutsideClick>
										<a ref={settingsRef} className="flex align-items-center hover:text-primary-500 transition-duration-200">
											<i className="pi pi-fw pi-cog mr-2"></i>
											<span>Settings</span>
										</a>
									</StyleClass>
								</li>
								<li role="menuitem" className="m-0">
									<StyleClass nodeRef={logoutRef} selector="@grandparent" enterClassName="hidden" enterActiveClassName="px-scalein" leaveToClassName="hidden" leaveActiveClassName="px-fadeout" hideOnOutsideClick>
										<a onClick={onLogoutLinkClick} ref={logoutRef} className="flex align-items-center hover:text-primary-500 transition-duration-200">
											<i className="pi pi-fw pi-sign-out mr-2"></i>
											<span>Logout</span>
										</a>
									</StyleClass>
								</li>
							</ul>
						</li>
						<li>
							<Button type="button" icon="pi pi-cog" text className=" p-button-secondary flex-shrink-0" onClick={onConfigButtonClick}></Button>
						</li>
						<li>
							<Button type="button" icon="pi pi-arrow-left" text className=" p-button-secondary flex-shrink-0" onClick={showRightSidebar}></Button>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
