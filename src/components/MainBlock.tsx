import "./MainBlock.css"
import { History } from "./History"
import {Compare} from "./Compare"
import {Favorites} from "./Favorites"
import {Log} from "./Log"
import {Converter} from "./Converter"
import { useAppContext } from "./Context/AppContext";
import type { ReactNode } from "react";


const tabs: Record<string, ReactNode> = {
  	"HISTORY": <History />,
	"COMPARE": <Compare />,
	"FAVORITES": <Favorites />,
	"LOG": <Log />,
};

type TabsData = {
	tabSelected: string
  	onTabClick: (tabName:string) => void;
};

type TabsProps = {
	tabsData: TabsData
};

type TabButtonProps = {
  name: string;
  count: number;
  tabsData: TabsData;
};


function TabButton({name, count, tabsData}: TabButtonProps) {
	var isVisible = count > 0
	const isActive = tabsData.tabSelected == name
	return (<>
		<div className={`flex tabButton-wraper ${isActive ? 'tabButton-active': ''}`}>
			<button className="flex text-preset-3" onClick={() => tabsData.onTabClick(name)}>
				{name}
			</button>

			{isVisible &&(
			<div className="flex tabButton-count">
				<p className="text-preset-6">{count}</p>
			</div>
			)}

		</div>
	</>)
}

function Tabs({tabsData}:TabsProps) {
	
	return (<>
		<div className="flex tabs">
			<TabButton name="HISTORY" count={0} tabsData={tabsData}/>
			<TabButton name="COMPARE" count={0} tabsData={tabsData}/>
			<TabButton name="FAVORITES" count={10} tabsData={tabsData}/>
			<TabButton name="LOG" count={8} tabsData={tabsData}/>
		</div>
		
	</>)
}

function MobileTabs({tabsData}:TabsProps) {
	const [isFocused, setIsFocused] = useState(false);

	function setIsFocusedDelay() {
		setTimeout(() =>{
			setIsFocused(false)
		}, 50)
	}

	return (<>
		<div className="custom-select">
			<button
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocusedDelay()}
				className="text-preset-3 custom-select__button"
			>
				{tabsData.tabSelected}
			</button>

			{isFocused && (
				<ul className="text-preset-3 custom-select__list">
					<li onClick={() => tabsData.onTabClick("HISTORY")}>HISTORY</li>
					<li onClick={() => tabsData.onTabClick("COMPARE")}>COMPARE</li>
					<li onClick={() => tabsData.onTabClick("FAVORITES")}>FAVORITES</li>
					<li onClick={() => tabsData.onTabClick("LOG")}>LOG</li>
				</ul>
      		)}
		</div>
		
	</>)
}

function Divider() {
	return (<>
		<div className="devider"></div>
	</>)
}

function Main() {
	const {isMobile} = useAppContext();
	const [tabSelected, setTabSelected] = useState("HISTORY");
	const refTabs = useRef<HTMLDivElement | null>(null);



	function onTabClick(tabName: string) {
		setTabSelected(tabName);
	}


	const tabsData: TabsData = {
		tabSelected,
		onTabClick
	};

  return (<>
	<main>
		<div className="flex main-wraper">
			<Converter/>
			<section ref={refTabs} className="flex details">
				{isMobile ? 
					<MobileTabs
        				tabsData={tabsData}
					/> :
					<Tabs
        				tabsData={tabsData}
					/>
				}
				<Divider/>
				{tabs[tabSelected]}
			</section>
		</div>
	</main>
  </>);
}

export default Main