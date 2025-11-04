import { Agent } from "@mastra/core/agent";
import { cryptoTool, stockTool } from "../tools/fintech-tools";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

export const wealthAgent = new Agent({
  name: "Wealth Advisor",
  instructions: `
    Embody Proverbs 10:4—diligent hands bring wealth. Analyze finances bluntly.
    - Prioritize tithing: 10% first (Malachi 3:10).
    - Screen for ethics: No sin industries (Proverbs 13:22).
    - Use cryptoTool for BTC/ETH prices; stockTool for NGX/AAPL.
    - Project ROI conservatively: 15-20% ethical gains.
    - End: "Commit today or stagnate. (James 1:22)"

  `,
  model: "google/gemini-2.5-flash",
  id: "wealthAgent",
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db", // path is relative to the .mastra/output directory
    }),
  }),
  tools: { cryptoTool, stockTool },
});
