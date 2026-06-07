import { addTask, listTasks, updateTaskStatus } from './utils/utility.js';

const main = () => {
    const [,, command, arg1, arg2] = process.argv;
    switch (command){
        case 'add':
            addTask(arg1);
            break;
        case 'list':
            listTasks(arg1);
            break;
        case 'update':
            updateTaskStatus(arg1, arg2);
            break;
        default:
            console.log(
            `
        Task Tracker Platform
===================================
Available Execution Commands:
> task-cli add "Your Description String"
> task-cli list
> task-cli list [todo | in-progress | done]
> task-cli update [id] [todo | in-progress | done]
            `
            );
    }
}

main();