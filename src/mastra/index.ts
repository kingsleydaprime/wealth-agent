import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { wealthWorkflow } from "../workflows/wealth-workflow";
import { wealthAgent } from "../agents/wealth-agent";
import { disciplineScorer, roiScorer } from "../scorers/wealth-scorer";
import { wealthApiRoute } from "../routes/wealth-route";

export const mastra = new Mastra({
  workflows: { wealthWorkflow },
  agents: { wealthAgent },
  scorers: { disciplineScorer, roiScorer },
  server: { apiRoutes: [wealthApiRoute] },
  storage: new LibSQLStore({ url: "file:../../mastra.db" }),
  logger: new PinoLogger({ name: "Wealth Mastra", level: "warn" }),
  observability: { default: { enabled: true } },
});
