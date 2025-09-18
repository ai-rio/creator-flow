---
name: base-agent-template
description: Base template with mandatory todo enforcement for all CreatorFlow agents
model: sonnet
tools: TodoWrite, Read, Write, Bash, Grep, Glob
---

# Base Agent Template with Todo Enforcement

**MANDATORY TODO REQUIREMENTS**: All agents MUST follow these todo patterns without exception.

## Todo Usage Rules (CRITICAL)

### When to Create Todos

- **Complex tasks** requiring 3+ distinct operations
- **Multi-step workflows** (authentication, API integration, database operations)
- **User-provided task lists** (comma-separated, numbered items)
- **Non-trivial operations** that benefit from progress tracking
- **Explicit requests** when users ask for todo organization

### Todo Lifecycle Management

1. **Create todos immediately** when starting complex tasks
2. **Mark exactly ONE task as in_progress** when beginning work
3. **Complete tasks immediately** when finished (no batching)
4. **Use proper formats**: Both `content` and `activeForm` fields required
5. **Remove completed lists** when all tasks are done

### Required Todo Patterns

```typescript
// MANDATORY: Use this exact pattern
TodoWrite({
  todos: [
    {
      content: 'Implement authentication system', // Imperative form
      status: 'in_progress',
      activeForm: 'Implementing authentication system', // Present continuous
    },
    {
      content: 'Set up database schema', // Imperative form
      status: 'pending',
      activeForm: 'Setting up database schema', // Present continuous
    },
  ],
});
```

### Quality Gates

- ✅ Exactly ONE task `in_progress` at any time
- ✅ Immediate completion marking when task finishes
- ✅ Both `content` and `activeForm` fields present
- ✅ Proper state transitions: pending → in_progress → completed
- ✅ Clear, actionable task descriptions

## Implementation Enforcement

### Agent Prompt Addition

Every agent MUST include this in their system context:

```
MANDATORY TODO USAGE: Use TodoWrite tool for any task requiring 3+ steps or having complexity.
Follow exact patterns: pending → in_progress → completed. Only ONE task in_progress at a time.
Complete tasks immediately when finished. Use both content/activeForm fields correctly.
```

### Tool Requirements

All agents MUST have:

- `TodoWrite` in tools list
- `TodoWrite` in allowedTools for automatic usage

### Validation Hooks

Agents should include reminders:

```
hooks:
  agentSpawn: "echo 'Todo tracking enabled - use TodoWrite for multi-step tasks'"
  userPromptSubmit: "echo 'Remember: Use TodoWrite for complex tasks (3+ steps)'"
```

## Detection Triggers

Agents MUST create todos when detecting:

- Multiple tasks in user request
- Keywords: "implement", "build", "create", "setup", "configure"
- Complex workflows: auth + database + API + testing
- Multi-system integrations
- Performance optimization tasks
- Security implementation tasks

## Examples

### ✅ Correct Usage

```typescript
// User: "Build authentication with database and API integration"
TodoWrite({
  todos: [
    { content: 'Design authentication schema', status: 'in_progress', activeForm: 'Designing authentication schema' },
    { content: 'Implement database models', status: 'pending', activeForm: 'Implementing database models' },
    { content: 'Create API endpoints', status: 'pending', activeForm: 'Creating API endpoints' },
    { content: 'Add integration tests', status: 'pending', activeForm: 'Adding integration tests' },
  ],
});
```

### ❌ Incorrect Usage

```typescript
// Missing todos for complex task
// Multiple tasks in_progress
// No activeForm fields
// Batched completion marking
```

---

**This template MUST be referenced by all specialist agents in CreatorFlow's agent system.**
