import { useAppContext } from "./Context/AppContext";
import "./Header.css"
import Logo from "../assets/images/logo.svg"


function Header() {
	const {isMobile} = useAppContext();
	const className = isMobile?"text-preset-6":"text-preset-4";

	return (<>
		<header>
			<div className="flex header-wraper"> 
				<img src={Logo} alt="" />
				<p className={className}>55 CURRENCIES · EOD · ECB DATA</p>
			</div>
		</header>
	</>);
}

export default Header