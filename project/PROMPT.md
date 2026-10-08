Load the project harness from antigravity.json (frontend and backend workspaces, permissions, rules) and the brand rules from DESIGN.md.

Objectives: 
(1) update frontend/index.html and frontend/index.css according to DESIGN.md -
remove all banned marketing copy such as Synergy, Consulting, best-in-class, leverage, end-to-end, consultant, remove every forbidden box-shadow, align colors and typography with DESIGN.md tokens;
(2) correct every legacy ACME Corp reference to ACME Inc; 
(3) upgrade obsolete dependencies in frontend/package.json and backend/package.json to the latest stable major version published on npm (check with npm view <pkg> version), do not change any other backend code.
Split the work across parallel sub-agents: 
one for Frontend Modernization, one for Dependency Auditing. 
Generate short plan and report artifacts. 
Run verification checks in frontend (node scripts/check-brand.mjs, node scripts/check-deps.mjs and npm run build). 
Ask for my approval before writing to any file. 
After the checks, present a report with the results and the final diff for review. 
Do not commit — I decide whether to commit. 
Do not deploy.