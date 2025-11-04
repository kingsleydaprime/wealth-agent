# Mastra FinTech Wealth Advisor

## Overview
Biblically-aligned AI for Nigerian entrepreneurs. Assesses finances, suggests ethical investments (Proverbs 13:22). Prioritizes tithing, projects ROI 15-20%. Deploy for generational wealth.

## Features
- **Finance Assessment**: Net worth calc, debt flags (Proverbs 22:7).
- **Investment Plans**: 3 ethical assets (stocks, crypto via CoinGecko).
- **Discipline Scoring**: Habit enforcement.
- **API Endpoint**: POST `/wealth/plan` for plans.
- **Persistence**: LibSQL DB for audits.
- **Observability**: Tracing enabled.

## Quick Start
1. Clone repo.
2. `npm install`
3. Set env: `OPENAI_API_KEY=your_key` (for GPT-4o).
4. `npm run dev`
5. Test API:
   ```bash
   curl -X POST http://localhost:3000/wealth/plan \
   -H "Content-Type: application/json" \
   -d '{
     "userId": "test123",
     "finances": {
       "income": 5000,
       "expenses": 3000,
       "savings": 1000,
       "goals": "Retire at 50"
     }
   }'
   ```

## Architecture
- **Workflow**: `wealth-workflow.ts` – Assess → Plan.
- **Agent**: `wealth-agent.ts` – GPT-4o + tools.
- **Tools**: Crypto/Stock prices.
- **Scorers**: Discipline/ROI validation.
- **Route**: `/wealth/plan` handler.

## Biblical Mandate
Tithe first (Malachi 3:10). Build legacy—diligent hands bring wealth (Proverbs 10:4). Commit or stagnate.
