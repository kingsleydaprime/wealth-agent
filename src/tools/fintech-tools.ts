import { createTool } from "@mastra/core/tools";
import { z } from "zod";

export const cryptoTool = createTool({
  id: "crypto-prices",
  description: "Fetch live prices for ethical cryptos (BTC, ETH)",
  inputSchema: z.object({
    symbols: z
      .array(z.string())
      .describe("Crypto IDs, e.g., ['bitcoin', 'ethereum']"),
  }),
  outputSchema: z.object({
    prices: z.record(z.number()).describe("Symbol: USD price"),
  }),
  execute: async ({ context }) => {
    const ids = context.symbols.join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Crypto API failure");
    const data = await response.json();
    return { prices: data };
  },
});

export const stockTool = createTool({
  id: "stock-prices",
  description: "Fetch ethical stock prices (AAPL, NGX via proxy)",
  inputSchema: z.object({
    symbols: z.array(z.string()).describe("Tickers, e.g., ['AAPL']"),
  }),
  outputSchema: z.object({
    prices: z.record(z.number()).describe("Ticker: USD price"),
  }),
  execute: async ({ context }) => {
    // Demo: Use coingecko for stocks if no Polygon; adapt for prod
    const ids = context.symbols.join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`; // Fallback; use Polygon in env
    const response = await fetch(url);
    if (!response.ok) throw new Error("Stock API failure");
    const data = await response.json();
    return { prices: data };
  },
});
