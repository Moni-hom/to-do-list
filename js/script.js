{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [...tasks.filter((task, index) => index != taskIndex)];
        render();
      };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => {
            return index === taskIndex ? { ...task, done: !task.done } : task;
        });
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButton = document.querySelectorAll(".js-toggleDone");

        toggleDoneButton.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const makrAllDoneTasks = () => {
        tasks = tasks.map((task) => {
            return { ...tasks, done: true};
        });
       render();
    };



    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li
                class="tasks__item js-task">

                <button class="tasks__button tasks__button--done js-toggleDone">
                    ${task.done ? "✔" : ""}
                </button>
                <span class="tasks__content${task.done ? " tasks__content--done" : ""}">${task.content}</span>
                <button class="tasks__button task__button--remove js-remove">🗑️
                </button>
            </li>    
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => { 
        let disappearingButtons = " ";

        if (tasks.length >= 1) {
            disappearingButtons += `
            <button class="tasksButton hideDoneTasksButon">${
                hideDoneTasks ? "Odkryj ukończone" : "Ukryj ukończone"
            }</button>
            <button class="tasksButton markAllDoneTaskButton">Ukończ wszystkie</button>
            `;
            }  
        document.querySelector(".js-buttons").innerHTML = disappearingButtons;
        }; 

    const bindButtonsEvents = () => { 
        const makrAllDoneTasks = document.querySelector(".markAllDoneTasksButton");
        
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}