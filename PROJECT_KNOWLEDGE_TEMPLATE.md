# PROJECT_KNOWLEDGE_TEMPLATE.md

> **Instructions for Workers**: Copy this template to the target repository root as `PROJECT_KNOWLEDGE.md` and fill in ALL sections. Do not leave any placeholders, TODOs, or empty sections.

---

# {Project Name} - Knowledge Base Document

## Quick Reference

| Property | Value |
|----------|-------|
| **Repository** | https://github.com/Mnehmos/{repo-name} |
| **Primary Language** | {TypeScript / Python / Rust / HTML/CSS / Markdown} |
| **Project Type** | {MCP Server / Application / Game / Research / Framework / Website} |
| **Status** | {Active / Maintained / Experimental / Archived} |
| **Last Updated** | {YYYY-MM-DD} |

## Overview

{Write 2-3 sentences describing what this project does. Be specific about the problem it solves and who would use it. Do not use vague language like "provides functionality" - state exactly what it does.}

## Architecture

### System Design

{Describe the high-level architecture. Include:
- What pattern is used (MCP server, CLI, web app, etc.)
- How the main components interact
- Any external services or APIs it connects to}

### Key Components

| Component | Purpose | Location |
|-----------|---------|----------|
| {Main Entry} | {What it does} | `{src/index.ts}` |
| {Core Logic} | {What it does} | `{src/core/}` |
| {Config} | {What it does} | `{package.json}` |

{Add more rows as needed. Every major file or directory should have an entry.}

### Data Flow

```
{Describe the data flow using text or ASCII diagram}
{Example:}
User Input → MCP Tool Call → Handler → External API → Response → User
```

## API Surface

### Public Interfaces

{List all exposed APIs, tools, commands, or functions}

#### Tool: `{tool_name}`
- **Purpose**: {What it does}
- **Parameters**:
  - `{param1}` ({type}): {description}
  - `{param2}` ({type}): {description}
- **Returns**: {description of return value}

{Repeat for each public tool/function}

### Configuration

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `{VAR_NAME}` | {string/number/boolean} | `{default}` | {What it controls} |

{List all environment variables and configuration options}

## Usage Examples

### Basic Usage

```{language}
// {Brief description of what this example does}
{Actual working code example - not pseudocode}
```

### Advanced Patterns

```{language}
// {Description of advanced use case}
{Real code example showing more complex usage}
```

{Include at least 2 examples. These should be actual code that works, extracted or adapted from the codebase or tests.}

## Dependencies

### Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| {package-name} | {^x.y.z} | {What it's used for} |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| {package-name} | {^x.y.z} | {What it's used for} |

{Extract exact versions from package.json, Cargo.toml, requirements.txt, etc.}

## Integration Points

### Works With

| Project | Integration Type | Description |
|---------|-----------------|-------------|
| {mnehmos.other.project} | {Dependency / Peer / Extension} | {How they work together} |

{List other Mnehmos projects this integrates with. If none, write "Standalone project - no direct Mnehmos integrations"}

### External Services

| Service | Purpose | Required |
|---------|---------|----------|
| {API Name} | {What it's used for} | {Yes/No} |

{List third-party APIs or services. If none, write "No external services required"}

## Development Guide

### Prerequisites

{List what needs to be installed before development}
- Node.js {version}
- {Other requirements}

### Setup

```bash
# Clone the repository
git clone https://github.com/Mnehmos/{repo-name}
cd {repo-name}

# Install dependencies
{npm install / cargo build / pip install -r requirements.txt}

# {Any other setup steps}
```

### Running Locally

```bash
# Development mode
{npm run dev / cargo run / python main.py}

# Production build
{npm run build / cargo build --release}
```

### Testing

```bash
# Run tests
{npm test / cargo test / pytest}

# Run specific tests
{npm test -- --grep "pattern"}
```

### Building

```bash
# Build for production
{npm run build}

# Output location
{dist/ or build/ or target/release/}
```

## Maintenance Notes

### Known Issues

{List current limitations, bugs, or areas needing improvement}
1. {Issue 1 - be specific}
2. {Issue 2}

{If no known issues, write "No known issues at this time"}

### Future Considerations

{List planned improvements or technical debt}
1. {Consideration 1}
2. {Consideration 2}

{If none, write "No planned changes at this time"}

### Code Quality

| Metric | Status |
|--------|--------|
| Tests | {Yes with X% coverage / Partial / None} |
| Linting | {ESLint / Clippy / Flake8 / None} |
| Type Safety | {TypeScript strict / Type hints / None} |
| Documentation | {JSDoc / Rustdoc / Docstrings / README only} |

---

## Appendix: File Structure

```
{repo-name}/
├── src/
│   ├── index.ts          # {description}
│   └── ...
├── package.json          # {description}
├── README.md             # {description}
└── PROJECT_KNOWLEDGE.md  # This document
```

{Show the actual file structure with brief descriptions}

---

*Generated by Project Review Orchestrator | {YYYY-MM-DD}*
*Source: https://github.com/Mnehmos/{repo-name}*
