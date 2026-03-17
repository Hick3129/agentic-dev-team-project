#!/bin/bash
# validate-deliverables.sh
# Local validation mirroring GitHub Actions workflow.
# Usage: ./scripts/validate-deliverables.sh <role> [deliverable-dir]

set -e

ROLE=$1
DELIVERABLE_DIR=$2

if [ -z "$ROLE" ] || [ -z "$DELIVERABLE_DIR" ]; then
  echo "Usage: $0 <role> <deliverable-dir>"
  echo "Example: $0 product-manager docs/requirements"
  exit 1
fi

# Check directory exists
if [ ! -d "$DELIVERABLE_DIR" ]; then
  echo "❌ Missing deliverable directory: $DELIVERABLE_DIR"
  exit 1
fi

# Check handoff.md exists
if [ ! -f "$DELIVERABLE_DIR/handoff.md" ]; then
  echo "❌ Missing handoff.md in $DELIVERABLE_DIR"
  exit 1
fi

# Check handoff sections
REQUIRED_SECTIONS=("📦 交付內容" "✅ 已完成工作" "🔑 關鍵決策" "🧩 開放問題" "⚠️ 注意事項與風險" "📚 參考資料連結")
echo "Checking handoff sections..."
for SECTION in "${REQUIRED_SECTIONS[@]}"; do
  if ! grep -q "$SECTION" "$DELIVERABLE_DIR/handoff.md"; then
    echo "❌ Missing section: '$SECTION' in handoff.md"
    exit 1
  fi
done
echo "✅ Handoff sections OK."

# Role-specific required files
case $ROLE in
  "product-manager")
    REQUIRED_FILES=("product-requirements.md" "user-stories.md" "acceptance-criteria.md")
    ;;
  "architect")
    REQUIRED_FILES=("technology-stack.md" "architecture.md" "database-schema.md" "api-specs.md" "technical-risks.md")
    ;;
  "engineer")
    REQUIRED_FILES=("README.md" "TESTING.md" "CHANGELOG.md")
    if [ -z "$(find "$DELIVERABLE_DIR/src" -type f \( -name '*.js' -o -name '*.py' -o -name '*.ts' \) 2>/dev/null | head -1)" ]; then
      echo "❌ No source code files found in src/ directory"
      exit 1
    fi
    ;;
  "reviewer")
    REQUIRED_FILES=("review-report.md" "approval-status.txt")
    ;;
  "tester")
    REQUIRED_FILES=("test-cases.md" "test-execution-report.md" "sign-off.md")
    if [ ! -d "$DELIVERABLE_DIR/bugs" ]; then
      echo "❌ Missing bugs/ directory"
      exit 1
    fi
    ;;
  *)
    echo "Unknown role: $ROLE"
    exit 1
    ;;
esac

echo "Checking required files for role: $ROLE"
for FILE in "${REQUIRED_FILES[@]}"; do
  if [ ! -e "$DELIVERABLE_DIR/$FILE" ]; then
    echo "❌ Missing required file: $DELIVERABLE_DIR/$FILE"
    exit 1
  fi
done
echo "✅ All required deliverables present."

echo ""
echo "✅ $ROLE handoff is complete and valid."
