#!/bin/bash
# update-status.sh
# Manually update STATUS.md based on current PR states.
# Requires gh CLI to be installed and authenticated.

set -e

echo "Updating STATUS.md..."

# Fetch latest
git fetch origin main

# Generate new STATUS.md
cat > STATUS.md << 'EOF'
# Project Status - Agentic Development Team

Last Updated: $(date '+%Y-%m-%d %H:%M') (Asia/Taipei)
Current Time in Taipei: $(TZ=Asia/Taipei date '+%Y-%m-%d %H:%M') (UTC+8)

| Role | Status | Deliverable | Last Updated | Notes |
|------|--------|-------------|--------------|-------|
EOF

# Define role mapping from branch prefix
get_role() {
  BRANCH=$1
  case $BRANCH in
    pm/*) echo "product-manager" ;;
    arch/*) echo "architect" ;;
    eng/*) echo "engineer" ;;
    review/*) echo "reviewer" ;;
    test/*) echo "tester" ;;
    *) echo "unknown" ;;
  esac
}

# Initialize status
declare -A STATUS
for role in product-manager architect engineer reviewer tester; do
  STATUS[$role]="⏳ Waiting"
  LAST_DATE[$role]=""
  NOTE[$role]=""
done

# Process open PRs
echo "Fetching open PRs..."
gh pr list --state open --json number,title,headRef --jq '.[]' | while read -r pr; do
  HEAD=$(echo "$pr" | jq -r '.headRef')
  ROLE=$(get_role "$HEAD")
  TITLE=$(echo "$pr" | jq -r '.title')
  NUMBER=$(echo "$pr" | jq -r '.number')
  if [ "$ROLE" != "unknown" ]; then
    STATUS[$ROLE]="🔄 In Progress"
    LAST_DATE[$ROLE]=$(date '+%Y-%m-%d')
    NOTE[$ROLE]="PR #$NUMBER: $TITLE"
  fi
done

# Process closed merged PRs (you may need to adjust lookback period)
echo "Fetching merged PRs..."
gh pr list --state closed --json number,title,headRef,mergedAt --jq '.[]' | while read -r pr; do
  HEAD=$(echo "$pr" | jq -r '.headRef')
  ROLE=$(get_role "$HEAD")
  META=$(echo "$pr" | jq -r '.mergedAt // empty')
  if [ -n "$META" ] && [ "$ROLE" != "unknown" ]; then
    STATUS[$ROLE]="✅ Completed"
    LAST_DATE[$ROLE]=$(echo "$pr" | jq -r '.mergedAt' | cut -d'T' -f1)
    # Keep note from open PR if any; otherwise clear
    if [ -z "${NOTE[$ROLE]}" ]; then
      NOTE[$ROLE]="Merged"
    fi
  fi
done

# Write table rows
for role in product-manager architect engineer reviewer tester; do
  DISPLAY_ROLE=$(echo "$role" | sed 's/-/ /' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')
  STATUS_ICON=${STATUS[$role]}
  DELIVERABLE="docs/$(echo $role | sed 's/-/ /')-deliverables/"
  LAST_UPDATED=${LAST_DATE[$role]:-}
  NOTES=${NOTE[$role]:-}
  printf "| %s | %s | %s | %s | %s |\n" "$DISPLAY_ROLE" "$STATUS_ICON" "$DELIVERABLE" "$LAST_UPDATED" "$NOTES" >> STATUS.md
done

echo "✅ STATUS.md updated."
echo "📋 Review STATUS.md and commit if needed:"
echo "   git add STATUS.md && git commit -m 'chore: update status' && git push"
