import { registerApiRoute } from "@mastra/core/server";
import { randomUUID } from "crypto";
import { z } from "zod";

const financeInput = z.object({
  userId: z.string(),
  finances: z.object({
    income: z.number(),
    expenses: z.number(),
    savings: z.number(),
    goals: z.string(),
  }),
});

export const wealthApiRoute = registerApiRoute("a2a/wealth/plan", {
  method: "POST",
  handler: async (c) => {
    try {
      const mastra = c.get("mastra");
      const body = await c.req.json();
      const validated = financeInput.parse(body);
      const workflow = mastra.getWorkflow("wealth-workflow");
      if (!workflow) return c.json({ error: "Workflow unavailable" }, 404);
      const result = await workflow.execute(validated);
      return c.json({
        success: true,
        data: result,
        id: randomUUID(),
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      return c.json({ error: error.message }, 400);
    }
  },
});
