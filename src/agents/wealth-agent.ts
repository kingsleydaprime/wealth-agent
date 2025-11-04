import { Agent } from "@mastra/core/agent";
import { cryptoTool, stockTool } from "../tools/fintech-tools";

export const wealthAgent = new Agent({
  name: "Wealth Advisor",
  instructions: `
    Embody Proverbs 10:4—diligent hands bring wealth. Analyze finances bluntly.
    - Prioritize tithing: 10% first (Malachi 3:10).
    - Screen for ethics: No sin industries (Proverbs 13:22).
    - Use cryptoTool for BTC/ETH prices; stockTool for NGX/AAPL.
    - Project ROI conservatively: 15-20% ethical gains.
    - End: "Commit today or stagnate. (James 1:22)"
    Model: "openai/gpt-4o".
  `,
  model: "openai/gpt-4o",
  tools: { cryptoTool, stockTool },
});
