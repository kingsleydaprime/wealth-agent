import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";

const financeSchema = z.object({
  income: z.number().describe("Monthly income"),
  expenses: z.number().describe("Monthly expenses"),
  savings: z.number().describe("Current savings"),
  goals: z.string().describe("Financial goals"),
});

const wealthWorkflow = createWorkflow({
  id: "wealth-workflow",
  inputSchema: z.object({
    userId: z.string().describe("User ID"),
    finances: financeSchema,
  }),
  outputSchema: z.object({
    plan: z.string().describe("Investment plan"),
    roiProjection: z.number().describe("Projected ROI %"),
  }),
})
  .then(
    createStep({
      id: "assess-finances",
      description: "Assess net worth and flag risks",
      inputSchema: financeSchema,
      outputSchema: financeSchema.extend({
        netWorth: z.number(),
        riskLevel: z.string(),
      }),
      execute: async ({ inputData }) => {
        const net = inputData.income - inputData.expenses;
        if (net < 0)
          throw new Error(
            "Debt cycle detected—repent and restructure (Proverbs 22:7)",
          );
        const risk = net < inputData.savings * 0.5 ? "High" : "Low";
        return { ...inputData, netWorth: net, riskLevel: risk };
      },
    }),
  )
  .then(
    createStep({
      id: "generate-plan",
      description: "Generate biblically-aligned plan",
      inputSchema: financeSchema.extend({
        netWorth: z.number(),
        riskLevel: z.string(),
      }),
      outputSchema: z.object({
        plan: z.string(),
        roiProjection: z.number(),
      }),
      execute: async ({ inputData, mastra }) => {
        const agent = mastra?.getAgent("wealthAgent");
        if (!agent) throw new Error("Wealth agent unavailable");
        const prompt = `Assess: ${JSON.stringify(inputData)}. Prioritize tithing (Malachi 3:10). Suggest 3 ethical investments. Project ROI. Format exactly:\n📖 SCRIPTURAL FOUNDATION\n• [Verse + Insight]\n💰 INVESTMENT PLAN\n• [Asset] - [Rationale, Projected ROI %]\n⚖️ DISCIPLINE CHECK\n• [Habit: Actionable step]\nEnd with ROI projection.`;
        const response = await agent.generate([
          { role: "user", content: prompt },
        ]);
        const plan = response.text || "No plan generated";
        // Extract ROI from response (simple regex for demo; enhance with LLM parse)
        const roiMatch = plan.match(/ROI projection: (\d+)%/i);
        const roi = roiMatch ? parseInt(roiMatch[1], 10) : 15;
        return { plan, roiProjection: roi };
      },
    }),
  );

wealthWorkflow.commit();
export { wealthWorkflow };
