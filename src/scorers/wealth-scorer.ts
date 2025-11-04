import { createScorer } from "@mastra/core/scores";
import { z } from "zod";

export const disciplineScorer = createScorer({
  id: "discipline-score",
  description: "Score user discipline (0-100)",
  inputSchema: z.object({
    plan: z.string(),
    userResponse: z.string().optional(),
  }),
  outputSchema: z.number(),
  execute: async ({ inputData }) => {
    // Simple heuristic: Keywords indicating commitment
    const commitmentWords = ["commit", "start", "tithe", "invest"];
    const score = inputData.userResponse
      ? (commitmentWords.filter((word) =>
          inputData.userResponse.toLowerCase().includes(word),
        ).length /
          commitmentWords.length) *
        100
      : 50; // Default neutral
    return Math.round(score);
  },
});

export const roiScorer = createScorer({
  id: "roi-score",
  description: "Validate ROI projection realism",
  inputSchema: z.object({
    projectedRoi: z.number(),
    marketData: z.record(z.number()).optional(),
  }),
  outputSchema: z.number(),
  execute: async ({ inputData }) => {
    const avgMarketRoi = 12; // Conservative baseline
    const variance = Math.abs(inputData.projectedRoi - avgMarketRoi);
    return Math.max(0, 100 - variance * 5); // Penalize outliers
  },
});
