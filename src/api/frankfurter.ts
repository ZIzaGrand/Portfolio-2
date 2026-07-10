export type CurrencyRate = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

type GetRatesParams = {
  base: string;
  quote: string;
  from: string;
  to: string;
};

export async function getCurrencyRates({
  base,
  quote,
  from,
  to,
}: GetRatesParams): Promise<CurrencyRate[]> {
  const url = new URL("https://api.frankfurter.dev/v2/rates");

  url.searchParams.set("base", base.toUpperCase());
  url.searchParams.set("quotes", quote.toUpperCase());
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Не удалось загрузить данные валют");
  }

  const data = (await response.json()) as CurrencyRate[];

  return data
    .filter((item) => item.quote === quote.toUpperCase())
    .sort((a, b) => a.date.localeCompare(b.date));
}
