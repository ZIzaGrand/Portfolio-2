import "./Log.css"


function LogButton() {
	return (<>
		<button className="flex compareButton logButton">
			<div className="flex compareButton-left">
				<p className="logButton-text__time text-preset-4">20 May</p>
				<div className="flex compareButton-header logButton-header__left">
					<p className="text-preset-4">GBP</p>
					<img src="/src/assets/images/icon-arrow-right.svg" alt="" />
					<p className="text-preset-4">British Pound</p>
				</div>
			</div>
			<div className="flex compareButton-rigth logButton-right">
				<div className="flex compareButton-header logButton-header__right">
					<p className="text-preset-3">736.65</p>
					<p className="text-preset-3 positive">0.7366</p>
				</div>
				<button className="">
					<img src="/src/assets/images/icon-delete.svg" alt="" />
				</button>
			</div>
		</button>
	</>)
}



export function Log() {
	return(<>
		<div className="flex content-wraper log">
			<div className="flex content-header">
				<div className="flex content-header__left">
					<p className="text-preset-3M">CONVERSION LOG</p>
				</div>
				<div className="flex content-header__rigth">
					<p className="text-preset-5">8 LOGGED</p>
					<button className="text-preset-5">CLEAR ALL</button>
				</div>
			</div>
			<div className="flex compare-wraper">
				<LogButton/>
				<LogButton/>
				<LogButton/>
				<LogButton/>
				<LogButton/>
				<LogButton/>
			</div>
		</div>
	</>)
}