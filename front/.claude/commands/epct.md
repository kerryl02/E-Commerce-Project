---
description: "Implement features following Explore → Plan → Code → Test workflow"
argument-hint: "[feature description]"
---

# EPCT Workflow: Structured Feature Implementation

You will implement the requested feature: **$ARGUMENTS**

Follow the four-phase EPCT workflow. Each phase builds on the previous one. Complete all steps in sequence.

---

## PHASE 1: EXPLORE

**Goal**: Gather complete context before planning. Thorough exploration prevents hallucinations and ensures your plan is grounded in reality.

### Step 1.1: Research Best Practices

If the feature involves unfamiliar technologies, patterns, or libraries:
- Use the **WebSearch** tool to find official documentation, best practices, and implementation examples
- Search for "how to implement [feature] in [technology] 2025" to get current patterns
- Look for common pitfalls or security considerations

### Step 1.2: Explore the Codebase

Use the **Task** tool with `subagent_type=Explore` to understand the existing architecture:
- Find files that handle similar functionality
- Identify patterns, conventions, and architectural decisions already in place
- Locate utilities, components, or helpers you can reuse
- Understand the folder structure and naming conventions
- Map out dependencies between files

### Step 1.3: Read Project Documentation

Read these files to understand project-specific requirements:
- **CLAUDE.md** - Project conventions, architecture, and development workflow
- **package.json** - Available scripts, dependencies, and project metadata
- **Configuration files** - eslint.config, tsconfig.json, tailwind.config, etc.

### Step 1.4: Summarize Your Findings

Present a clear summary showing you understand:
- What the feature requires and how it works
- Where it fits in the existing architecture
- What files will be created or modified
- What existing code can be leveraged
- What dependencies are already available vs. what needs installing

**Why this matters**: Rushing to code without exploration leads to implementations that don't align with the project's architecture, duplicate existing functionality, or miss better patterns already in use.

---

## PHASE 2: PLAN

**Goal**: Create a validated implementation plan. Never proceed to coding without explicit user approval.

### Step 2.1: Draft Implementation Plan

Create a numbered, step-by-step plan including:
- Specific files to create or modify (with file paths)
- Dependencies to install (if any)
- Order of implementation (what must be done first)
- Integration points with existing code
- Expected behavior and outcomes

### Step 2.2: Identify Uncertainties

Challenge your own plan by asking yourself:
- **Multiple approaches**: Are there different valid ways to implement this? Which is best for THIS project?
- **Assumptions**: What am I assuming about requirements that wasn't explicitly stated?
- **Ambiguities**: What parts of the request are unclear or could be interpreted multiple ways?
- **Edge cases**: What unusual scenarios or error states need handling?
- **Trade-offs**: What are the pros and cons of your chosen approach?

### Step 2.3: Request User Validation

**STOP HERE. Do not proceed to coding.**

Present your plan clearly, then use the **AskUserQuestion** tool to:
- Get explicit approval of your plan
- Clarify any ambiguities you identified
- Present alternative approaches if multiple valid options exist
- Ask specific questions about implementation details you're uncertain about

Example questions:
- "I can implement this using [Approach A: pros/cons] or [Approach B: pros/cons]. Which fits your needs better?"
- "Should this feature also handle [edge case X], or just the basic scenario?"
- "The requirements don't specify [detail Y]. Should I implement it as [option 1] or [option 2]?"
- "I noticed the codebase has [pattern Z]. Should I follow that same pattern here?"

**Wait for user response before proceeding to Phase 3.**

**Why this matters**: Implementing the wrong solution wastes time. Five minutes of clarification prevents hours of rework. Users know their requirements better than any AI can infer.

---

## PHASE 3: CODE

**Goal**: Implement the complete feature following your validated plan.

### Step 3.1: Track Your Progress

Use the **TodoWrite** tool to create actionable tasks from your approved plan. Mark tasks as `in_progress` when working on them and `completed` when done. This keeps the user informed of progress.

### Step 3.2: Implement Following Project Conventions

Write code that matches the existing codebase:
- Follow the code style and patterns you observed during exploration
- Use existing utilities and components instead of recreating them
- Maintain consistent naming conventions
- Respect TypeScript types and configurations
- Follow import ordering rules from eslint.config
- Add error handling where appropriate

### Step 3.3: Execute Tool Calls Efficiently

Make tool calls in parallel when actions are independent:
- Reading multiple files simultaneously
- Running independent bash commands together
- Performing parallel searches

Execute tool calls sequentially when they have dependencies:
- Read before edit
- Install dependencies before importing them
- Create files before referencing them

### Step 3.4: Implement, Don't Just Suggest

Make actual changes to files. Use imperative tool usage:
- **Use Edit or Write** to modify code files
- **Use Bash** to install dependencies or run commands
- Implement the complete feature, not just parts of it

Avoid suggestions like "you could add..." or "consider implementing...". Make the changes.

**Why this matters**: Users expect implementation, not advice. Partial implementations create more work. Following existing patterns ensures the code integrates smoothly.

---

## PHASE 4: TEST

**Goal**: Verify your implementation using only the validation tools that exist in this project.

### Step 4.1: Identify Available Validation Commands

Read **package.json** scripts section to find what validation commands exist:
- `lint` - ESLint checks
- `build` - Production build
- `type-check` or `tsc` - TypeScript validation
- `test` - Test suite (if configured)
- `format` or `prettier` - Code formatting

### Step 4.2: Run Existing Validation Only

Execute commands that exist in package.json:
- ✅ Run `pnpm lint` if a lint script exists
- ✅ Run `pnpm build` if a build script exists
- ✅ Run `pnpm type-check` if it exists
- ✅ Run `pnpm test` if tests are configured

Do NOT:
- ❌ Create new test files unless specifically asked
- ❌ Run commands that don't exist in package.json
- ❌ Assume testing infrastructure exists if you haven't verified it
- ❌ Skip validation just because test infrastructure is minimal

### Step 4.3: Fix Validation Failures

If any command fails:
1. Read the error output carefully
2. Identify the root cause
3. Fix the issue in the code
4. Re-run the validation
5. Repeat until all checks pass

### Step 4.4: Provide Manual Verification Checklist

Give the user a clear checklist of manual testing steps:
- **URLs to visit**: Specific routes to check (e.g., http://localhost:3000/feature-name)
- **Actions to perform**: Click buttons, fill forms, trigger behaviors
- **Expected results**: What should happen vs. what shouldn't
- **Edge cases to test**: Unusual inputs, error states, loading states
- **Visual verification**: Layout, responsiveness, accessibility

**Why this matters**: Automated checks catch syntax and type errors. Manual testing catches logic bugs, UX issues, and integration problems. Only run tests that actually exist—hallucinating test commands wastes time and creates confusion.

---

## Summary

This workflow ensures high-quality implementations:

1. **EXPLORE** - Understand before acting (prevents hallucinations)
2. **PLAN** - Get validation before coding (prevents wasted effort)
3. **CODE** - Implement completely and correctly (delivers value)
4. **TEST** - Verify with available tools (ensures quality)

Now begin Phase 1: Explore the feature request and codebase.
