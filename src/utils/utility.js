import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const tasksDataPath = path.resolve(__dirname, '..', 'data', 'tasks.json');

const readData = () => {
    try {
        if (!fs.existsSync(tasksDataPath)) {
            return { lastId: 0, data: {} };
        }
        const data = fs.readFileSync(tasksDataPath, 'utf8').trim();
        return JSON.parse(data || '{"lastId": 0, "data": {}}'); 
    } catch (error) {
        console.error("Error reading data:", error.message);
        return { lastId: 0, data: {} };
    }
};

export const writeData = (data) => {
    try {
        fs.writeFileSync(tasksDataPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing data: ", error);
        throw error;
    }
};

export const addTask = (description) => {
    if (!description) {
        console.log("Validation Failure: A task description string is required.");
        return;
    }
    const tasksContainer = readData(); 
    tasksContainer.lastId += 1;
    const newId = tasksContainer.lastId;
    const newTask = {
        id: newId,
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasksContainer.data[newId] = newTask;
    writeData(tasksContainer);
    console.log(`Task successfully created! (ID: ${newId})`);
};

export const listTasks = (filterStatus) => {
    const tasksContainer = readData();
    const taskList = Object.values(tasksContainer.data);
    const filteredTasks = filterStatus ? taskList.filter(task => task.status.toLowerCase() === filterStatus.toLowerCase()) : taskList;
    if (filteredTasks.length === 0) {
        console.log("No matching tasks found.");
        return;
    }
    console.log("\n --- YOUR TASKS ---");
    filteredTasks.forEach(task => {
        console.log(`ID: ${task.id} | Status: ${task.status.toUpperCase().padEnd(11)} | Description: ${task.description.padEnd(30)} | Updated At: ${task.updatedAt}`);
    });
    console.log("---------------------\n");
};

export const updateTaskStatus = (idStr, newStatus) => {
    const id = parseInt(idStr);
    if (isNaN(id)) {
        console.log("Invalid task ID. Please provide a numeric value.");
        return;
    }
    const tasksContainer = readData();
    if (!tasksContainer.data[id]) {
        console.log(`Target Error: Active task with ID ${id} not found.`);
        return;
    }
    tasksContainer.data[id].status = newStatus.toLowerCase();
    tasksContainer.data[id].updatedAt = new Date().toISOString();
    writeData(tasksContainer);
    console.log(`⚙️ Task ID ${id} status updated to ${newStatus.toUpperCase()}.`);
};