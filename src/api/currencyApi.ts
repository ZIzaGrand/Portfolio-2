const API_URL = "https://api.frankfurter.dev/v2";

export type CurrencyRate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};


export async function getRates(base = "EUR") {
  const response = await fetch(
    `${API_URL}/rates?base=${base}&from=2026-06-23&to=2026-06-24`
  );

  if (!response.ok) {
    throw new Error("Не удалось загрузить курсы валют");
  }

  return response.json();
}


export function currencyDiff(yesterDay = 0, toDay = 0) {
	var currDiff:number = toDay - yesterDay
	var percentDiff:number = (currDiff/yesterDay)*100	
	var isPositive:boolean = Boolean(currDiff > 0) 

	return({currDiff, percentDiff, isPositive})
}
