$(document).ready(function() {
    // Load tasks from local storage
    loadTasks();

    // Add task on button click
    $('#addTask').on('click', function() {
        addTask();
    });

    // Add task on Enter key press
    $('#taskInput').on('keypress', function(e) {
        if (e.which === 13) {
            addTask();
        }
    });

    // Function to add a new task
    function addTask() {
        const taskText = $('#taskInput').val().trim();
        
        if (taskText !== '') {
            // Create task element
            const taskItem = $(`
                <li class="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm">
                    <span class="flex-grow">${taskText}</span>
                    <div>
                        <button class="complete-task text-green-500 mr-2" title="Complete">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="delete-task text-red-500" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </li>
            `);

            // Append to task list
            $('#taskList').append(taskItem);
            $('#taskInput').val('');

            // Save tasks to local storage
            saveTasks();
        }
    }

    // Delegate event for completing tasks
    $('#taskList').on('click', '.complete-task', function() {
        const taskItem = $(this).closest('li');
        taskItem.toggleClass('line-through text-gray-400');
        saveTasks();
    });

    // Delegate event for deleting tasks
    $('#taskList').on('click', '.delete-task', function() {
        $(this).closest('li').remove();
        saveTasks();
    });

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        $('#taskList li').each(function() {
            tasks.push({
                text: $(this).find('span').text(),
                completed: $(this).hasClass('line-through')
            });
        });
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('todoTasks') || '[]');
        savedTasks.forEach(task => {
            const taskItem = $(`
                <li class="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm ${task.completed ? 'line-through text-gray-400' : ''}">
                    <span class="flex-grow">${task.text}</span>
                    <div>
                        <button class="complete-task text-green-500 mr-2" title="Complete">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="delete-task text-red-500" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </li>
            `);
            $('#taskList').append(taskItem);
        });
    }
});