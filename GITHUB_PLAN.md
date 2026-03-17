# Agentic Development Team - GitHub Implementation Plan

**Created**: 2026-03-17 (Asia/Taipei)
**Status**: Planning Complete, Ready for Implementation
**Decision**: Use GitHub as the central collaboration platform with PR-based handoffs

---

## 📋 Table of Contents

1. [Core Concept](#core-concept)
2. [Role Responsibilities](#role-responsibilities)
3. [Repository Structure](#repository-structure)
4. [Branching Strategy](#branching-strategy)
5. [Pull Request Workflow](#pull-request-workflow)
6. [Automation Setup](#automation-setup)
7. [OpenClaw Sub-agent Configuration](#openclaw-sub-agent-configuration)
8. [Step-by-Step Setup Guide](#step-by-step-setup-guide)
9. [Risks and Mitigations](#risks-and-mitigations)
10. [Next Steps](#next-steps)

---

## Core Concept

**"Five-person relay, passing the baton via GitHub PRs"**

- Each agent role works on their own branch
- When done, they push and create a Pull Request (PR) to `main`
- The PR description serves as the handoff document
- The next role is assigned as reviewer; they approve, merge, and start their own branch
- GitHub notifications (plus optional Telegram) provide real-time alerts

---

## Role Responsibilities

| Role | Input | Output | Deliverables | Next Role |
|------|-------|--------|--------------|-----------|
| **Product Manager** | User needs (from human) | Structured requirements | `product-requirements.md`, `user-stories.md`, `acceptance-criteria.md`, `handoff.md` | Architect |
| **Architect** | PM's PRD | System design | `technology-stack.md`, `architecture.md` (with mermaid), `database-schema.md`, `api-specs.md`, `technical-risks.md`, `handoff.md` | Engineer |
| **Engineer** | Architect's design | Working code | `src/`, `tests/`, `README.md`, `TESTING.md`, `CHANGELOG.md`, `handoff.md` | Reviewer |
| **Reviewer** | Engineer's code | Review report | `review-report.md`, `approval-status.txt`, `handoff.md` | Tester (if approved) |
| **Tester** | Merged code + spec | Test results | `test-cases.md`, `test-execution-report.md`, `bugs/` (directory), `sign-off.md`, `handoff.md` | Product Manager (completion) |

---

## Repository Structure

```
agentic-dev-team-project/
├── .github/
│   ├── workflows/
│   │   ├── validate-handoff.yml      # Validate handoff format for each role
│   │   ├── update-status.yml        # Auto-update STATUS.md
│   │   └── notify-telegram.yml       # Optional: send TG alerts on PR events
│   ├── ISSUE_TEMPLATE/
│   │   └── bug-report.yml
│   ├── PULL_REQUEST_TEMPLATE.md      # All PRs must fill this
│   └── CODEOWNERS                    # Auto-assign reviewers based on paths
├── docs/
│   ├── requirements/                # PM deliverables
│   ├── architecture/               # Architect deliverables
│   ├── implementation/             # Engineer deliverables
│   ├── review/                    # Reviewer deliverables
│   ├── testing/                   # Tester deliverables
│   └── qa.md                      # Shared Q&A
├── scripts/
│   ├── create-handoff.sh          # Generate handoff.md template
│   ├── validate-deliverables.sh   # Local validation (mirrors CI)
│   └── update-status.sh           # Update STATUS.md manually
├── STATUS.md                       # Project status table (auto-generated)
├── README.md
└── LICENSE
```

---

## Branching Strategy

| Branch Type | Naming Convention | Purpose | Protection |
|-------------|-------------------|---------|------------|
| `main` | Fixed | Stable, deployable code | ✅ Required PR<br>✅ Required reviews (1+)<br>✅ CI must pass<br>❌ Direct push forbidden |
| Feature | `role/short-description`<br>e.g., `pm/initial-requirements`, `eng/implement-login` | Work branches for each role | No special rules (except not protected) |
| Hotfix | `hotfix/xxx` | Emergency fixes from main | Fast-track, still PR required |

**Notes**:
- Each role creates their own branch prefix: `pm/`, `arch/`, `eng/`, `review/`, `test/`
- PR base is always `main`; head is the role's feature branch
- After merge, delete the feature branch (auto-delete setting enabled)

---

## Pull Request Workflow

### 1. PR Template (`PULL_REQUEST_TEMPLATE.md`)

```markdown
## 📦 Handoff: [From Role] → [To Role]

### 1. 交付內容 (Deliverables)
請勾選已完成的文件：

- [ ] `docs/[role]/[file1.md]`
- [ ] `docs/[role]/[file2.md]`
- [ ] 其他：_________

### 2. 已完成工作 (Completed Work)
簡述本次完成的主要任務：

### 3. 關鍵決策 (Key Decisions)
列出影響下一個角色的重要決定：

- Decision 1: ...
- Decision 2: ...

### 4. 開放問題 (Open Questions)
需要下一個角色處理或決策的具體問題：

- Question 1: ...
- Question 2: ...

### 5. 注意事項與風險 (Notes & Risks)
潛在問題、依賴、限制等：

### 6. 參考資料連結 (References)
- 主要文件: `docs/[role]/[main-doc.md]`
- 其他: _________

---

**Review Checklist** (for reviewer):
- [ ] All deliverables present
- [ ] Handoff sections completed
- [ ] No obvious typos or missing info
- [ ] Ready to start work
```

### 2. CODEOWNERS (Auto-assign Reviewers)

```
# .github/CODEOWNERS

# Branch prefixes
/pm/*    @Product-Manager
/arch/*  @Architect
/eng/*   @Engineer
/review/* @Reviewer
/test/*  @Tester

# Directory-based
/docs/requirements/    @Product-Manager
/docs/architecture/   @Architect
/docs/implementation/ @Engineer
/docs/review/         @Reviewer
/docs/testing/        @Tester
```

**Note**: Replace `@Product-Manager` etc. with actual GitHub usernames or team names.

### 3. Typical PR Lifecycle

1. **Author (Role A)**:
   - `git checkout -b pm/initial-requirements`
   - Create files, commit, push
   - `gh pr create --base main --head pm/initial-requirements --title "...", --body-file handoff.md`
   - PR auto-assigns reviewer (Role B) via CODEOWNERS

2. **Reviewer (Role B)**:
   - Receives GitHub notification (and optional Telegram)
   - Reviews files, leaves comments
   - Either "Request changes" or "Approve"

3. **Merge**:
   - After approval, click "Merge" (choose Squash or Rebase)
   - Auto-delete feature branch
   - PR closure may trigger STATUS.md update

4. **Next Role (Role B)**:
   - Sees PR merged, updates their STATUS.md entry to "🔄 In Progress"
   - Creates new branch `eng/...` based on latest `main`
   - Begins work

---

## Automation Setup

### Workflow 1: Validate Handoff (`validate-handoff.yml`)

Runs on PR targeting `main` that touches `docs/`.
- Determines role from branch name
- Checks `handoff.md` exists and contains required sections
- Verifies required deliverable files exist (role-specific)
- Fails PR if validation fails

### Workflow 2: Update STATUS.md (`update-status.yml`)

Triggers on PR open/close/reopen.
- Uses GitHub API to scan open PRs
- Generates a STATUS.md table showing current progress
- Commits back to repo

### Workflow 3: Telegram Notifications (`notify-telegram.yml`)

Optional. Triggers on PR events.
- Sends formatted message to Telegram chat
- Includes PR title, author, URL, branch
- Uses `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` secrets

---

## OpenClaw Sub-agent Configuration

### Prerequisites

1. **Install git and gh CLI** on the host running OpenClaw
2. **Create a GitHub Machine User** or use a PAT (Personal Access Token) with:
   - `repo` scope (full control of private repos)
   - `workflow` scope (if triggering Actions)
3. **Store token in OpenClaw environment**:
   ```bash
   export GH_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   # Or add to ~/.bashrc for persistence
   ```
4. **Authenticate gh** (one-time):
   ```bash
   gh auth login --with-token < ~/.secrets/github-token
   ```

### OpenClaw Config Adjustments

In `~/.openclaw/openclaw.json`:

```json
{
  "tools": {
    "profile": "coding"
  },
  "agents": {
    "defaults": {
      "tools": {
        "allow": ["exec", "process", "read", "write", "edit"]
      }
    }
  }
}
```

Ensure `exec` is allowed so sub-agents can run `git` and `gh` commands.

### Sub-agent Execution Template

For any role, the sub-agent's task will follow this pattern:

```bash
# 1. Start from latest main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b pm/initial-requirements

# 3. Generate deliverables (using write tool to create files under docs/requirements/)

# 4. Commit and push
git add docs/requirements/
git commit -m "feat(requirements): add initial product requirements"
git push -u origin pm/initial-requirements

# 5. Create PR
gh pr create \
  --base main \
  --head pm/initial-requirements \
  --title "feat(requirements): initial product requirements" \
  --body-file docs/requirements/handoff.md \
  --reviewer "@Architect" \
  --label "type:feature"

# 6. Output PR URL to main session
```

The sub-agent will be spawned via `sessions_spawn` tool, and its completion message will include the PR URL.

---

## Step-by-Step Setup Guide

### Phase 0: Preparation

1. **Create GitHub Repository**
   - Name: `agentic-dev-team-project`
   - Initialize with README, .gitignore (Node or Python), license (MIT)
   - Invite collaborators (your GitHub account)

2. **Clone Locally**
   ```bash
   git clone git@github.com:your-org/agentic-dev-team-project.git
   cd agentic-dev-team-project
   ```

3. **Create Directory Structure**
   ```bash
   mkdir -p .github/workflows docs/{requirements,architecture,implementation,review,testing} scripts
   touch README.md STATUS.md
   ```

### Phase 1: Configure GitHub Settings

1. **Branch Protection for `main`**
   - Settings → Branches → Add rule
   - Branch name: `main`
   - ✅ Require pull request before merging
   - ✅ Require at least 1 approving review
   - ✅ Require status checks to pass (select `Validate Handoff`)
   - ✅ Require linear history (optional)
   - ✅ Do not allow bypass (except admins if needed)

2. **CODEOWNERS**
   - Place `.github/CODEOWNERS` file (see above)

3. **Secrets** (if using Telegram notifications)
   - Settings → Secrets and variables → Actions → New repository secret
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

4. **Collaborators Permissions**
   - Add your own account as Admin
   - Consider creating a machine user for AGENT with Write access

### Phase 2: Add Initial Files

1. **PR Template**: `.github/PULL_REQUEST_TEMPLATE.md`
2. **Issue Template**: `.github/ISSUE_TEMPLATE/bug-report.yml`
3. **Basic README.md** (project description)
4. **LICENSE** (MIT)
5. **Initial STATUS.md** (maybe minimal, will auto-update)

### Phase 3: GitHub Workflows

Create `.github/workflows/` files:

- `validate-handoff.yml`
- `update-status.yml`
- `notify-telegram.yml` (optional)

Commit and push to `main`.

### Phase 4: OpenClaw Environment

1. Ensure `git` and `gh` are installed on host:
   ```bash
   which git
   which gh
   git --version
   gh --version
   ```

2. If `gh` not installed, install it:
   ```bash
   # Using brew (macOS/Linux)
   brew install gh
   # Or download from https://cli.github.com/
   ```

3. Authenticate `gh`:
   ```bash
   gh auth login --with-token < ~/.secrets/github-token
   ```

4. Set `GH_TOKEN` environment variable persistently (e.g., in `~/.bashrc`):
   ```bash
   export GH_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   ```

5. Verify:
   ```bash
   gh repo view your-org/agentic-dev-team-project
   ```

### Phase 5: Test with First PR (Manual Dry Run)

Before automating with sub-agents, do a manual test:

1. **As PM**, create branch and files:
   ```bash
   git checkout -b pm/test-handoff
   mkdir -p docs/requirements
   echo "# PRD" > docs/requirements/product-requirements.md
   echo "# User Stories" > docs/requirements/user-stories.md
   echo "# Acceptance Criteria" > docs/requirements/acceptance-criteria.md
   cat > docs/requirements/handoff.md << 'EOF'
   # Handoff: Product Manager → Architect

   ## 1. 交付內容
   - [x] product-requirements.md
   - [x] user-stories.md

   ## 2. 已完成工作
   - Initial draft of PRD

   ## 3. 關鍵決策
   - MVP scope defined

   ## 4. 開放問題
   - Which database?
   EOF
   git add .
   git commit -m "feat(requirements): initial test"
   git push -u origin pm/test-handoff
   ```

2. **Create PR**:
   ```bash
   gh pr create --base main --head pm/test-handoff --title "Test PM handoff" --body-file docs/requirements/handoff.md --reviewer "@your-github-username"
   ```

3. **Observe**:
   - GitHub Action `validate-handoff` should run and pass
   - Reviewer gets assigned
   - Approve and merge

4. **Check** `STATUS.md` updates automatically

If all works, we're ready to automate with sub-agents.

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Sub-agent permissions too high | Accidental repo damage | Use dedicated machine user with only `repo` write access to this single repo |
| PRs too large, hard to review | Slow process, low quality | Enforce in culture: keep PRs small, one feature per PR; break into multiple if needed |
| Git merge conflicts | Blocking workflow | Require rebasing onto `main` before merge; provide script to help |
| GitHub Actions failing intermittently | Delays | Keep validation simple; fast-fail early |
| STATUS.md out of sync | Misleading info | Treat STATUS.md as derived artifact; rely on GitHub Projects for truth |
| Agent commits with wrong identity | Traceability issues | Configure sub-agent git user per role: `git config user.name "Product Manager Agent"` |
| Missing `gh` CLI on host | Sub-agent cannot create PRs | Install `gh` and authenticate before starting agents |
| Rate limits on GitHub API | Hitting limits | Use PAT with higher limits; queue operations; cache where possible |

---

## Next Steps (Implementation Order)

1. ✅ **Create GitHub repo** and clone
2. ✅ **Set up directory structure** (docs/, .github/, scripts/)
3. ✅ **Configure branch protection** and CODEOWNERS
4. ✅ **Add initial files** (PR template, README, LICENSE)
5. ✅ **Write GitHub workflows** (validate-handoff, update-status, notify-telegram)
6. ✅ **Install and configure gh CLI** on OpenClaw host
7. ✅ **Set GH_TOKEN** in environment
8. 🔲 **Manual test** the full PR flow (one role to next)
9. 🔲 **Write sub-agent task templates** for each role (prompts to spawn)
10. 🔲 **Test sub-agent spawning** with `sessions_spawn`
11. 🔲 **Iterate** on handoff template and validation as needed

---

## Appendix: Example Sub-agent Spawn Command

Once everything is set up, to start the Product Manager agent:

```bash
# From main session (OpenClaw)
sessions_spawn(
  task: """
  1. Read latest main from GitHub: git pull origin main
  2. Create branch: pm/initial-requirements
  3. Write deliverables under docs/requirements/:
     - product-requirements.md
     - user-stories.md
     - acceptance-criteria.md
     - handoff.md (using template)
  4. Commit and push
  5. Create PR to main with title "feat(requirements): initial product requirements"
  6. Set reviewer to @Architect
  7. Return the PR URL.
  """,
  label: "PM-Agent-1"
)
```

---

**Status**: Ready for implementation pending user availability.
