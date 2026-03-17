#!/bin/bash
# create-handoff.sh
# Generate a handoff.md template for the given role.

set -e

ROLE=$1

if [ -z "$ROLE" ]; then
  echo "Usage: $0 <role>"
  echo "Available roles: product-manager, architect, engineer, reviewer, tester"
  exit 1
fi

case $ROLE in
  "product-manager")
    DIR="docs/requirements"
    FILES=("product-requirements.md" "user-stories.md" "acceptance-criteria.md")
    ;;
  "architect")
    DIR="docs/architecture"
    FILES=("technology-stack.md" "architecture.md" "database-schema.md" "api-specs.md" "technical-risks.md")
    ;;
  "engineer")
    DIR="docs/implementation"
    FILES=("README.md" "TESTING.md" "CHANGELOG.md")
    ;;
  "reviewer")
    DIR="docs/review"
    FILES=("review-report.md" "approval-status.txt")
    ;;
  "tester")
    DIR="docs/testing"
    FILES=("test-cases.md" "test-execution-report.md" "sign-off.md")
    ;;
  *)
    echo "Unknown role: $ROLE"
    exit 1
    ;;
esac

# Create directory if not exists
mkdir -p "$DIR"

# Create handoff.md
cat > "$DIR/handoff.md" << EOF
# Handoff: $ROLE → [Next Role]

Date: $(date '+%Y-%m-%d')
From: $ROLE
To: [Next Role]

## 📦 交付內容 (Deliverables)

EOF

for FILE in "${FILES[@]}"; do
  echo "- [ ] \`$DIR/$FILE\`" >> "$DIR/handoff.md"
done

cat >> "$DIR/handoff.md" << EOF

## ✅ 已完成工作

## 🔑 關鍵決策 (Key Decisions)

## 🧩 開放問題 (Open Questions)

## ⚠️ 注意事項與風險 (Notes & Risks)

## 📚 參考資料連結 (References)

---

請確認收到，並回覆是否有需要澄清的問題。
EOF

echo "✅ Created handoff template at $DIR/handoff.md"
echo "📝 Don't forget to create the deliverable files listed above."
