# Agentic Development Team

> A multi-agent system simulating a software development team, orchestrated via GitHub PRs.

## Overview

This project implements a fully automated software development pipeline using multiple AI agents, each playing a specific role:

- **Product Manager** – defines requirements
- **Architect** – designs system architecture
- **Engineer** – writes code
- **Reviewer** – reviews code quality
- **Tester** – tests and validates

All collaboration happens through **GitHub Pull Requests**. Each agent works on their own branch, creates a PR when done, and assigns the next role as reviewer. Upon approval, the PR is merged and the next agent begins their work.

## Repository Structure

```
.
├── .github/
│   ├── workflows/          # GitHub Actions
│   ├── CODEOWNERS          # Auto-assign reviewers
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── requirements/       # PM deliverables
│   ├── architecture/      # Architect deliverables
│   ├── implementation/    # Engineer deliverables
│   ├── review/           # Reviewer deliverables
│   ├── testing/          # Tester deliverables
│   └── qa.md             # Shared Q&A
├── scripts/               # Helper scripts
├── STATUS.md              # Auto-generated project status
└── README.md
```

## Workflow

1. **Product Manager** creates branch `pm/...`, writes PRD, opens PR → @Architect
2. **Architect** reviews PR, approves, merges, creates branch `arch/...`, opens PR → @Engineer
3. **Engineer** implements, opens PR → @Reviewer
4. **Reviewer** reviews, approves, merges, alerts @Tester
5. **Tester** tests, opens final PR or comments, approves → Project complete

See [GITHUB_PLAN.md](GITHUB_PLAN.md) for detailed technical specifications.

## Setup

### Prerequisites

- GitHub repository (`agentic-dev-team-project`)
- `git` and `gh` CLI installed on OpenClaw host
- GitHub PAT with `repo` and `workflow` scopes

### Quick Start

1. Clone repo and set branch protection on `main`
2. Copy `.github/workflows/` and `.github/CODEOWNERS`
3. Configure secrets (optional): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
4. Run manual test (see GITHUB_PLAN.md)
5. Start agent workflow with `sessions_spawn`

## Status

Current project status is tracked in [STATUS.md](STATUS.md).

## License

MIT
