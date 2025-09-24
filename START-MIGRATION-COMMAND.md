# 🚀 Quick Start Commands for Claude Code Migration Agents

## For New Claude Code Instance - Copy & Paste This:

```
Please help migrate HTML files from Bootstrap 4 to Bootstrap 5 for the Kiaalap project.

1. First, read these files in order:
   - Read AI-AGENT-INSTRUCTIONS.md
   - Read MIGRATION-PLAN.md
   - Read dashboard-final.html (this is your reference template)

2. Find your assigned agent number (e.g., Agent 3) in MIGRATION-PLAN.md

3. Start migrating the files assigned to your agent number

4. Follow the Bootstrap 5 migration checklist in AI-AGENT-INSTRUCTIONS.md

5. Update MIGRATION-PLAN.md status from PENDING to IN PROGRESS when starting, and to COMPLETED when done

Important: Use dashboard-final.html as your reference for structure, navigation, and performance optimizations.
```

---

## 🎯 Specific Agent Commands

### For Dashboard Migration (Agent 1):
```
I need you to migrate the main dashboard files (index.html, index-1.html, index-2.html) from Bootstrap 4 to Bootstrap 5.

Read AI-AGENT-INSTRUCTIONS.md for the migration guide, check MIGRATION-PLAN.md for your files (Agent 1), and use dashboard-final.html as reference. Update the status in MIGRATION-PLAN.md as you progress.
```

### For Student Module (Agent 3):
```
Please migrate the student management module files from Bootstrap 4 to Bootstrap 5.

Your files (Agent 3): all-students.html, add-student.html, edit-student.html, student-profile.html

Read AI-AGENT-INSTRUCTIONS.md first, use dashboard-final.html as template reference, and update MIGRATION-PLAN.md status as you complete each file.
```

### For Professor Module (Agent 4):
```
Please migrate the professor management module files from Bootstrap 4 to Bootstrap 5.

Your files (Agent 4): all-professors.html, add-professor.html, edit-professor.html, professor-profile.html

Read AI-AGENT-INSTRUCTIONS.md first, use dashboard-final.html as template reference, and update MIGRATION-PLAN.md status as you complete each file.
```

### For Authentication Pages (Agent 13):
```
Please migrate the authentication pages from Bootstrap 4 to Bootstrap 5.

Your files (Agent 13): login.html, register.html, lock.html, password-recovery.html

These are HIGH priority. Read AI-AGENT-INSTRUCTIONS.md, use dashboard-final.html for header/structure reference, and update MIGRATION-PLAN.md as you progress.
```

### For UI Components (Agent 9):
```
Please migrate the UI component pages from Bootstrap 4 to Bootstrap 5.

Your files (Agent 9): buttons.html, alerts.html, modals.html, tabs.html, accordion.html, notifications.html

Read AI-AGENT-INSTRUCTIONS.md for the component conversion guide, reference dashboard-final.html for structure, and update MIGRATION-PLAN.md status.
```

---

## 📋 Generic Template Command

```
I need help with the Kiaalap Bootstrap 5 migration project.

Assignment: Agent [NUMBER]
Module: [MODULE NAME]
Priority: [HIGH/MEDIUM/LOW]

Please:
1. Read AI-AGENT-INSTRUCTIONS.md for migration guidelines
2. Check MIGRATION-PLAN.md for your specific file assignments
3. Use dashboard-final.html as your reference template
4. Migrate each file following the Bootstrap 5 checklist
5. Update status in MIGRATION-PLAN.md (PENDING → IN PROGRESS → COMPLETED)

Start with the highest priority files first.
```

---

## 🔄 Progress Check Command

```
Please check the migration progress:
1. Read MIGRATION-PLAN.md
2. Count how many files are COMPLETED vs PENDING
3. Identify which agents are currently working (IN PROGRESS status)
4. Report the overall completion percentage
```

---

## ✅ Validation Command

```
Please validate the migrated file [filename.html]:
1. Check for any remaining Bootstrap 4 patterns (data-toggle, ml-*, mr-*, etc.)
2. Verify Bootstrap 5 attributes are present (data-bs-toggle, ms-*, me-*)
3. Check performance optimizations (lazy loading, defer scripts)
4. Ensure it follows the structure of dashboard-final.html
5. Report any issues found
```

---

## 🚦 Quick Start for Team Lead

If you're coordinating multiple Claude instances:

```
We're migrating the Kiaalap project from Bootstrap 4 to Bootstrap 5.

Available documentation:
- AI-AGENT-INSTRUCTIONS.md (how to migrate)
- MIGRATION-PLAN.md (file assignments and progress)
- dashboard-final.html (reference template)
- MIGRATION-HELPERS.md (useful scripts and patterns)

Please choose an agent number (1-15) from MIGRATION-PLAN.md that shows PENDING files, and begin migration. Focus on HIGH priority files first.

Update MIGRATION-PLAN.md as you work so other agents know what's in progress.
```

---

## 💡 Tips for Working with Multiple Agents

1. **Avoid Conflicts**: Each agent should work on different files
2. **Update Status**: Always mark files as IN PROGRESS when starting
3. **Communicate Issues**: Add notes in MIGRATION-PLAN.md if you encounter problems
4. **Follow Standards**: Stick to the patterns in dashboard-final.html
5. **Test Your Work**: Validate each file before marking COMPLETED

---

## 🎯 Single File Migration Command

For migrating a specific file:

```
Please migrate [filename.html] from Bootstrap 4 to Bootstrap 5:

1. Read the current file
2. Follow the checklist in AI-AGENT-INSTRUCTIONS.md
3. Use dashboard-final.html as structure reference
4. Apply these changes:
   - data-toggle → data-bs-toggle
   - ml-*/mr-* → ms-*/me-*
   - Add lazy loading to images
   - Add defer to scripts
   - Update sidebar to match dashboard-final.html
5. Save the migrated version
6. Update MIGRATION-PLAN.md status to COMPLETED
```

---

## 📊 Bulk Assignment Command

For assigning multiple files at once:

```
You are Agent [X]. Please migrate all files in the [MODULE] section:

Files to migrate:
- [file1.html]
- [file2.html]
- [file3.html]

Process:
1. Read AI-AGENT-INSTRUCTIONS.md once
2. Study dashboard-final.html structure
3. Migrate each file sequentially
4. Update MIGRATION-PLAN.md after each completion
5. Report when all files are done

Priority: [HIGH/MEDIUM/LOW]
Estimated time: [X hours]
```

---

## 🔍 Common Responses to Expect

When agents start working, they should:
1. Confirm they've read the instructions
2. List their assigned files
3. Update status to IN PROGRESS
4. Report completion of each file
5. Update final status to COMPLETED

Example response:
```
"I've read the migration instructions and will work on Agent 3 files:
- all-students.html (starting now)
- add-student.html (next)
- edit-student.html
- student-profile.html

Updating MIGRATION-PLAN.md status to IN PROGRESS for all-students.html..."
```

---

## Use These Commands To:
- Start new Claude Code instances on specific modules
- Assign work to different agents
- Check progress across all migrations
- Validate completed work
- Coordinate parallel efforts

Just copy and paste the appropriate command into a new Claude Code session!