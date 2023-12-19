const readline = require('readline');

const tasks = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showTasks() {
  console.log('\nLista de tareas:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? 'x' : ' '}] ${task.description}`);
  });
}

function addTask(description) {
  const newTask = {
    indicator: tasks.length + 1,
    description,
    completed: false
  };
  tasks.push(newTask);
  console.log(`Tarea añadida: ${description}`);
}

function deleteTask(indicator) {
  const taskIndex = indicator - 1;
  if (tasks[taskIndex]) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    console.log(`Tarea eliminada: ${deletedTask.description}`);
  } else {
    console.log('No se encontró la tarea con ese indicador.');
  }
}

function completeTask(indicator) {
  const taskIndex = indicator - 1;
  if (tasks[taskIndex]) {
    tasks[taskIndex].completed = true;
    console.log(`Tarea completada: ${tasks[taskIndex].description}`);
  } else {
    console.log('No se encontró la tarea con ese indicador.');
  }
}

function handleUserInput() {
  rl.question('\nElige una opción:\n1. Mostrar tareas\n2. Añadir tarea\n3. Eliminar tarea\n4. Completar tarea\n5. Salir\nOpción: ', (answer) => {
    switch (answer) {
      case '1':
        showTasks();
        break;
      case '2':
        rl.question('Introduce la descripción de la tarea: ', (description) => {
          addTask(description);
          handleUserInput();
        });
        break;
      case '3':
        rl.question('Introduce el indicador de la tarea a eliminar: ', (indicator) => {
          deleteTask(parseInt(indicator));
          handleUserInput();
        });
        break;
      case '4':
        rl.question('Introduce el indicador de la tarea a completar: ', (indicator) => {
          completeTask(parseInt(indicator));
          handleUserInput();
        });
        break;
      case '5':
        console.log('Saliendo del programa. Hasta luego!');
        rl.close();
        break;
      default:
        console.log('Opción no válida. Por favor, elige una opción del 1 al 5.');
        handleUserInput();
        break;
    }
  });
}

console.log('¡Bienvenido a la lista de tareas!');
handleUserInput();