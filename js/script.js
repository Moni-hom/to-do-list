{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (index) => {
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    render();
  };

  // nie działa task
  //   const removeTask = (index) => {
  //     tasks = [...tasks.filter((task, i) => i != index)];
  //     render();
  //   };

  const toggleTaskDone = (index) => {
    tasks = tasks.map((task, i) => {
      return i === index ? { ...task, done: !task.done } : task;
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

    toggleDoneButton.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const markAllDoneTasks = () => {
    tasks = tasks.map((task) => {
      return { ...tasks, done: true };
    });
    render();
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".markAllDoneButton");

    if (markAllDoneButton != null) {
      markAllDoneButton.addEventListener("click", () => {
        markAllDoneTasks();
      });
    }
  };

  const TaskIsDone = (task) => (task.done ? true : false);

  const EveryTaskDone = () => {
    const markAllDoneButton = document.querySelector(".markAllDoneButton");
    if (markAllDoneButton != null) {
      if (tasks.every((task) => TaskIsDone(task))) {
        markAllDoneButton.toggleAttribute("disabled");
      }
    }
  };

  const hideStatus = () => {
    hideDoneTasks = !hideDoneTasks;
  };

  const hideAllDoneTasks = () => {
    const hideDoneTasksButton = document.querySelector(
      ".js-hideDoneTasksButton"
    );
    hideDoneTasksButton != null
      ? hideDoneTasksButton.addEventListener("click", () => {
          hideStatus();
        })
      : null;
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li
                class="tasks__item js-task ${
                  task.done & hideDoneTasks ? "hidden" : " "
                }">

                <button class="tasks__button tasks__button--done js-toggleDone">
                    ${task.done ? "✔" : ""}
                </button>
                <span class="tasks__content${
                  task.done ? " tasks__content--done" : ""
                }">${task.content}</span>
                <button class="tasks__button task__button--remove js-remove">🗑️
                </button>
            </li>    
            `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }
    buttonsElement.innerHTML = `
        <button class="section__button js-hideDoneTasksButton">
            ${hideDoneTasks ? "Odkryj ukończone" : "Ukryj ukończone"}
        </button>
        <button class="section__button markAllDoneButton"
             ${tasks.every(({ done }) => done) ? "disabled" : ""}>
         Ukończ wszystkie
        </button>
    `;
  };
  //   const renderButtons = () => {
  //     let disappearingButtons = " ";

  //     if (tasks.length >= 1) {
  //       disappearingButtons += `
  //             <button class="tasksButton js-hideDoneTasksButton">${
  //               hideDoneTasks ? "Odkryj ukończone" : "Ukryj ukończone"
  //             }</button>
  //             <button class="tasksButton markAllDoneButton">Ukończ wszystkie</button>
  //             `;
  //     }
  //     document.querySelector(".js-buttons").innerHTML = disappearingButtons;
  //   };

  const render = () => {
    renderTasks();
    renderButtons();

    hideAllDoneTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
    EveryTaskDone();
  };

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
