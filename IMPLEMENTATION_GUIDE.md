# Implementation Guide – Agentic Development Team on GitHub

This guide walks through setting up the multi-agent collaboration system using GitHub as the central platform.

---

## Phase 1: GitHub Repository Setup

1. **Create a new repository** on GitHub:
   - Name: `agentic-dev-team-project`
   - Visibility: **Public** (if using GitHub Free, branch protection requires public repo)
   - Initialize: √ Add README, √ Add .gitignore (Node), √ Choose license (MIT)

2. **Clone locally**:
   ```bash
   git clone git@github.com:your-org/agentic-dev-team-project.git
   cd agentic-dev-team-project
   ```

3. **Create directory structure**:
   ```bash
   mkdir -p .github/workflows docs/{requirements,architecture,implementation,review,testing} scripts sub-agent-prompts
   ```

4. **Copy files** from design repo (`projects/agentic-dev-team/`) or templates:
   - `.github/CODEOWNERS`
   - `.github/workflows/validate-handoff.yml`
   - `.github/workflows/update-status.yml`
   - `.github/PULL_REQUEST_TEMPLATE.md`
   - Placeholder handoff files into each `docs/[role]/`
   - `STATUS.md` (initial)

5. **Commit and push initial structure**:
   ```bash
   git add .
   git commit -m "chore: initial project setup"
   git push origin main
   ```

---

## Phase 2: Configure GitHub Settings

### Branch Protection Rules

1. Go to **Settings → Branches → Add rule**
2. Branch name: `main`
3. Enable:
   - ✅ Require pull request before merging
   - ✅ Require at least 1 approving review
   - ✅ Require status checks to pass (select `Validate Handoff`)
   - ✅ Require linear history (optional)
4. Save

### CODEOWNERS

The `.github/CODEOWNERS` file should assign reviewers based on modified paths:

```
/docs/requirements/    @your-username
/docs/architecture/   @your-username
/docs/implementation/ @your-username
/docs/review/         @your-username
/docs/testing/        @your-username
/*                    @your-username
```

Replace `@your-username` with actual GitHub usernames (or team names).

---

## Phase 3: GitHub Actions Verification

1. Wait a few seconds after push
2. Go to **Actions** tab in GitHub
3. You should see workflows:
   - `Validate Handoff` (idle until PR opened)
   - `Update Status` (triggered on push to main or PR events)
   - (Optional) `Notify Telegram`

4. **Test by creating a dummy PR**:
   ```bash
   git checkout -b pm/test
   touch docs/requirements/test.txt
   git add .
   git commit -m "test"
   git push -u origin pm/test
   gh pr create --base main --head pm/test --title "Test" --body "Testing handoff validation"
   ```
   - The `Validate Handoff` workflow should run and **fail** because `handoff.md` is missing/incomplete
   - This confirms the workflow is active

---

## Phase 4: Install and Configure gh CLI on OpenClaw Host

```bash
# Check if gh is installed
which gh || echo "gh not found"

# Install if missing (choose appropriate method):
# - Linux (deb/rpm): https://github.com/cli/cli/releases
# - macOS (brew): brew install gh

# Authenticate using a PAT with scopes: repo, workflow, read:org
gh auth login --with-token < ~/.secrets/github-token

# Verify connectivity
gh repo view your-org/agentic-dev-team-project
```

**Persist token**:

Add to shell profile (`~/.bashrc`, `~/.zshrc`):
```bash
export GH_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Or rely on `gh auth login` which stores token in `~/.config/gh/hosts.yml`.

---

## Phase 5: Test Full Manual Workflow (Dry Run)

**Step A: Product Manager handoff**

```bash
# Ensure on latest main
git checkout main
git pull origin main

# Create PM branch
git checkout -b pm/initial-requirements

# Create deliverables under docs/requirements/:
# - product-requirements.md
# - user-stories.md
# - acceptance-criteria.md
# - handoff.md (use template format)

git add docs/requirements/
git commit -m "feat(requirements): initial product requirements"
git push -u origin pm/initial-requirements

# Create PR
gh pr create \
  --base main \
  --head pm/initial-requirements \
  --title "feat(requirements): initial product requirements" \
  --body-file docs/requirements/handoff.md \
  --label "type:feature"
```

**Step B: Validate Handoff**

- Wait for GitHub Actions to run; ensure it passes.
- If it fails, check logs and fix missing sections/files.

**Step C: Approve and merge PR**

- As the same account (single‑account testing), temporarily relax branch protection to allow self‑approval:
  ```bash
  gh api -X PUT -H "Accept: application/vnd.github.luke-cage-preview+json" \
    repos/Hick3129/agentic-dev-team-project/branches/main/protection \
    --input <(cat <<'JSON'
    {
      "required_pull_request_reviews": { "required_approving_review_count": 0 },
      "required_status_checks": { "strict": true, "contexts": ["Validate Handoff"] },
      "enforce_admins": false,
      "allow_force_pushes": false,
      "allow_deletions": false,
      "required_linear_history": true,
      "restrictions": null
    }
    JSON
    )
  ```
- Approve PR: `gh pr review 1 --approve`
- Merge PR: `gh pr merge 1 --merge --admin`
- Restore branch protection (set `required_approving_review_count` back to `1`)

**Step D: Repeat for Architect, Engineer, Tester**

Follow the same pattern:
- Architect → `docs/architecture/*`
- Engineer → `docs/implementation/*` + `frontend/` + `backend/`
- Tester → `docs/testing/*` (including `bugs/` directory)

---

## Phase 6: Actual Repository Structure (Lessons Learned)

### What We Actually Used

```
agentic-dev-team-project/
├── .github/
│   ├── CODEOWNERS
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       ├── validate-handoff.yml
│       └── update-status.yml
├── docs/
│   ├── requirements/       (PM)
│   ├── architecture/      (Architect)
│   ├── implementation/    (Engineer) - **documentation only**
│   ├── review/            (Reviewer)
│   ├── testing/           (Tester)
│   └── qa.md
├── frontend/               (Engineer source code)
├── backend/                (Engineer source code)
├── sub-agent-prompts/     (Spawn templates for each role)
├── scripts/               (optional helper scripts)
├── IMPLEMENTATION_GUIDE.md
├── GITHUB_PLAN.md
├── PROJECT.md
├── README.md
├── STATUS.md
└── HOW_TO_RUN.md
```

### Key Points

- **Source code** lives in `frontend/` and `backend/`, **not** in `docs/implementation/src`.
- `validate-handoff.yml` checks:
  - `docs/[role]/handoff.md` exists and has required sections
  - For Engineer: checks `frontend/src/` and `backend/src/` contain source files, and `docs/implementation/` has `README.md`, `TESTING.md`, `CHANGELOG.md`.
- Each role creates a **feature branch** with prefix (`pm/`, `arch/`, `eng/`, `test/`), pushes, and opens PR to `main`.

---

## Phase 7: Sub‑agent Task Templates

Create spawn prompts for each role. These are stored in `sub-agent-prompts/`:

- `product-manager.md`
- `architect.md`
- `engineer.md`
- `reviewer.md`
- `tester.md`

### Example usage (OpenClaw)

```bash
sessions_spawn(
  task: "$(cat sub-agent-prompts/product-manager.md | sed "s/{{project_name}}/Todo App/g")",
  label: "PM-1",
  mode: "session"
)
```

Each template instructs the agent to:
- Checkout latest `main`
- Create appropriate branch
- Write deliverables to `docs/[role]/`
- Commit, push, and create PR
- Ensure `Validate Handoff` passes

---

## Phase 8: Update Status Automation

The `update-status.yml` workflow scans open and merged PRs to generate `STATUS.md` automatically.

**Mapping**:

| Branch prefix | Role |
|---------------|------|
| `pm/` | Product Manager |
| `arch/` | Architect |
| `eng/` | Engineer |
| `review/` | Reviewer |
| `test/` | Tester |

It runs:
- On push to `main`
- On a daily schedule (12:00 UTC)
- Manually via `workflow_dispatch`

Result: `STATUS.md` table with ✅ Completed, 🔄 In Progress, ⏳ Waiting, ❌ Blocked.

---

## Phase 9: Known Issues & Workarounds

### TypeScript Toolchain in Backend

During testing, we encountered difficulties running the TypeScript backend directly on OpenClaw host:

- `typescript` package not found despite being in `devDependencies`
- `ts-node` errors regarding module resolution and type declarations
- Import paths with `.ts` extensions causing `TS5097` when `allowImportingTsExtensions` is not enabled

**Workarounds**:

1. Use `ts-node --transpile-only` to bypass type checking
2. Or compile to JavaScript first: `npx tsc` then `node dist/index.js`
3. Alternatively, switch to plain JavaScript (remove TypeScript) for fastest iteration
4. **Recommended**: Use Docker to avoid host environment issues entirely

### Docker Deployment

See `HOW_TO_RUN.md` and accompanying `docker-compose.yml`, `backend/Dockerfile`, `frontend/Dockerfile`.

Benefits:
- Consistent environment
- No local TypeScript install hassles
- Easy to share and deploy

---

## Phase 10: Final Checklist

- [x] GitHub repository created (public recommended)
- [x] Branch protection rules configured
- [x] CODEOWNERS updated with actual usernames
- [x] Workflows (validate-handoff, update-status) in place
- [x] Validate Handoff workflow tested and working for all roles
- [x] Manual full flow completed (PM → Architect → Engineer → Tester) with all PRs merged
- [x] Sub‑agent prompt templates prepared
- [x] STATUS.md auto‑updating reliably
- [x] Docker deployment files ready
- [x] HOW_TO_RUN.md with troubleshooting
- [ ] (Optional) Telegram notifications configured
- [ ] (Future) Actual execution of test cases and update of `test-execution-report.md`

---

## Appendix: Quick Reference Commands

**Git & PR**
```bash
git checkout -b pm/initial-requirements
git add .
git commit -m "feat(requirements): ..."
git push -u origin pm/initial-requirements
gh pr create --base main --head pm/initial-requirements --title "..." --body-file docs/requirements/handoff.md
```

**Temporarily disable branch protection review requirement**
```bash
gh api -X PUT -H "Accept: application/vnd.github.luke-cage-preview+json" \
  repos/Hick3129/agentic-dev-team-project/branches/main/protection \
  --input <(echo '{"required_pull_request_reviews":{"required_approving_review_count":0}, ...}')
```

**Re‑enable**
```bash
gh api -X PUT -H "Accept: application/vnd.github.luke-cage-preview+json" \
  repos/Hick3129/agentic-dev-team-project/branches/main/protection \
  --input <(cat <<'JSON'
{
  "required_pull_request_reviews": { "required_approving_review_count": 1 },
  "required_status_checks": { "strict": true, "contexts": ["Validate Handoff"] },
  "enforce_admins": false,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "required_linear_history": true,
  "restrictions": null
}
JSON
)
```

**Check workflow runs**
```bash
gh run list --repo Hick3129/agentic-dev-team-project
gh run view <run-id> --log
```

---

**Last updated**: 2026-03-17 by Assistant (based on actual implementation)