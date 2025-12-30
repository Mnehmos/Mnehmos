# Orchestrator Handoff: Project Review & RAG System

## Executive Summary

**Objective**: Execute a two-phase system that (1) generates knowledge documents for all Mnehmos repositories and (2) builds a RAG chatbot using live GitHub data.

**Key Constraint**: Phase 2 MUST use GitHub raw URLs only - NO local file paths.

**Artifacts Location**: `F:\Github\Mnehmos\`
- [`ADR-001-PROJECT-REVIEW-AND-RAG-SYSTEM.md`](ADR-001-PROJECT-REVIEW-AND-RAG-SYSTEM.md) - Architecture decision record
- [`TASK_MAP.md`](TASK_MAP.md) - Detailed task specifications
- [`PROJECT_KNOWLEDGE_TEMPLATE.md`](PROJECT_KNOWLEDGE_TEMPLATE.md) - Template for worker tasks

---

## Pre-Execution Checklist

Before starting, verify:

```yaml
prerequisites:
  git_access:
    check: "Can push to https://github.com/Mnehmos/* repos"
    verify: "git config --get user.name && git config --get user.email"
    
  openai_api_key:
    check: "OPENAI_API_KEY environment variable is set"
    verify: "echo %OPENAI_API_KEY% (should show key or partial)"
    required_for: "Phase 2 embedding generation"
    
  index_foundry:
    check: "Index Foundry MCP server is connected"
    verify: "mcp--mnehmosindex-foundrymcp--indexfoundry_project_list should respond"
    
  working_directory:
    path: "F:\\Github"
    repos_present: 21 mnehmos.* directories
```

---

## Phase 1: Project Review Generation

### Execution Strategy

**Parallelism**: All 21 review tasks are parallel-safe (isolated workspaces).

**Delegation Mode**: `code` (for file creation and git operations)

### Task Delegation Pattern

For EACH repository, delegate as follows:

```yaml
delegate_task:
  task_id: "review-{repo-suffix}"
  mode: "code"
  workspace_path: "{full-repo-folder-name}/"
  file_patterns: ["PROJECT_KNOWLEDGE.md"]
  
  message: |
    ## Task: Generate PROJECT_KNOWLEDGE.md for {repo-name}
    
    ### Objective
    Analyze the {repo-name} repository and create a comprehensive 
    PROJECT_KNOWLEDGE.md document in the repository root.
    
    ### Reference Documents
    - Template: `Mnehmos/PROJECT_KNOWLEDGE_TEMPLATE.md`
    - Task spec: `Mnehmos/TASK_MAP.md` (section: review-{repo-suffix})
    
    ### Instructions
    1. **Analyze** the repository:
       - Read README.md for overview
       - Examine package.json/Cargo.toml/requirements.txt for dependencies
       - Scan source files in src/ or equivalent
       - Identify public APIs, tools, or functions
    
    2. **Generate** PROJECT_KNOWLEDGE.md:
       - Follow the template EXACTLY
       - Fill ALL sections (no placeholders)
       - Include REAL code examples from the codebase
       - Use ACCURATE version numbers from package files
    
    3. **Commit and Push**:
       ```bash
       cd {repo-folder}
       git add PROJECT_KNOWLEDGE.md
       git commit -m "docs: Add PROJECT_KNOWLEDGE.md for RAG indexing"
       git push origin main
       ```
    
    ### Acceptance Criteria
    - [ ] PROJECT_KNOWLEDGE.md exists in repo root
    - [ ] All template sections filled (no TODOs)
    - [ ] Quick Reference table accurate
    - [ ] At least 1 working code example
    - [ ] Git push successful
    
    ### Return
    Return a task-completed boomerang with:
    - files_changed: ["PROJECT_KNOWLEDGE.md"]
    - summary: Brief description of what was documented
```

### Repository List (21 tasks)

| task_id | Folder Name | GitHub Repo Name |
|---------|-------------|------------------|
| review-arxiv-mcp | mnehmos.arxiv.mcp | mnehmos.arxiv.mcp |
| review-chatrpg-game | mnehmos.chatrpg.game | mnehmos.chatrpg.game |
| review-dsa-graham | mnehmos.dsa-graham.research | mnehmos.dsa-graham.research |
| review-fan-controller | mnehmos.fan-controller.app | mnehmos.fan-controller.app |
| review-index-foundry | mnehmos.index-foundry.mcp | mnehmos.index-foundry.mcp |
| review-invoicer | mnehmos.invoicer.app | mnehmos.invoicer.app |
| review-lcm | mnehmos.lcm.research | mnehmos.lcm.research |
| review-long-hall | mnehmos.long-hall.game | mnehmos.long-hall.game |
| review-multi-agent | mnehmos.multi-agent.framework | mnehmos.multi-agent.framework |
| review-ooda-mcp | mnehmos.ooda.mcp | mnehmos.ooda.mcp |
| review-prompts | mnehmos.prompts.research | mnehmos.prompts.research |
| review-quest-keeper-game | mnehmos.quest-keeper.game | mnehmos.quest-keeper.game |
| review-quest-keeper-website | mnehmos.quest-keeper.website | mnehmos.quest-keeper.website |
| review-quickey | mnehmos.quickey.app | mnehmos.quickey.app |
| review-right-wing | mnehmos.right-wing-predators.research | mnehmos.right-wing-predators.research |
| review-roo-code | mnehmos.roo.code | mnehmos.roo.code |
| review-rpg-mcp | mnehmos.rpg.mcp | mnehmos.rpg.mcp |
| review-screen-vision | mnehmos.screen.vision.webapp | mnehmos.screen.vision.webapp |
| review-sight-mcp | mnehmos.sight.mcp | mnehmos.sight.mcp |
| review-synch-mcp | mnehmos.synch.mcp | mnehmos.synch.mcp |
| review-trace-mcp | mnehmos.trace.mcp | mnehmos.trace.mcp |

### Phase 1 Completion Gate

**Do NOT proceed to Phase 2 until:**
1. All 21 boomerang returns received with `status: success`
2. Verify each PROJECT_KNOWLEDGE.md is accessible via GitHub raw URL:
   ```
   https://raw.githubusercontent.com/Mnehmos/{repo}/main/PROJECT_KNOWLEDGE.md
   ```

---

## Phase 2: RAG Chatbot Build

### Execution Strategy

**Parallelism**: Sequential (each step depends on previous)

**Delegation Mode**: `code` (for tool calls and file operations)

### Step 2.1: Create Project

```yaml
delegate_task:
  task_id: "rag-create"
  mode: "code"
  
  message: |
    ## Task: Create Index Foundry Project
    
    Use the Index Foundry MCP tool to create the RAG project:
    
    ```
    Tool: mcp--mnehmosindex-foundrymcp--indexfoundry_project_create
    Parameters:
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
    ```
    
    ### Acceptance
    - Project created successfully
    - Project visible in project_list
```

### Step 2.2: Add Sources (CRITICAL - GitHub URLs Only!)

```yaml
delegate_task:
  task_id: "rag-add-sources"
  mode: "code"
  depends_on: ["rag-create"]
  
  message: |
    ## Task: Add GitHub Sources to RAG Project
    
    **CRITICAL CONSTRAINT**: Use ONLY GitHub raw URLs. Do NOT use local file paths.
    
    ### URL Pattern
    ```
    https://raw.githubusercontent.com/Mnehmos/{repo}/main/{file}
    ```
    
    ### Sources to Add
    
    For EACH of the 21 repositories, add these sources using 
    `mcp--mnehmosindex-foundrymcp--indexfoundry_project_add_source`:
    
    1. **PROJECT_KNOWLEDGE.md** (required):
       ```
       url: https://raw.githubusercontent.com/Mnehmos/{repo}/main/PROJECT_KNOWLEDGE.md
       tags: ["{repo-short}", "knowledge"]
       ```
    
    2. **README.md** (if exists):
       ```
       url: https://raw.githubusercontent.com/Mnehmos/{repo}/main/README.md
       tags: ["{repo-short}", "readme"]
       ```
    
    ### Complete Source List
    
    Execute project_add_source for each URL below:
    
    **MCP Servers:**
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.arxiv.mcp/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.arxiv.mcp/main/README.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.chatrpg.game/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.chatrpg.game/main/README.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.index-foundry.mcp/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.index-foundry.mcp/main/README.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.ooda.mcp/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.ooda.mcp/main/README.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.rpg.mcp/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.rpg.mcp/main/README.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.sight.mcp/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.sight.mcp/main/README.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.synch.mcp/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.synch.mcp/main/README.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.trace.mcp/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.trace.mcp/main/README.md
    
    **Applications:**
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.fan-controller.app/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.invoicer.app/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.quickey.app/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.screen.vision.webapp/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.screen.vision.webapp/main/README.md
    
    **Games:**
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.quest-keeper.game/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.quest-keeper.website/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.long-hall.game/main/PROJECT_KNOWLEDGE.md
    
    **Research:**
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.dsa-graham.research/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.lcm.research/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.prompts.research/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.right-wing-predators.research/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.right-wing-predators.research/main/README.md
    
    **Frameworks:**
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.multi-agent.framework/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.roo.code/main/PROJECT_KNOWLEDGE.md
    - https://raw.githubusercontent.com/Mnehmos/mnehmos.roo.code/main/README.md
    
    ### Acceptance
    - All sources added without 404 errors
    - project_get shows all sources listed
```

### Step 2.3: Build Index

```yaml
delegate_task:
  task_id: "rag-build"
  mode: "code"
  depends_on: ["rag-add-sources"]
  
  message: |
    ## Task: Build RAG Index
    
    Use Index Foundry to build the index:
    
    ```
    Tool: mcp--mnehmosindex-foundrymcp--indexfoundry_project_build
    Parameters:
      project_id: "mnehmos-knowledge-base"
      force: false
      dry_run: false
    ```
    
    **Note**: This requires OPENAI_API_KEY to be set for embeddings.
    
    ### Acceptance
    - Build completes without errors
    - chunks.jsonl created with content
    - vectors.jsonl created with embeddings
```

### Step 2.4: Export and Relocate

```yaml
delegate_task:
  task_id: "rag-export-relocate"
  mode: "code"
  depends_on: ["rag-build"]
  
  message: |
    ## Task: Export Server and Move to Final Location
    
    ### Step 1: Export
    ```
    Tool: mcp--mnehmosindex-foundrymcp--indexfoundry_project_export
    Parameters:
      project_id: "mnehmos-knowledge-base"
      include_http: true
      server_name: "mnehmos-rag-server"
    ```
    
    ### Step 2: Get Project Path
    ```
    Tool: mcp--mnehmosindex-foundrymcp--indexfoundry_project_get
    Parameters:
      project_id: "mnehmos-knowledge-base"
    ```
    (Note the returned path)
    
    ### Step 3: Copy to Final Location
    ```bash
    # From the project path returned above, copy to:
    xcopy /E /I /Y "{source_path}" "F:\Github\Mnehmos\rag-server"
    ```
    
    ### Acceptance
    - F:\Github\Mnehmos\rag-server\src\index.ts exists
    - F:\Github\Mnehmos\rag-server\package.json exists
    - F:\Github\Mnehmos\rag-server\data\chunks.jsonl exists
```

### Step 2.5: Start Server and Test

```yaml
delegate_task:
  task_id: "rag-serve-test"
  mode: "code"
  depends_on: ["rag-export-relocate"]
  
  message: |
    ## Task: Start RAG Server and Verify
    
    ### Start Server
    ```
    Tool: mcp--mnehmosindex-foundrymcp--indexfoundry_project_serve
    Parameters:
      project_id: "mnehmos-knowledge-base"
      port: 8080
      mode: "dev"
    ```
    
    ### Test Queries
    Use project_query to test:
    
    1. "What MCP servers does Mnehmos have?"
       - Should return: arxiv, chatrpg, index-foundry, ooda, rpg, sight, synch, trace
    
    2. "How do I use the OODA MCP server?"
       - Should return usage examples from ooda.mcp PROJECT_KNOWLEDGE.md
    
    3. "What games has Mnehmos created?"
       - Should return: quest-keeper, long-hall, chatrpg
    
    ### Acceptance
    - Server starts on port 8080
    - Health endpoint responds
    - Test queries return relevant results
    - Results include source attribution
```

---

## Error Handling

### Phase 1 Errors

| Error | Cause | Resolution |
|-------|-------|------------|
| Git push fails | No push access | Check git credentials, ensure repo is owned |
| Empty repo | No files to analyze | Create minimal PROJECT_KNOWLEDGE.md noting empty repo |
| Missing README | No overview available | Use package.json description or repo name |

### Phase 2 Errors

| Error | Cause | Resolution |
|-------|-------|------------|
| 404 on raw URL | File not pushed yet | Verify Phase 1 completed, check GitHub |
| OPENAI_API_KEY missing | Env var not set | Set the variable and retry |
| Rate limit | Too many GitHub requests | Add delays between source additions |
| Build timeout | Large corpus | Increase timeout, or batch in chunks |

---

## Success Verification

### Final Checklist

- [ ] 21 PROJECT_KNOWLEDGE.md files accessible on GitHub
- [ ] RAG project exists at F:\Github\Mnehmos\rag-server
- [ ] Server runs and responds on port 8080
- [ ] Queries return accurate, sourced results

### Completion Report

When complete, generate summary:

```yaml
completion_report:
  phase_1:
    repos_processed: 21
    documents_created: 21
    commits_pushed: 21
    
  phase_2:
    project_id: "mnehmos-knowledge-base"
    sources_indexed: {count}
    chunks_generated: {count}
    server_location: "F:\\Github\\Mnehmos\\rag-server"
    server_endpoint: "http://localhost:8080"
    
  test_results:
    query_1: "{response summary}"
    query_2: "{response summary}"
    query_3: "{response summary}"
```

---

## Handoff to Orchestrator

**To Begin Execution**:

Switch to Orchestrator mode and provide this message:

```
Execute the Project Review & RAG System plan.

Reference documents in F:\Github\Mnehmos\:
- ORCHESTRATOR_HANDOFF.md (this document)
- TASK_MAP.md (detailed task specs)
- PROJECT_KNOWLEDGE_TEMPLATE.md (worker template)
- ADR-001-PROJECT-REVIEW-AND-RAG-SYSTEM.md (architecture)

Phase 1: Generate PROJECT_KNOWLEDGE.md for all 21 repos (parallelizable)
Phase 2: Build RAG chatbot using GitHub URLs (sequential)

Start with Phase 1 prerequisite checks, then begin delegating review tasks.
```

---

*Handoff document created by Architect Mode | 2025-12-30*
