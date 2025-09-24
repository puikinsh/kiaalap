#!/bin/bash

# Bootstrap 4 to 5 Migration Checker
# Usage: ./check-migration.sh filename.html

FILE=$1

if [ -z "$FILE" ]; then
    echo "Usage: ./check-migration.sh filename.html"
    exit 1
fi

if [ ! -f "$FILE" ]; then
    echo "Error: File '$FILE' not found!"
    exit 1
fi

echo "================================================"
echo "Bootstrap 4 → 5 Migration Check for: $FILE"
echo "================================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check patterns
check_pattern() {
    local pattern=$1
    local description=$2
    local count=$(grep -c "$pattern" "$FILE" 2>/dev/null || echo "0")

    if [ "$count" -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $description: ${GREEN}Clean${NC}"
    else
        echo -e "${RED}✗${NC} $description: ${RED}Found $count occurrence(s)${NC}"
        grep -n "$pattern" "$FILE" | head -3
        if [ "$count" -gt 3 ]; then
            echo "  ... and $((count - 3)) more"
        fi
        echo ""
    fi
}

# Check for Bootstrap 4 patterns
echo "Checking for Bootstrap 4 patterns..."
echo "-----------------------------------"

check_pattern "data-toggle" "data-toggle attributes"
check_pattern "data-target" "data-target attributes"
check_pattern "data-dismiss" "data-dismiss attributes"
check_pattern "class=\"close\"" ".close class"
check_pattern "sr-only" ".sr-only class"
check_pattern "text-left" ".text-left class"
check_pattern "text-right" ".text-right class"
check_pattern "pull-left" ".pull-left class"
check_pattern "pull-right" ".pull-right class"
check_pattern "badge badge-" ".badge classes"

# Check for margin/padding utilities
echo ""
echo "Checking utility classes..."
echo "-----------------------------------"

ML_COUNT=$(grep -Eo "\bml-[0-9]" "$FILE" 2>/dev/null | wc -l | tr -d ' ')
MR_COUNT=$(grep -Eo "\bmr-[0-9]" "$FILE" 2>/dev/null | wc -l | tr -d ' ')
PL_COUNT=$(grep -Eo "\bpl-[0-9]" "$FILE" 2>/dev/null | wc -l | tr -d ' ')
PR_COUNT=$(grep -Eo "\bpr-[0-9]" "$FILE" 2>/dev/null | wc -l | tr -d ' ')

if [ "$ML_COUNT" -eq 0 ] && [ "$MR_COUNT" -eq 0 ] && [ "$PL_COUNT" -eq 0 ] && [ "$PR_COUNT" -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Margin/Padding utilities: ${GREEN}All updated${NC}"
else
    echo -e "${RED}✗${NC} Old margin/padding utilities found:"
    [ "$ML_COUNT" -gt 0 ] && echo "  - ml-* classes: $ML_COUNT"
    [ "$MR_COUNT" -gt 0 ] && echo "  - mr-* classes: $MR_COUNT"
    [ "$PL_COUNT" -gt 0 ] && echo "  - pl-* classes: $PL_COUNT"
    [ "$PR_COUNT" -gt 0 ] && echo "  - pr-* classes: $PR_COUNT"
fi

# Check for Bootstrap 5 features
echo ""
echo "Checking for Bootstrap 5 features..."
echo "-----------------------------------"

BS5_TOGGLE=$(grep -c "data-bs-toggle" "$FILE" 2>/dev/null || echo "0")
BS5_TARGET=$(grep -c "data-bs-target" "$FILE" 2>/dev/null || echo "0")
BS5_DISMISS=$(grep -c "data-bs-dismiss" "$FILE" 2>/dev/null || echo "0")

if [ "$BS5_TOGGLE" -gt 0 ] || [ "$BS5_TARGET" -gt 0 ] || [ "$BS5_DISMISS" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Bootstrap 5 data attributes found:"
    [ "$BS5_TOGGLE" -gt 0 ] && echo "  - data-bs-toggle: $BS5_TOGGLE"
    [ "$BS5_TARGET" -gt 0 ] && echo "  - data-bs-target: $BS5_TARGET"
    [ "$BS5_DISMISS" -gt 0 ] && echo "  - data-bs-dismiss: $BS5_DISMISS"
else
    echo -e "${YELLOW}⚠${NC} No Bootstrap 5 data attributes found (might not use interactive components)"
fi

# Check for performance optimizations
echo ""
echo "Checking performance optimizations..."
echo "-----------------------------------"

LAZY_IMAGES=$(grep -c 'loading="lazy"' "$FILE" 2>/dev/null || echo "0")
DEFER_SCRIPTS=$(grep -c '<script.*defer' "$FILE" 2>/dev/null || echo "0")
PRELOAD_CSS=$(grep -c 'rel="preload".*as="style"' "$FILE" 2>/dev/null || echo "0")

if [ "$LAZY_IMAGES" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Lazy loading images: $LAZY_IMAGES found"
else
    echo -e "${YELLOW}⚠${NC} No lazy loading images found"
fi

if [ "$DEFER_SCRIPTS" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Deferred scripts: $DEFER_SCRIPTS found"
else
    echo -e "${YELLOW}⚠${NC} No deferred scripts found"
fi

if [ "$PRELOAD_CSS" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Preloaded CSS: $PRELOAD_CSS found"
else
    echo -e "${YELLOW}⚠${NC} No preloaded CSS found"
fi

# Check for accessibility
echo ""
echo "Checking accessibility features..."
echo "-----------------------------------"

SKIP_LINK=$(grep -c 'Skip to.*content' "$FILE" 2>/dev/null || echo "0")
ARIA_LABELS=$(grep -c 'aria-label' "$FILE" 2>/dev/null || echo "0")
ALT_TEXT=$(grep -c 'alt=' "$FILE" 2>/dev/null || echo "0")

if [ "$SKIP_LINK" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Skip to content link found"
else
    echo -e "${YELLOW}⚠${NC} No skip to content link"
fi

if [ "$ARIA_LABELS" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} ARIA labels: $ARIA_LABELS found"
else
    echo -e "${YELLOW}⚠${NC} No ARIA labels found"
fi

if [ "$ALT_TEXT" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Alt text on images: $ALT_TEXT found"
else
    echo -e "${YELLOW}⚠${NC} No alt text found"
fi

# Summary
echo ""
echo "================================================"
echo "Migration Summary"
echo "================================================"

ISSUES=0

# Count Bootstrap 4 issues
[ $(grep -c "data-toggle" "$FILE" 2>/dev/null || echo "0") -gt 0 ] && ((ISSUES++))
[ $(grep -c "data-target" "$FILE" 2>/dev/null || echo "0") -gt 0 ] && ((ISSUES++))
[ $(grep -c "data-dismiss" "$FILE" 2>/dev/null || echo "0") -gt 0 ] && ((ISSUES++))
[ "$ML_COUNT" -gt 0 ] || [ "$MR_COUNT" -gt 0 ] || [ "$PL_COUNT" -gt 0 ] || [ "$PR_COUNT" -gt 0 ] && ((ISSUES++))

if [ "$ISSUES" -eq 0 ]; then
    echo -e "${GREEN}✓ File appears to be fully migrated to Bootstrap 5!${NC}"
else
    echo -e "${RED}✗ Found $ISSUES issue(s) that need attention${NC}"
    echo ""
    echo "Quick fixes:"
    echo "  sed -i '' 's/data-toggle/data-bs-toggle/g' $FILE"
    echo "  sed -i '' 's/data-target/data-bs-target/g' $FILE"
    echo "  sed -i '' 's/data-dismiss/data-bs-dismiss/g' $FILE"
fi

echo ""
echo "For detailed migration instructions, see AI-AGENT-INSTRUCTIONS.md"