# CreatorFlow - TikTok Shop Fulfillment Automation Platform

> **📋 Memory System**: This CLAUDE.md is streamlined. Most detailed information is stored in memory files accessible via `/memory` command. Use memory system for comprehensive project details.

## Quick Start & Core Operations

### Essential Commands (ALWAYS run after code changes)

```bash
bun run type-check      # MANDATORY after code changes
bun run lint           # Check code quality
bun run test          # Run unit tests
```

### Git Safety Protocol (MANDATORY)

```bash
bun git:safe-start    # Check before starting new work
bun git:wip "desc"    # Save work in progress
bun git:done "msg"    # Complete and push work
```

### Core Development Flow

```bash
bun run dev           # Start development server
bun run generate-types # Update Supabase types after DB changes
bun run test:e2e      # End-to-end tests
```

## Memory System Access

All comprehensive project information is stored in memory files. Access via:

- `/memory` - List all memory files
- **tech_stack** - Complete technology stack details
- **code_style_conventions** - Full coding standards and practices
- **project_structure** - Detailed project organization
- **git_workflow** - Complete git workflow and commands
- **suggested_commands** - All available development commands
- **task_completion_checklist** - Quality gates and checklists
- **project_overview** - Business context and goals
- **documentation_standards** - Documentation creation and management standards

## 🤖 AI Agent Guidelines (CRITICAL)

### **Documentation Standards (MANDATORY)**

1. **NEVER** create documentation files in project root
2. **NEVER** claim implementation is "COMPLETE" without user validation
3. **ALWAYS** use `docs/development/[initiative]/[category]/` structure
4. **ALWAYS** use P###/S###/I###-DRAFT/R###-DRAFT naming convention
5. **ALWAYS** include "Related Documents" section at bottom of every document

### **MoSCoW Methodology (REQUIRED)**

All feature planning MUST follow MoSCoW prioritization: Must Have → Should Have → Could Have → Won't Have

### **Frontend Assembly Documentation (SINGLE SOURCE OF TRUTH)**

- **P001-REVISED**: Use `docs/development/frontend-assembly/00-planning/P001-REVISED-organism-integration-strategy.md` as THE definitive source for all frontend assembly work
- **Organism Integration**: Leverage existing 88 sophisticated atomic organisms instead of recreating functionality
- **Non-Destructive Enhancement**: Preserve existing layout, auth, themes, localization infrastructure
- **Documentation Consolidation**: DO NOT create scattered implementation docs - reference P001-REVISED

### **CreatorFlow Specialization**

- **TikTok Shop Integration**: Test webhook handling and API rate limits
- **Order Processing**: Handle high-volume scenarios with proper error handling
- **Security**: Implement proper webhook signature verification
- **UI**: Use shadcn/ui components with accessibility compliance
- **Atomic Design**: Leverage sophisticated organisms from `src/components/atomic/organisms/` rather than building simple implementations

### **Agent Workflow**

1. Create `DRAFT_` files in proper `docs/` location
2. Update drafts during implementation
3. **Wait for user validation** before removing `DRAFT_` prefix

---

> **📋 Complete Details**: See memory files for comprehensive guidelines, standards, and project information.
