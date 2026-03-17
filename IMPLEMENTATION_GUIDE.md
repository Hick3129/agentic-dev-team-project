# Implementation Guide – Agentic Development Team on GitHub

This guide walks through setting up the multi-agent collaboration system using GitHub as the central platform.

---

## Phase 1: GitHub Repository Setup

1. **Create a new repository** on GitHub:
   - Name: `agentic-dev-team-project`
   - Visibility: Private (recommended)
   - Initialize: √ Add README, √ Add .gitignore (Node), √ Choose license (MIT)

2. **Clone locally**:
   ```bash
   git clone git@github.com:your-org/agentic-dev-team-project.git
   cd agentic-dev-team-project
   ```

3. **Create directory structure**:
   ```bash
   mkdir -p .github/workflows docs/{requirements,architecture,implementation,review,testing} scripts
   ```

4. **Copy files from this repository**:
   - Copy all files from `/.github/`, `docs/`, `scripts/` to appropriate locations
   - Copy `GITHUB_PLAN.md` to project root
   - Copy existing `STATUS.md` and `README.md` (already in place)

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

The `.github/CODEOWNERS` file is already in place. Ensure the usernames match actual GitHub accounts:
- Replace `@Product-Manager` with real username or team name
- Do the same for other roles

### Secrets (Optional Telegram Notifications)

1. Create a Telegram bot via @BotFather, get token
2. Get your chat ID (or group ID)
3. Go to **Settings → Secrets and variables → Actions → New repository secret**
4. Add:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

---

## Phase 3: GitHub Actions Verification

1. Wait a few seconds after push
2. Go to **Actions** tab in GitHub
3. You should see workflows:
   - `Validate Handoff` (will be idle until a PR is opened)
   - `Update Status` (triggered on PR events)
   - `Notify Telegram` (if configured)

4. Test by creating a **dummy PR**:
   ```bash
   git checkout -b pm/test
   touch docs/requirements/test.txt
   git add .
   git commit -m "test"
   git push -u origin pm/test
   gh pr create --base main --head pm/test --title "Test" --body "Testing handoff validation"
   ```
   - The `Validate Handoff` workflow should run and **fail** because handoff.md is missing/incomplete
   - This confirms the workflow is active

---

## Phase 4: Install and Configure gh CLI on OpenClaw Host

```bash
# Check if gh is installed
which gh || echo "gh not found"

# If not installed, install it:
# macOS (brew):
brew install gh
# Linux (apt):
sudo apt update && sudo apt install gh
# Or download from https://cli.github.com/

# Authenticate with GitHub using a PAT with repo and workflow scopes:
gh auth login --with-token < ~/.secrets/github-token

# Verify
gh repo view your-org/agentic-dev-team-project
```

**Persist token**:

Add to `~/.bashrc` or `~/.profile`:
```bash
export GH_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Or use `gh auth login` which stores token in `~/.config/gh/hosts.yml`.

---

## Phase 5: Test Full Manual Workflow (Dry Run)

**Step A: Product Manager handoff**

```bash
# Ensure on latest main
git checkout main
git pull origin main

# Create PM branch
git checkout -b pm/initial-requirements

# Create deliverables (use create-handoff.sh script for template)
./scripts/create-handoff.sh product-manager

# Fill in the actual content for:
# - docs/requirements/product-requirements.md
# - docs/requirements/user-stories.md
# - docs/requirements/acceptance-criteria.md

git add docs/requirements/
git commit -m "feat(requirements): initial product requirements"
git push -u origin pm/initial-requirements

# Create PR
gh pr create \
  --base main \
  --head pm/initial-requirements \
  --title "feat(requirements): initial product requirements" \
  --body-file docs/requirements/handoff.md \
  --reviewer "@Architect-GitHub-Username" \
  --label "type:feature"
```

**Step B: Architect review and merge**

- As Architect (or via your GitHub account), review the PR
- Approve, then merge (use Squash and merge)
- Delete branch

**Step C: Check STATUS.md updates**

- After merge, the `Update Status` workflow should run and update `STATUS.md`
- Verify that `STATUS.md` shows Product Manager status as "✅ Completed"
- Architect status changes to "🔄 In Progress" if they have an open PR; else "⏳ Waiting"

---

## Phase 6: Prepare Sub-agent Task Templates

For each role, create a prompt template that can be passed to `sessions_spawn`. These should be stored in the agent's memory or in `docs/` for reference.

Example template for Product Manager agent:

```
Task: Product Manager – Generate initial requirements for the project.

Instructions:
1. Pull latest main from GitHub.
2. Create branch: pm/initial-requirements
3. Create the following files under docs/requirements/:
   - product-requirements.md
   - user-stories.md
   - acceptance-criteria.md
   - handoff.md (use the template and fill in all sections)
4. Commit and push.
5. Create a PR to main with:
   - Title: "feat(requirements): initial product requirements"
   - Body: content of handoff.md
   - Assign reviewer: @Architect (replace with actual GitHub username)
6. Return the PR URL.
```

Store similar templates for Architect, Engineer, Reviewer, Tester in `docs/` or within the agent's system prompt.

---

## Phase 7: Run the Full Agent Workflow

From the main OpenClaw session:

```bash
# Spawn Product Manager agent
sessions_spawn(
  task: "<PM template>",
  label: "PM-1"
)

# Wait for PR to be created and merged (or watch STATUS.md)
# Then spawn Architect agent, etc.
```

You can monitor progress:
- Check GitHub PRs
- Check `STATUS.md`
- Check Telegram notifications (if enabled)

---

## Troubleshooting

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| `Validate Handoff` fails with "unknown role" | Branch name doesn't match `pm/*`, `arch/*`, etc. | Rename branch accordingly |
| `gh` command not found in sub-agent | `gh` not installed or not in PATH | Install `gh` on host; ensure sub-agent inherits PATH |
| PR template not applied | Template file missing or misnamed | Place `PULL_REQUEST_TEMPLATE.md` in `.github/` |
| GitHub Actions not triggering | Branch protection missing required checks? | Check Actions tab for errors; verify `on:` paths |
| STATUS.md not updating | Workflow lacks write permission | Ensure `permissions: contents: write` in workflow |
| Telegram notifications not sent | Secrets missing or incorrect | Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` |

---

## Checklist Before Starting

- [ ] GitHub repo created and cloned
- [ ] Directory structure in place
- [ ] All files from this plan copied
- [ ] Branch protection rule set on `main`
- [ ] CODEOWNERS usernames updated
- [ ] GitHub Actions workflows present in `.github/workflows/`
- [ ] (Optional) Telegram secrets configured
- [ ] `gh` CLI installed and authenticated on OpenClaw host
- [ ] Manual dry run performed (PM → Architect PR)
- [ ] Sub-agent task templates prepared
- [ ] STATUS.md initialized

---

**All planning documents are saved in the project repository for future reference.**

Ready to implement? Start with Phase 1.
