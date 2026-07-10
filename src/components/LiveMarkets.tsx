import './LiveMarkets.css'
import { useAppContext } from './Context/AppContext';
import type { CurrencyRate } from "../api/currencyApi";
import { currencyDiff } from "../api/currencyApi";


function CurrencyCompare({_currency}:{_currency:CurrencyRate}) {
	const {isMobile, currencyData} = useAppContext();
	const textClass = isMobile ? "text-preset-6": "flex text-preset-5"
	var currencyDataFiltred:CurrencyRate[]
	var currDiff:number = 0
	var percentDiff:number = 0
	var isPositive:boolean = false

	if (currencyData){
		currencyDataFiltred = currencyData.filter((currency) => currency.quote === _currency.quote)
		if (currencyDataFiltred.length > 1){
			var {currDiff, percentDiff, isPositive} = currencyDiff(currencyDataFiltred[0].rate, currencyDataFiltred[1].rate)
		}
	}




	return(<>
		<div className='flex currencyCompare-block'>
			<div id='currency' className='flex'>
				<p className={`flex ${textClass}`}>{_currency.base}/{_currency.quote}</p>
			</div>
			<div id='diff' className='flex'>
				<p className={`flex ${textClass}`}>{currDiff.toFixed(4)}</p>
			</div>
			<div id='persDiff' className={`flex ${isPositive ? 'positive' : currDiff ==0 ? '' :'negative'}`}>
				<p className={`flex ${textClass}`}>{`${isPositive	?'+':''}`+percentDiff.toFixed(2)}%</p>
			</div>
		</div>
	</>)
}

function LiveMarkets() {
	const {isMobile, currencyData} = useAppContext();
	const textClass = isMobile 
					?"text-preset-6"
					:"flex text-preset-5";

	const currencyDataFirst25 = currencyData?.slice(40, 70) ?? [];


	return (<>
		<section className='liveMarket'>
			<div className='flex liveMarket-wraper'>
				<div className='flex liveMarket-header'>
					<h3 className={`flex ${textClass}`}>
						LIVE MARKETS
					</h3>
				</div>
				<div className='liveMarket-scroll'>
					<div className='flex liveMarket-currencyCompare'>
						{currencyDataFirst25?.map((currency, index) => 
							<CurrencyCompare 
								key={`first-${currency.base}-${currency.quote}-${index}`} 
								_currency={currency}
							/>
						)}
						{/* Копия списка для бесшовного повторения */}
						{currencyDataFirst25?.map((currency, index) => 
							<CurrencyCompare 
								key={`second-${currency.base}-${currency.quote}-${index}`} 
								_currency={currency}
							/>
						)}
					</div>	
				</div>
			</div>
		</section>
	</>);
}

export default LiveMarkets