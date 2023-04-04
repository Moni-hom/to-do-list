{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({content: newTaskContent});
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };
    
    const blindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });

    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li
                class="tasks__item js-task">

                <button class="tasks__button tasks__button--done js-toggleDone>
                    ${task.done ?  "✔" : ""}
                </button>
                <span class="tasks__content${task.done ? "tasks__content--done" : ""}">${task.content}</span>
                <button class="tasks__button task__button--remove js-remove">🗑️
                </button>
            </li>    
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        blindEvents()
    };

    init();
}