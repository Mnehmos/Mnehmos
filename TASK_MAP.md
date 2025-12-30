# Task Map: Project Review & RAG Knowledge System

## Overview
- **Created**: 2025-12-30
- **Status**: Ready for Execution
- **Phases**: 2 (Sequential)
- **Total Tasks**: 25 (21 parallel review + 4 sequential RAG)

---

## Phase 1: Project Review Generation

### Phase 1 Metadata
```yaml
phase_id: "phase-1-reviews"
strategy: "parallel-safe"
parallelism: "21 concurrent tasks (workspace-isolated)"
completion_gate: "All 21 repos have PROJECT_KNOWLEDGE.md committed and pushed"
```

### Task Group: Repository Reviews

Each task below follows this pattern and can run in parallel:

| task_id | repo | mode | workspace_path | file_patterns | depends_on |
|---------|------|------|----------------|---------------|------------|
| review-arxiv-mcp | mnehmos.arxiv.mcp | code | mnehmos.arxiv.mcp/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-chatrpg-game | mnehmos.chatrpg.game | code | mnehmos.chatrpg.game/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-dsa-graham | mnehmos.dsa-graham.research | code | mnehmos.dsa-graham.research/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-fan-controller | mnehmos.fan-controller.app | code | mnehmos.fan-controller.app/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-index-foundry | mnehmos.index-foundry.mcp | code | mnehmos.index-foundry.mcp/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-invoicer | mnehmos.invoicer.app | code | mnehmos.invoicer.app/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-lcm | mnehmos.lcm.research | code | mnehmos.lcm.research/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-long-hall | mnehmos.long-hall.game | code | mnehmos.long-hall.game/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-multi-agent | mnehmos.multi-agent.framework | code | mnehmos.multi-agent.framework/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-ooda-mcp | mnehmos.ooda.mcp | code | mnehmos.ooda.mcp/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-prompts | mnehmos.prompts.research | code | mnehmos.prompts.research/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-quest-keeper-game | mnehmos.quest-keeper.game | code | mnehmos.quest-keeper.game/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-quest-keeper-website | mnehmos.quest-keeper.website | code | mnehmos.quest-keeper.website/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-quickey | mnehmos.quickey.app | code | mnehmos.quickey.app/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-right-wing | mnehmos.right-wing-predators.research | code | mnehmos.right-wing-predators.research/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-roo-code | mnehmos.roo.code | code | mnehmos.roo.code/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-rpg-mcp | mnehmos.rpg.mcp | code | mnehmos.rpg.mcp/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-screen-vision | mnehmos.screen.vision.webapp | code | mnehmos.screen.vision.webapp/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-sight-mcp | mnehmos.sight.mcp | code | mnehmos.sight.mcp/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-synch-mcp | mnehmos.synch.mcp | code | mnehmos.synch.mcp/ | ["PROJECT_KNOWLEDGE.md"] | none |
| review-trace-mcp | mnehmos.trace.mcp | code | mnehmos.trace.mcp/ | ["PROJECT_KNOWLEDGE.md"] | none |

---

### Task Specification Template (for each review task)

```yaml
# Example: review-ooda-mcp
task_id: "review-ooda-mcp"
mode: "code"
workspace_path: "mnehmos.ooda.mcp/"
file_patterns: ["PROJECT_KNOWLEDGE.md"]

objective: |
  Analyze the mnehmos.ooda.mcp repository and generate a comprehensive
  PROJECT_KNOWLEDGE.md document following the template in 
  Mnehmos/PROJECT_KNOWLEDGE_TEMPLATE.md

instructions:
  1_read:
    - Read README.md for project overview
    - Read package.json or Cargo.toml for dependencies
    - Scan src/ directory for main entry points
    - Identify exported functions, tools, or APIs
    
  2_analyze:
    - Determine project type (MCP Server, App, Game, Research, Framework)
    - Extract architecture patterns
    - Identify key components and their relationships
    - Note integration points with other Mnehmos projects
    
  3_generate:
    - Create PROJECT_KNOWLEDGE.md in repo root
    - Fill all template sections completely
    - Include real code examples (not placeholders)
    - Add accurate dependency versions
    
  4_commit:
    - Execute: git add PROJECT_KNOWLEDGE.md
    - Execute: git commit -m "docs: Add PROJECT_KNOWLEDGE.md for RAG indexing"
    - Execute: git push origin main

acceptance_criteria:
  - PROJECT_KNOWLEDGE.md exists in repo root
  - All template sections are filled (no TODOs or placeholders)
  - Quick Reference table has accurate data
  - At least one working code example included
  - Git commit and push successful

boomerang_return:
  type: "task-completed"
  files_changed: ["PROJECT_KNOWLEDGE.md"]
  tests_run: ["git status --porcelain (empty = committed)"]
  summary: "Generated PROJECT_KNOWLEDGE.md for mnehmos.ooda.mcp"
```

---

## Phase 2: RAG Chatbot Build

### Phase 2 Metadata
```yaml
phase_id: "phase-2-rag"
strategy: "sequential"
prerequisite: "phase-1-reviews COMPLETED"
completion_gate: "RAG server running at F:\Github\Mnehmos\rag-server"
```

### Task: rag-create

```yaml
task_id: "rag-create"
mode: "code"
depends_on: ["ALL phase-1 tasks"]

objective: |
  Create the Index Foundry project for the Mnehmos knowledge base

instructions:
  - Use indexfoundry_project_create tool
  - Project ID: mnehmos-knowledge-base
  - Name: Mnehmos Project Knowledge Base
  - Embedding: OpenAI text-embedding-3-small
  - Chunking: hierarchical with 1500 max chars

tool_call:
  name: "mcp--mnehmosindex-foundrymcp--indexfoundry_project_create"
  params:
    project_id: "mnehmos-knowledge-base"
    name: "Mnehmos Project Knowledge Base"
    description: "RAG chatbot containing knowledge from all Mnehmos GitHub repositories"
    embedding_model:
      provider: "openai"
      model_name: "text-embedding-3-small"
    chunk_config:
      strategy: "hierarchical"
      max_chars: 1500
      overlap_chars: 150

acceptance_criteria:
  - Project created successfully
  - Project visible in indexfoundry_project_list
```

### Task: rag-add-sources

```yaml
task_id: "rag-add-sources"
mode: "code"
depends_on: ["rag-create"]

objective: |
  Add all GitHub raw URLs as sources to the RAG project.
  CRITICAL: Use ONLY GitHub raw URLs, NOT local file paths.

instructions:
  For each repository, add these sources:
  
  1. PROJECT_KNOWLEDGE.md (from Phase 1):
     URL: https://raw.githubusercontent.com/Mnehmos/{repo}/main/PROJECT_KNOWLEDGE.md
     Tags: ["{repo}", "knowledge"]
     
  2. README.md:
     URL: https://raw.githubusercontent.com/Mnehmos/{repo}/main/README.md
     Tags: ["{repo}", "readme"]
     
  3. Primary source files (based on language):
     TypeScript: src/index.ts
     Rust: src/main.rs, src/lib.rs
     Python: main.py, app.py, or primary module
     
  4. Configuration files:
     package.json, Cargo.toml, requirements.txt, etc.

source_urls:
  # Format: URL | tags
  
  # mnehmos.arxiv.mcp
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.arxiv.mcp/main/PROJECT_KNOWLEDGE.md | arxiv-mcp,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.arxiv.mcp/main/README.md | arxiv-mcp,readme
  
  # mnehmos.chatrpg.game
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.chatrpg.game/main/PROJECT_KNOWLEDGE.md | chatrpg,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.chatrpg.game/main/README.md | chatrpg,readme
  
  # mnehmos.index-foundry.mcp
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.index-foundry.mcp/main/PROJECT_KNOWLEDGE.md | index-foundry,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.index-foundry.mcp/main/README.md | index-foundry,readme
  
  # mnehmos.ooda.mcp
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.ooda.mcp/main/PROJECT_KNOWLEDGE.md | ooda-mcp,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.ooda.mcp/main/README.md | ooda-mcp,readme
  
  # mnehmos.synch.mcp
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.synch.mcp/main/PROJECT_KNOWLEDGE.md | synch-mcp,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.synch.mcp/main/README.md | synch-mcp,readme
  
  # mnehmos.trace.mcp
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.trace.mcp/main/PROJECT_KNOWLEDGE.md | trace-mcp,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.trace.mcp/main/README.md | trace-mcp,readme
  
  # mnehmos.sight.mcp
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.sight.mcp/main/PROJECT_KNOWLEDGE.md | sight-mcp,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.sight.mcp/main/README.md | sight-mcp,readme
  
  # mnehmos.rpg.mcp
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.rpg.mcp/main/PROJECT_KNOWLEDGE.md | rpg-mcp,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.rpg.mcp/main/README.md | rpg-mcp,readme
  
  # mnehmos.multi-agent.framework
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.multi-agent.framework/main/PROJECT_KNOWLEDGE.md | multi-agent,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.multi-agent.framework/main/README.md | multi-agent,readme
  
  # mnehmos.roo.code
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.roo.code/main/PROJECT_KNOWLEDGE.md | roo-code,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.roo.code/main/README.md | roo-code,readme
  
  # mnehmos.screen.vision.webapp
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.screen.vision.webapp/main/PROJECT_KNOWLEDGE.md | screen-vision,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.screen.vision.webapp/main/README.md | screen-vision,readme
  
  # mnehmos.quest-keeper.game
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.quest-keeper.game/main/PROJECT_KNOWLEDGE.md | quest-keeper-game,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.quest-keeper.game/main/README.md | quest-keeper-game,readme
  
  # mnehmos.quest-keeper.website
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.quest-keeper.website/main/PROJECT_KNOWLEDGE.md | quest-keeper-website,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.quest-keeper.website/main/README.md | quest-keeper-website,readme
  
  # mnehmos.long-hall.game
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.long-hall.game/main/PROJECT_KNOWLEDGE.md | long-hall,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.long-hall.game/main/README.md | long-hall,readme
  
  # Research repos
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.dsa-graham.research/main/PROJECT_KNOWLEDGE.md | dsa-graham,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.lcm.research/main/PROJECT_KNOWLEDGE.md | lcm,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.prompts.research/main/PROJECT_KNOWLEDGE.md | prompts,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.right-wing-predators.research/main/PROJECT_KNOWLEDGE.md | research,knowledge
  
  # Applications
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.fan-controller.app/main/PROJECT_KNOWLEDGE.md | fan-controller,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.invoicer.app/main/PROJECT_KNOWLEDGE.md | invoicer,knowledge
  - https://raw.githubusercontent.com/Mnehmos/mnehmos.quickey.app/main/PROJECT_KNOWLEDGE.md | quickey,knowledge

acceptance_criteria:
  - All source URLs added successfully
  - No 404 errors (all PROJECT_KNOWLEDGE.md files exist from Phase 1)
  - Sources visible in project_get output
```

### Task: rag-build

```yaml
task_id: "rag-build"
mode: "code"
depends_on: ["rag-add-sources"]

objective: |
  Build the RAG index by processing all sources

instructions:
  - Use indexfoundry_project_build tool
  - This will fetch, extract, chunk, and embed all sources
  - Requires OPENAI_API_KEY environment variable

tool_call:
  name: "mcp--mnehmosindex-foundrymcp--indexfoundry_project_build"
  params:
    project_id: "mnehmos-knowledge-base"
    force: false
    dry_run: false

acceptance_criteria:
  - Build completes without errors
  - Chunks created in data/chunks.jsonl
  - Embeddings created in data/vectors.jsonl
  - project_get shows updated stats
```

### Task: rag-export-and-relocate

```yaml
task_id: "rag-export-and-relocate"
mode: "code"
depends_on: ["rag-build"]

objective: |
  Export the server code and move project to final location

instructions:
  1. Export server code:
     - Use indexfoundry_project_export
     - Include HTTP endpoints
     - Server name: mnehmos-rag-server
     
  2. Move project to final location:
     - From: {Index Foundry projects dir}/mnehmos-knowledge-base
     - To: F:\Github\Mnehmos\rag-server
     
  3. Verify structure:
     - F:\Github\Mnehmos\rag-server\src\index.ts exists
     - F:\Github\Mnehmos\rag-server\package.json exists
     - F:\Github\Mnehmos\rag-server\data\chunks.jsonl exists

tool_calls:
  - name: "mcp--mnehmosindex-foundrymcp--indexfoundry_project_export"
    params:
      project_id: "mnehmos-knowledge-base"
      include_http: true
      server_name: "mnehmos-rag-server"
      
  - name: "execute_command"
    params:
      command: "xcopy /E /I /Y {source} F:\\Github\\Mnehmos\\rag-server"

acceptance_criteria:
  - Server code exported
  - Project relocated to F:\Github\Mnehmos\rag-server
  - All data files present
```

### Task: rag-serve-and-test

```yaml
task_id: "rag-serve-and-test"
mode: "code"
depends_on: ["rag-export-and-relocate"]

objective: |
  Start the RAG server and verify it works

instructions:
  1. Start server:
     - Use indexfoundry_project_serve
     - Port: 8080
     - Mode: dev
     
  2. Test queries:
     - "What MCP servers does Mnehmos have?"
     - "How do I use the OODA MCP server?"
     - "What games has Mnehmos created?"
     
  3. Verify responses are accurate and include source citations

tool_call:
  name: "mcp--mnehmosindex-foundrymcp--indexfoundry_project_serve"
  params:
    project_id: "mnehmos-knowledge-base"
    port: 8080
    mode: "dev"

acceptance_criteria:
  - Server starts successfully
  - Health endpoint responds
  - Test queries return relevant results
  - Results include proper source attribution
```

---

## Execution Checklist

### Pre-Execution Verification
- [ ] All repos accessible at https://github.com/Mnehmos/{repo}
- [ ] Git credentials configured for push access
- [ ] OPENAI_API_KEY environment variable set
- [ ] Index Foundry MCP server connected

### Phase 1 Progress (0/21)
- [ ] review-arxiv-mcp
- [ ] review-chatrpg-game
- [ ] review-dsa-graham
- [ ] review-fan-controller
- [ ] review-index-foundry
- [ ] review-invoicer
- [ ] review-lcm
- [ ] review-long-hall
- [ ] review-multi-agent
- [ ] review-ooda-mcp
- [ ] review-prompts
- [ ] review-quest-keeper-game
- [ ] review-quest-keeper-website
- [ ] review-quickey
- [ ] review-right-wing
- [ ] review-roo-code
- [ ] review-rpg-mcp
- [ ] review-screen-vision
- [ ] review-sight-mcp
- [ ] review-synch-mcp
- [ ] review-trace-mcp

### Phase 2 Progress (0/4)
- [ ] rag-create
- [ ] rag-add-sources
- [ ] rag-build
- [ ] rag-export-and-relocate
- [ ] rag-serve-and-test

---

*Task Map created by Architect Mode | Ready for Orchestrator execution*
