import "./Compare.css"
import StarIcon from "../assets/images/icon-star.svg"


function CompareButton() {
	return (<>
		<button className="flex compareButton">
			<div className="flex compareButton-left">
				<img className="flag-img" src={`${import.meta.env.BASE_URL}flags/id.webp`} alt="" />
				<div className="flex compareButton-header">
					<p className="text-preset-4">GBP</p>
					<p className="text-preset-5">British Pound</p>
				</div>
			</div>
			<div className="flex compareButton-rigth">
				<div className="flex compareButton-header">
					<p className="text-preset-3">736.65</p>
					<p className="text-preset-6">@ 0.7366</p>
				</div>
				<button className="">
					<img src={StarIcon} alt="" />
				</button>
			</div>

		</button>
	</>)
}


export function Compare() {
	return (<>
		<div className="flex content-wraper">
			<div className="flex content-header">
				<div className="flex content-header__left">
					<p className="text-preset-4">MULTI-CURRENCY</p>
					<p className="text-preset-3M">1,000 FROM USD</p>
				</div>
				<p className="text-preset-5">8 PAIRS</p>
			</div>
			<div className="flex compare-wraper">
				<CompareButton/>
				<CompareButton/>
				<CompareButton/>
				<CompareButton/>
				<CompareButton/>
				<CompareButton/>

			</div>
		</div>
	</>)
}