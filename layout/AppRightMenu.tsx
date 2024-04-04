import { Sidebar } from 'primereact/sidebar';
import { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { Button } from 'primereact/button';

const AppProfileSidebar = () => {
	const { layoutState, setLayoutState, layoutConfig } = useContext(LayoutContext);

	const onRightMenuHide = () => {
		setLayoutState((prevLayoutState) => ({
			...prevLayoutState,
			rightMenuActive: false,
		}));
	};

	return (
		<Sidebar visible={layoutState.rightMenuActive} onHide={onRightMenuHide} baseZIndex={1000} position="right" showCloseIcon={false}>
			<div className="p-0 py-3weather-section">
				<div className="flex align-items-center justify-content-between mb-3">
					<h6 className="m-0">Today</h6>
				</div>
				<div className="weather flex align-items-center py-3 px-4 bg-center bg-no-repeat bg-cover border-round-lg" style={{ boxShadow: '0px 10px 40 rgba(#293241, 6%)', backgroundImage: "url('/demo/images/rightpanel/asset-weather.png')" }}>
					<img src="/demo/images/rightpanel/icon-sun.svg" alt="freya-layout" style={{ height: '60px' }} />
					<div className="ml-3">
						<h6 className="m-0 mb-1" style={{ color: 'rgb(83 88 99)' }}>
							Ankara, 22 May
						</h6>
						<h1 className="m-0" style={{ color: 'rgb(83 88 99)' }}>
							24º
						</h1>
					</div>
				</div>
			</div>

			<div className="rightpanel-section mt-4">
				<div className="flex align-items-center justify-content-between mb-3">
					<h6 className="m-0">My list</h6>
					<Button type="button" text rounded icon="pi pi-plus" className="p-button-secondary "></Button>
				</div>
				<ul className="list-none p-0 m-0 overflow-auto" style={{ maxHeight: '330px' }}>
					<li className="p-3 border-round-lg surface-0 mb-3 flex align-items-center justify-content-between">
						<div>
							<h6 className="m-0 mb-2 text-color">Perform usability testing for P15 MVP</h6>
							<span className="text-400 line-height-3 block font-medium">-Public pages</span>
							<span className="text-400 line-height-3 block font-medium">-Product pages</span>
						</div>
					</li>
					<li className="p-3 border-round-lg surface-0 mb-3 flex align-items-center justify-content-between">
						<div>
							<h6 className="m-0 mb-2 text-color">Buy puzzle set from Amazon</h6>
							<span className="text-400 line-height-3 block font-medium">Ravensburger Seurat, 2000</span>
						</div>
					</li>
					<li className="opacity-50 p-3 border-round-lg surface-0 mb-3 flex align-items-center justify-content-between">
						<div>
							<h6 className="m-0 mb-2 text-color line-through">Morning Run</h6>
						</div>
						<i className="pi pi-check"></i>
					</li>
					<li className="opacity-50 p-3 border-round-lg surface-0 mb-3 flex align-items-center justify-content-between">
						<div>
							<h6 className="m-0 mb-2 text-color line-through">Morning Run</h6>
						</div>
						<i className="pi pi-check"></i>
					</li>
				</ul>
			</div>

			<div className="p-0 favorites-section mt-4">
				<div className="flex align-items-center justify-content-between mb-3">
					<h6 className="m-0">Favorites</h6>
				</div>
				<div className="favorite-items flex align-items-center flex-wrap" style={{ margin: '-7px' }}>
					<a
						href="#"
						className="favorite-item hover:surface-50 surface-0 flex align-items-center justify-content-center border-round-xl m-2 transition-all transition-duration-200"
						style={{ width: '80px', height: '80px', boxShadow: '0px 0px 2px rgba(41, 50, 65, 0.3), 0px 1px 2px rgba(41, 50, 65, 0.2)', backgroundColor: 'rgba(41, 127, 255, 0.03)' }}
					>
						<img src="/demo/images/rightpanel/github.svg" alt="freya-layout" />
					</a>
					<a
						href="#"
						className="favorite-item hover:surface-50 surface-0 flex align-items-center justify-content-center border-round-xl m-2 transition-all transition-duration-200"
						style={{ width: '80px', height: '80px', boxShadow: '0px 0px 2px rgba(41, 50, 65, 0.3), 0px 1px 2px rgba(41, 50, 65, 0.2)', backgroundColor: 'rgba(41, 127, 255, 0.03)' }}
					>
						<img src="/demo/images/rightpanel/slack.svg" alt="freya-layout" />
					</a>
					<a
						href="#"
						className="favorite-item hover:surface-50 surface-0 flex align-items-center justify-content-center border-round-xl m-2 transition-all transition-duration-200"
						style={{ width: '80px', height: '80px', boxShadow: '0px 0px 2px rgba(41, 50, 65, 0.3), 0px 1px 2px rgba(41, 50, 65, 0.2)', backgroundColor: 'rgba(41, 127, 255, 0.03)' }}
					>
						<img src="/demo/images/rightpanel/aws.svg" alt="freya-layout" />
					</a>
					<a
						href="#"
						className="favorite-item hover:surface-50 surface-0 flex align-items-center justify-content-center border-round-xl m-2 transition-all transition-duration-200"
						style={{ width: '80px', height: '80px', boxShadow: '0px 0px 2px rgba(41, 50, 65, 0.3), 0px 1px 2px rgba(41, 50, 65, 0.2)', backgroundColor: 'rgba(41, 127, 255, 0.03)' }}
					>
						<img src="/demo/images/rightpanel/jenkins.svg" alt="freya-layout" />
					</a>
					<a
						href="#"
						className="favorite-item hover:surface-50 surface-0 flex align-items-center justify-content-center border-round-xl m-2 transition-all transition-duration-200"
						style={{ width: '80px', height: '80px', boxShadow: '0px 0px 2px rgba(41, 50, 65, 0.3), 0px 1px 2px rgba(41, 50, 65, 0.2)', backgroundColor: 'rgba(41, 127, 255, 0.03)' }}
					>
						<img src="/demo/images/rightpanel/jira.svg" alt="freya-layout" />
					</a>
					<a
						href="#"
						className="favorite-item hover:surface-50 surface-0 flex align-items-center justify-content-center border-round-xl m-2 transition-all transition-duration-200 border-1 border-dashed surface-border"
						style={{ width: '80px', height: '80px', backgroundColor: 'rgba(41, 127, 255, 0.03)' }}
					>
						<i className="pi pi-plus"></i>
					</a>
				</div>
			</div>

			<div className="p-0 py-3chat-section chat"></div>
		</Sidebar>
	);
};

export default AppProfileSidebar;
