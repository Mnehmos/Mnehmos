# ADR-001: Project Review Orchestrator and RAG Knowledge System

## Status
**Proposed** | Date: 2025-12-30

## Context

The Mnehmos organization at https://github.com/Mnehmos contains 21+ repositories spanning:
- **MCP Servers**: arxiv, chatrpg.game, index-foundry, ooda, rpg, sight, synch, trace
- **Applications**: fan-controller, invoicer, quickey, screen.vision.webapp
- **Games**: chatrpg.game, long-hall, quest-keeper (game + website)
- **Research**: dsa-graham, lcm, prompts, right-wing-predators
- **Frameworks**: multi-agent, roo.code

**Goal**: Create a unified knowledge system that:
1. Reviews and documents each project systematically
2. Builds a RAG-powered chatbot for querying all project knowledge
3. Uses live GitHub data (not local files) for the RAG system

## Decision

### Two-Phase Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PHASE 1: PROJECT REVIEW ORCHESTRATOR                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐     ┌───────────────────────────────────────────────────┐ │
│  │ Orchestrator │────▶│ For each repo in mnehmos.*:                       │ │
│  │    Mode      │     │   1. Analyze: README, code, structure             │ │
│  └──────────────┘     │   2. Generate: PROJECT_KNOWLEDGE.md               │ │
│         │             │   3. Commit & Push to main branch                 │ │
│         │             └───────────────────────────────────────────────────┘ │
│         ▼                                                                    │
│  ┌──────────────┐     ┌───────────────────────────────────────────────────┐ │
│  │   Worker     │────▶│ Per-repo tasks:                                   │ │
│  │   Agents     │     │   - Code analysis                                 │ │
│  │  (parallel)  │     │   - Architecture extraction                       │ │
│  └──────────────┘     │   - API surface documentation                     │ │
│                       │   - Usage examples synthesis                       │ │
│                       └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼ (After all commits pushed)
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 2: RAG CHATBOT (Index Foundry)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Data Sources (ALL via GitHub API - NO local files)                   │   │
│  │                                                                       │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐       │   │
│  │  │ GitHub Raw URLs │  │ GitHub API      │  │ GitHub Search   │       │   │
│  │  │ for files       │  │ for metadata    │  │ for discovery   │       │   │
│  │  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘       │   │
│  │           │                    │                    │                │   │
│  │           └────────────────────┼────────────────────┘                │   │
│  │                                ▼                                     │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │ Per Repository Sources:                                       │   │   │
│  │  │   • PROJECT_KNOWLEDGE.md (from Phase 1)                       │   │   │
│  │  │   • README.md                                                 │   │   │
│  │  │   • Source code files (*.ts, *.py, *.rs, etc.)               │   │   │
│  │  │   • Configuration files (package.json, Cargo.toml, etc.)     │   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                       │                                      │
│                                       ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Index Foundry Pipeline                                               │   │
│  │                                                                       │   │
│  │  1. project_create → rag-server                                      │   │
│  │  2. project_add_source (URL) → for each GitHub raw file URL         │   │
│  │  3. project_build → chunk + embed                                    │   │
│  │  4. project_export → generate server code                            │   │
│  │  5. project_serve → start local server                               │   │
│  │                                                                       │   │
│  │  Final Location: F:\Github\Mnehmos\rag-server                        │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Project Review Orchestrator

### Orchestrator Contract

```yaml
orchestrator:
  role: "project-review-orchestrator"
  responsibilities:
    - Enumerate all Mnehmos repositories
    - Create review subtasks for each repo
    - Ensure parallel-safe execution (different repos = different workspaces)
    - Aggregate completion status
    - Trigger git commit/push after each review
  
  subtask_template:
    task_id: "review-{repo_name}"
    mode: "code"  # Worker mode for file creation
    workspace_path: "mnehmos.{repo_name}/"
    file_patterns: ["PROJECT_KNOWLEDGE.md"]
    acceptance_criteria:
      - PROJECT_KNOWLEDGE.md created in repo root
      - Document follows template structure
      - All sections completed
    
  parallel_safety:
    strategy: "workspace-isolated"
    reason: "Each repo is independent workspace"
```

### Review Document Template: PROJECT_KNOWLEDGE.md

```markdown
# {Project Name} - Knowledge Base Document

## Quick Reference
| Property | Value |
|----------|-------|
| Repository | https://github.com/Mnehmos/{repo} |
| Primary Language | {language} |
| Project Type | {MCP Server / Application / Game / Research / Framework} |
| Status | {Active / Maintained / Experimental / Archived} |

## Overview
{2-3 sentence description of what this project does}

## Architecture
### System Design
{High-level architecture description}

### Key Components
| Component | Purpose | Location |
|-----------|---------|----------|
| {name} | {purpose} | {path} |

### Data Flow
{How data moves through the system}

## API Surface
### Public Interfaces
{List of exposed APIs, tools, functions}

### Configuration
{Key configuration options and environment variables}

## Usage Examples
### Basic Usage
```{language}
{minimal working example}
```

### Advanced Patterns
{More complex usage scenarios}

## Dependencies
### Runtime Dependencies
{List with versions}

### Development Dependencies
{List with versions}

## Integration Points
### Works With
{Other Mnehmos projects this integrates with}

### External Services
{Third-party APIs or services used}

## Development Guide
### Setup
{How to get started developing}

### Testing
{How to run tests}

### Building
{Build commands}

## Maintenance Notes
### Known Issues
{Current limitations or bugs}

### Future Considerations
{Planned improvements or tech debt}

---
*Generated by Project Review Orchestrator | {date}*
```

### Worker Contract (Per-Repo)

```yaml
worker:
  receives:
    task_id: "review-{repo_name}"
    workspace_path: "mnehmos.{repo_name}/"
    
  actions:
    1_analyze:
      - Read README.md
      - Scan source files for structure
      - Identify primary language and framework
      - Extract API surface from code
      
    2_generate:
      - Create PROJECT_KNOWLEDGE.md using template
      - Fill all sections with analyzed data
      - Generate usage examples from real code
      
    3_commit:
      - Stage PROJECT_KNOWLEDGE.md
      - Commit with message: "docs: Add PROJECT_KNOWLEDGE.md for RAG indexing"
      - Push to main branch
      
  returns:
    type: "task-completed"
    files_changed: ["PROJECT_KNOWLEDGE.md"]
    summary: "Generated knowledge document for {repo_name}"
```

---

## Phase 2: RAG Chatbot Architecture

### GitHub URL Strategy

Since we MUST use live GitHub data (not local files), we'll use raw GitHub URLs:

```
Base URL Pattern:
https://raw.githubusercontent.com/Mnehmos/{repo}/main/{path}

Examples:
- README: https://raw.githubusercontent.com/Mnehmos/mnehmos.ooda.mcp/main/README.md
- Knowledge Doc: https://raw.githubusercontent.com/Mnehmos/mnehmos.ooda.mcp/main/PROJECT_KNOWLEDGE.md
- Source: https://raw.githubusercontent.com/Mnehmos/mnehmos.ooda.mcp/main/src/index.ts
```

### Repository Discovery

```yaml
github_discovery:
  method: "GitHub API"
  endpoint: "https://api.github.com/orgs/Mnehmos/repos"
  
  per_repo_files:
    always_include:
      - README.md
      - PROJECT_KNOWLEDGE.md  # From Phase 1
      
    language_specific:
      typescript:
        - package.json
        - src/**/*.ts
        - tsconfig.json
      python:
        - requirements.txt
        - pyproject.toml
        - "**/*.py"
      rust:
        - Cargo.toml
        - src/**/*.rs
```

### Index Foundry Project Specification

```yaml
project:
  id: "mnehmos-knowledge-base"
  name: "Mnehmos Project Knowledge Base"
  location: "F:/Github/Mnehmos/rag-server"
  
  embedding:
    provider: "openai"
    model_name: "text-embedding-3-small"
    api_key_env: "OPENAI_API_KEY"
    
  chunking:
    strategy: "hierarchical"  # Preserve markdown structure
    max_chars: 1500
    overlap_chars: 150
    create_parent_chunks: true  # For heading hierarchy
    
  sources:
    # Will be added programmatically via project_add_source
    # One URL per significant file across all repos
    
  server:
    port: 8080
    include_http: true
    railway_config: false  # Local deployment initially
```

### Source Addition Strategy

```python
# Pseudocode for source addition
repos = [
    "mnehmos.arxiv.mcp",
    "mnehmos.chatrpg.game", 
    "mnehmos.index-foundry.mcp",
    # ... all repos
]

for repo in repos:
    base_url = f"https://raw.githubusercontent.com/Mnehmos/{repo}/main"
    
    # Always add these
    project_add_source(url=f"{base_url}/README.md", tags=[repo, "readme"])
    project_add_source(url=f"{base_url}/PROJECT_KNOWLEDGE.md", tags=[repo, "knowledge"])
    
    # Add based on project type
    if is_typescript(repo):
        project_add_source(url=f"{base_url}/package.json", tags=[repo, "config"])
        project_add_source(url=f"{base_url}/src/index.ts", tags=[repo, "source"])
    elif is_rust(repo):
        project_add_source(url=f"{base_url}/Cargo.toml", tags=[repo, "config"])
        project_add_source(url=f"{base_url}/src/main.rs", tags=[repo, "source"])
    # etc.
```

---

## Execution Plan

### Phase 1 Execution Order

```yaml
phase_1:
  name: "Project Review Generation"
  
  step_1:
    action: "Enumerate repositories"
    output: "List of 21 mnehmos.* repos"
    
  step_2:
    action: "Create parallel review subtasks"
    parallelism: "Safe - each repo is isolated workspace"
    subtasks: 21
    
  step_3:
    action: "Execute reviews"
    per_subtask:
      - Analyze repo
      - Generate PROJECT_KNOWLEDGE.md
      - Git add, commit, push
      
  step_4:
    action: "Verify pushes"
    check: "All PROJECT_KNOWLEDGE.md files accessible via GitHub raw URLs"
```

### Phase 2 Execution Order

```yaml
phase_2:
  name: "RAG Chatbot Build"
  prerequisite: "Phase 1 complete and all commits pushed"
  
  step_1:
    tool: "indexfoundry_project_create"
    params:
      project_id: "mnehmos-knowledge-base"
      name: "Mnehmos Project Knowledge Base"
      embedding_model:
        provider: "openai"
        model_name: "text-embedding-3-small"
      chunk_config:
        strategy: "hierarchical"
        max_chars: 1500
        
  step_2:
    tool: "indexfoundry_project_add_source"
    action: "Add all GitHub raw URLs"
    count: "~100+ sources across all repos"
    
  step_3:
    tool: "indexfoundry_project_build"
    action: "Process, chunk, embed all sources"
    
  step_4:
    tool: "indexfoundry_project_export"
    params:
      include_http: true
      server_name: "mnehmos-rag-server"
      
  step_5:
    action: "Move generated project to final location"
    from: "{index_foundry_projects}/mnehmos-knowledge-base"
    to: "F:/Github/Mnehmos/rag-server"
    
  step_6:
    tool: "indexfoundry_project_serve"
    action: "Start local server for testing"
```

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| GitHub rate limiting | API calls blocked | Use authenticated requests, batch calls |
| Private repos inaccessible | Missing data | Ensure all repos are public or use token |
| Large files timeout | Incomplete indexing | Skip files > 100KB, use core files only |
| Git push conflicts | Failed commits | Ensure clean working state before push |
| Missing OPENAI_API_KEY | Build fails | Validate env var before Phase 2 |

---

## Alternatives Considered

### Alternative 1: Use Local Files for RAG
**Rejected**: User explicitly required live GitHub data to ensure consistency with deployed repos.

### Alternative 2: Use GitHub API for File Content
**Considered**: Would work but raw URLs are simpler for Index Foundry's URL source type.

### Alternative 3: Clone Repos Fresh
**Rejected**: Still uses local files, violates the "no local folders" constraint.

---

## Success Criteria

1. ✅ All 21 repos have PROJECT_KNOWLEDGE.md committed and pushed
2. ✅ RAG server project exists at F:\Github\Mnehmos\rag-server
3. ✅ RAG sources use exclusively GitHub raw URLs
4. ✅ Query test: "What MCP servers does Mnehmos have?" returns accurate results
5. ✅ Query test: "How do I use the OODA MCP server?" returns usage examples

---

## Appendix: Repository Inventory

| Repository | Type | Primary Language |
|------------|------|------------------|
| mnehmos.arxiv.mcp | MCP Server | TypeScript |
| mnehmos.chatrpg.game | MCP Server/Game | TypeScript |
| mnehmos.dsa-graham.research | Research | Python |
| mnehmos.fan-controller.app | Application | Unknown |
| mnehmos.index-foundry.mcp | MCP Server | TypeScript |
| mnehmos.invoicer.app | Application | Unknown |
| mnehmos.lcm.research | Research | Python |
| mnehmos.long-hall.game | Game | Unknown |
| mnehmos.multi-agent.framework | Framework | Markdown/Config |
| mnehmos.ooda.mcp | MCP Server | TypeScript |
| mnehmos.prompts.research | Research | Markdown |
| mnehmos.quest-keeper.game | Game | Unknown |
| mnehmos.quest-keeper.website | Website | HTML/CSS |
| mnehmos.quickey.app | Application | Unknown |
| mnehmos.right-wing-predators.research | Research | Python/HTML |
| mnehmos.roo.code | Framework | TypeScript |
| mnehmos.rpg.mcp | MCP Server | TypeScript |
| mnehmos.screen.vision.webapp | Web App | TypeScript/Next.js |
| mnehmos.sight.mcp | MCP Server | Rust |
| mnehmos.synch.mcp | MCP Server | TypeScript |
| mnehmos.trace.mcp | MCP Server | TypeScript |

---

*ADR authored by Architect Mode | 2025-12-30*
