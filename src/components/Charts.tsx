import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {getCurrencyRates} from "../api/frankfurter"
import type { CurrencyRate } from "../api/frankfurter";
import "./Charts.css";

type CurrencyChartProps = {
  base: string;
  quote: string;
  from: string;
  to: string;
};

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

export function CurrencyChart({ base, quote, from, to }: CurrencyChartProps) {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRates() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getCurrencyRates({
          base,
          quote,
          from,
          to,
        });

        setRates(data);
      } catch {
        setError("Ошибка загрузки графика");
      } finally {
        setIsLoading(false);
      }
    }

    loadRates();
  }, [base, quote, from, to]);

  return (
    <section className="currency-chart">
      {isLoading && <p className="currency-chart__message">Загрузка...</p>}

      {error && <p className="currency-chart__message">{error}</p>}

      {!isLoading && !error && (
        <div className="currency-chart__body">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={rates}
              margin={{
                top: 20,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              <defs>
                <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d7ff2f" stopOpacity={0.65} />
                  <stop offset="70%" stopColor="#d7ff2f" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#d7ff2f" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray="2 6"
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickMargin={16}
                tickFormatter={formatShortDate}
                tick={{
                  fill: "#85858a",
                  fontSize: 10,
                }}
              />

              <YAxis
                width={52}
                axisLine={false}
                tickLine={false}
				tickMargin={10}
                tickCount={3}
                domain={["dataMin - 0.002", "dataMax + 0.002"]}
                tickFormatter={(value) => Number(value).toFixed(4)}
                tick={{
                  fill: "#85858a",
                  fontSize: 10,
                }}
              />

              <Tooltip
                cursor={{
                  stroke: "rgba(255,255,255,0.18)",
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  background: "#202024",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                  color: "#ffffff",
                }}
                labelFormatter={(label) => formatShortDate(String(label))}
                formatter={(value) => [
                  Number(value).toFixed(4),
                  `${base}/${quote}`,
                ]}
              />

              <Area
                dataKey="rate"
				animationDuration={300}
                stroke="#d7ff2f"
                strokeWidth={2.5}
                fill="url(#rateGradient)"
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 0,
                  fill: "#d7ff2f",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}