#!/bin/bash

echo "🧹 Final Branch Cleanup - Removing Problematic Branches"
echo "======================================================"

# Branches that have been successfully integrated or are too conflicted to merge
branches_to_delete=(
    "origin/LLarzMasterD-patch-1"
    "origin/cursor/enhance-service-and-pricebook-presentation-5d07"
    "origin/cursor/fix-banner-and-button-layout-issues-e035"
    "origin/cursor/fix-burger-bar-dropdown-4e4c"
    "origin/cursor/fix-contact-form-for-seo-tracking-2d8e"
    "origin/cursor/fix-website-issues-and-update-contact-form-e08e"
    "origin/cursor/generate-sunset-glow-funding-dossier-5b2a"
    "origin/cursor/optimize-seo-for-local-and-ai-chatbot-discoverability-0604"
    "origin/cursor/remove-hidden-burger-behind-quote-button-7cdf"
    "origin/cursor/research-christmas-light-website-design-and-inspiration-8dab"
    "origin/cursor/sunsetglow-launch-roadmap-to-first-customer-18e2"
    "origin/cursor/sunsetglow-launch-roadmap-to-first-customer-f670"
    "origin/cursor/website-overhaul-and-backend-integration-fb8c"
    "origin/troubleshooting-website-changes-no-ntl-68ec58d091eef3c0de4a32e0"
)

echo "📋 Branches to delete:"
for branch in "${branches_to_delete[@]}"; do
    echo "  🗑️  $branch"
done

echo ""
echo "⚠️  WARNING: These branches have complex merge conflicts and cannot be easily merged."
echo "   Valuable changes have been extracted and applied to main where possible."
echo ""

read -p "Continue with deletion? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deletion cancelled"
    exit 1
fi

echo ""
echo "🚀 Proceeding with deletion..."

deleted_count=0
failed_count=0

for branch in "${branches_to_delete[@]}"; do
    echo "Deleting $branch..."
    if git push origin --delete "${branch#origin/}" 2>/dev/null; then
        echo "  ✅ Successfully deleted $branch"
        ((deleted_count++))
    else
        echo "  ❌ Failed to delete $branch (may not exist or already deleted)"
        ((failed_count++))
    fi
done

echo ""
echo "📊 Final Cleanup Summary:"
echo "  - Successfully deleted: $deleted_count branches"
echo "  - Failed to delete: $failed_count branches"
echo "  - Remaining branches: $(git branch -r | wc -l)"

echo ""
echo "✅ Branch cleanup completed!"
echo "💡 Your repository is now much cleaner and easier to manage."