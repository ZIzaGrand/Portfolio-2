import "./Converter.css"
import { useEffect, useState } from "react";
import { useAppContext } from "./Context/AppContext";
import { baseCurrencyData } from "./History"
import { baseCurrency } from "./Constants/Constants";
import SwitchVertical from "../assets/images/icon-exchange-vertical.svg"
import SwitchHorisontal from "../assets/images/icon-exchange.svg"


type ValueProps = {
  _value: number;
  _setValue: (value: number) => void;
  _currancy: string
};


function ConverterInput({_value, _setValue, _currancy}:ValueProps) {
	return (<>
		<div className="flex converterInput-wraper">
			<p className="text-preset-4">SEND</p>
			<div className="flex converterInput-input">
				<input
					 type="number"
					value={_value.toFixed(2)}
					className="text-preset-1"
					onChange={(e) => _setValue(Number(e.target.value))}
					placeholder="0.000"
					style={{
						// width: `${Math.max(_value.toFixed(2).length, 6)}ch`, Доработать для коректного динамического отображения
					}}
				 />
				<button className="flex">
					<img src={`${import.meta.env.BASE_URL}flags/${_currancy.toLowerCase().slice(0,2)}.webp`} alt="" />
					<p className="text-preset-4">{_currancy}</p>
					<span>◣</span>
				</button>
			</div>
		</div>
	</>)
}


export function Converter() {
		
	const { isMobile, currencyData } = useAppContext();

	const imgSwitch = isMobile
		? SwitchVertical
		: SwitchHorisontal;

	const currencyDataFiltred = currencyData
		? currencyData.filter((currency) => currency.quote === baseCurrency.quote)
		: [baseCurrencyData, baseCurrencyData];

	const rate = currencyDataFiltred[1]?.rate ?? 1;

	const [firstValue, setFirstValue] = useState(1);
	const [secondValue, setSecondValue] = useState(rate);

	const [lastChanged, setLastChanged] = useState<"first" | "second">("first");

	useEffect(() => {
		if (lastChanged === "first") {
		const calc = firstValue * rate;

		setSecondValue((prev) => {
			return prev === calc ? prev : calc;
		});
		}

		if (lastChanged === "second") {
		const calc = secondValue / rate;

		setFirstValue((prev) => {
			return prev === calc ? prev : calc;
		});
		}
	}, [firstValue, secondValue, rate, lastChanged]);

	return (<>
		<section className="flex converter">
			<h2 className="text-preset-2">CHECK THE RATE</h2>
			<div className="flex converter-wraper">
				<div className="flex converter-inputs">
					<ConverterInput 
						_value={firstValue} 
						_setValue={(value) => {
							setLastChanged("first");
							setFirstValue(value);
						}} 
						_currancy={baseCurrency.base}
					/>
					<button className="swich-input"><img src={imgSwitch} alt="" /></button>
					<ConverterInput 
						_value={secondValue} 
						_setValue={(value) => {
							setLastChanged("second");
							setSecondValue(value);
						}} 	
						_currancy={baseCurrency.quote}
					/>
				</div>
				<div className="flex converter-buttons">
					<div>
						<p className="text-preset-5">1 USD = 0.8530 EUR</p>
					</div>
					<div className="flex converter-fav__block">
						<button className="text-preset-5M">FAVORITED</button>
						<button className="text-preset-5M">LOG CONVERSION</button>
					</div>
				</div>
			</div>
		</section>
	</>)
}