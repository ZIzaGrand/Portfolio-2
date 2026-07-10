import { CurrencyChart } from "./Charts";
import { useAppContext } from './Context/AppContext';
import type { CurrencyRate } from "../api/currencyApi";
import { currencyDiff } from "../api/currencyApi";
import { baseCurrency } from "./Constants/Constants";
import "./History.css"


export const baseCurrencyData: CurrencyRate = {
	base:"RUB",
	quote:"USD",
	date:"2026-06-24",
	rate:1

}

export function History() {
	
	const {currencyData} = useAppContext();
	var currencyDataFiltred:CurrencyRate[]
	var currDiff:number = 0
	var percentDiff:number = 0
	var isPositive:boolean = false


	if (currencyData){
		currencyDataFiltred = currencyData.filter((currency) => currency.quote === baseCurrency.quote)
		if (currencyDataFiltred.length > 1){
			var {currDiff, percentDiff, isPositive} = currencyDiff(currencyDataFiltred[0].rate, currencyDataFiltred[1].rate)
		}
	}
	else{
		currencyDataFiltred = [baseCurrencyData, baseCurrencyData]
	}

	var className = isPositive ? 'positive' : currDiff ==0 ? '' :'negative'


	return (<>
	<div className="flex history-wraper">
		<div className="flex stats-wraper">
			<div className="flex stats">
				<div className="flex stat">
					<p className="text-preset-4">OPEN</p>
					<p className="text-preset-2">{currencyDataFiltred[0].rate}</p>
				</div>
				<div className="flex stat">
					<p className="text-preset-4">LAST</p>
					<p className="text-preset-2">{currencyDataFiltred[1].rate}</p>
				</div>
				<div className="flex stat">
					<p className="text-preset-4">CHANGE</p>
					<p className={`text-preset-2 ${className}`}>{`${isPositive?'+':''}`+currDiff.toFixed(4)}</p>
				</div>
				<div className="flex stat">
					<p className="text-preset-4">% CHANGE</p>
					<div className={className}>
						<p className={`text-preset-2`}>{`${isPositive?'+':''}`+percentDiff.toFixed(2)}%</p>
					</div>
				</div>
			</div>
			<div className="flex periods-wraper">
				<ul className="flex">
					<li className="flex text-preset-5">1D</li>
					<li className="flex text-preset-5">1W</li>
					<li className="flex text-preset-5 active">1M</li>
					<li className="flex text-preset-5">1Y</li>
					<li className="flex text-preset-5">5Y</li>
				</ul>
			</div>
		</div>
		<Chart/>
	</div>
	</>)
}

function Chart() {
	const {currencyData} = useAppContext();
	var currencyDataFiltred:CurrencyRate[]

	if (currencyData){
		currencyDataFiltred = currencyData.filter((currency) => currency.quote === baseCurrency.quote)
	}
	else{
		currencyDataFiltred = [baseCurrencyData]
	}

	const date = new Date()
	const dateString:string = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

	return (<>
		<div className="flex content-wraper">
			<div className="flex content-header chart-header">
				<p className="text-preset-3M">{baseCurrency.base}/{baseCurrency.quote}</p>
				<p className="text-preset-5">{currencyDataFiltred[0].rate} · MAY 14 16:00 CET</p>
			</div>
			<div className="chart">
				<CurrencyChart
				base={baseCurrency.base}
				quote={baseCurrency.quote}
				from="2026-01-14"
				to={dateString}
      />
			</div>
		</div>
	</>)
}

