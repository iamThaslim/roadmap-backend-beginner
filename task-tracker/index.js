const fs = require('fs')
const path = './tasks.json'

function readTasks() {
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify([]))
    }
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
}

function writeTasks(tasks) {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
}

function addTask(taskName) {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        name: taskName,
        status: 'not done'
    };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log('Task added:', newTask);
}

function updateTask(id, newName) {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
        task.name = newName;
        writeTasks(tasks);
        console.log('Task updated:', task)
    } else {
        console.log('Task not found')
    }
}

function deleteTask(id) {
    const tasks = readTasks();
    const filteredTasks = tasks.filter(t => t.id !== parseInt(id));
    writeTasks(filteredTasks);
    console.log(`Task with id ${id} deleted`);
}

function markTask(id, status) {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
        task.status = status;
        writeTasks(tasks);
        console.log(`Task ${id} marked as ${status}`)
    } else {
        console.log('Task not found');
    }
}

function listTasks(status = null) {
    const tasks = readTasks();
    let filteredTasks = tasks;

    if (status) {
        filteredTasks = tasks.filter(t => t.status === status)
    }

    if (filteredTasks.length) {
        filteredTasks.forEach(task => {
            console.log(`ID: ${task.id}, Name: ${task.name}, Status: ${task.status}`);
        })
    } else {
        console.log('No tasks found')
    }
}

const args = process.argv.slice(2);
const action = args[0];

switch (action) {
    case 'add':
        addTask(args[1]);
        break;
    case 'update':
        updateTask(args[1], args[2]);
        break;
    case 'delete':
        deleteTask(args[1]);
        break;
    case 'mark':
        markTask(args[1], args[2]);
        break;
    case 'list':
        listTasks();
        break;
    default: console.log('Unknown command')
}