
import { createContext, useContext, useState, useEffect } from "react";
import { useIsMobile } from "../Hooks/useIsMobile";
import {getRates} from "../../api/currencyApi"
import type { CurrencyRate } from "../../api/currencyApi";
import { Log } from "../Log";


type AppContextType = {
	currencyData:CurrencyRate[] | null,
	isMobile: boolean
}


const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
	const isMobile = useIsMobile();	

	const [currencyData, setCurrencyData] = useState<CurrencyRate[] | null>(null);
	useEffect(() => {
		async function LoadRetes() {
			const data = await getRates("USD");
			setCurrencyData(data);
		}

		LoadRetes();
	}, [])

	return (
		<AppContext.Provider value={{ isMobile, currencyData }}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error("useAppContext должен использоваться внутри AppProvider");
	}

	return context;
}