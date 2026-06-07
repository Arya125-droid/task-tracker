# Task Tracker CLI

A lightweight, high-performance Command Line Interface (CLI) task tracking application built with native Node.js (ES Modules). This tool operates entirely in the terminal, managing a localized persistent database layer with optimized data lookup speeds.

---

## Architecture & Performance Design

Unlike typical beginner implementations that store collection data sets inside flat JSON arrays—forcing an expensive linear sequential search ($O(N)$) every time a task is read, updated, or modified—this project implements a **Hash Map Document Storage Pattern**.

* **Data Layout:** Data is stored on disk inside an associative key-value object bucket (`data` dictionary mapped by unique task IDs).
* **Time Complexity Optimization:** By mapping operations through explicit string hashing keys, finding a task or modifying its status operates at an optimal **Constant Time Complexity ($O(1)$)**. Execution runtime remain instant, completely independent of whether the database scales to 10 records or 10 million records.

---

## Tech Stack & Pillars Covered

* **Runtime Environment:** Node.js (v24+)
* **Module System:** ECMAScript Modules (ESM) via `"type": "module"`
* **Persistence Layer:** Structured Synchronous File System I/O isolation (`node:fs`)
* **Pillars Mastered:** High-Performance Caching Patterns, Defensive Synchronous I/O Boundary Isolation, and Algorithmic Complexity Mapping.

---

## Project Directory Structure

```text
task-tracker/
├── package.json          
├── package-lock.json
└── src/
    ├── data/
        └── tasks.json
    ├── server.js         
    └── utils/
        └── utility.js    
```
---

## Setup and Global Installation

To install this tool and run it natively from anywhere across your machine's filesystem without needing to type `node` prefixes, execute the following configuration steps:

### 1. Enable Global Command Line Permissions
Navigate to your project folder and grant your main server router execution permissions within your environment shell:
```Bash
chmod +x src/server.js
```

### 2. Symlink the Binary to Global Env
Instruct your package manager to link the binary tag (`task-cli`) specified in your `package.json` to your system path:
```Bash
npm link
```
---

## Command Execution Suite

Now, open a completely separate terminal window, navigate away to any directory, and manage your workflow matrix seamlessly:

### 1. Initialize & Append Tasks (`add`)
Adds a task directly into your storage map. The ID increments automatically.
```Bash
task-cli add "Configure PostgreSQL indices"
task-cli add "Complete Redis University labs"
```

### 2. List Your Task Matrix (`list`)
Converts the internal dictionary to a clean flat array frame on-the-fly for terminal layout rendering.
```Bash
task-cli list
```

### 3. Filter Contexts by Status (`list [status]`)
Isolates tasks matching precise execution lanes: `todo`, `in-progress`, `or done`.
```Bash
task-cli list todo
```

### 4. Direct Constant-Time Status Mutator (`update`)
Updates a task status instantly in O(1) time by passing the `ID` and the target status category.
```Bash
task-cli update 1 in-progress
task-cli update 2 done
```
---

## Defensive Code Protections Included

* **Self-Healing State Fallbacks**: The data parsing controller includes structural bounds that catch empty files (`0-bytes`) on-the-fly, auto-initializing a clean database layout scheme dynamically to prevent application crashes under `Unexpected end of JSON input` errors.
* **Early-Exit Gate Validation**: Inputs are guarded heavily against numeric falsification or empty payload arguments, keeping corrupt writes completely out of the local disk infrastructure.
