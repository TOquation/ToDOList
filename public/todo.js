$(document).ready(function(){loadTasks();$("#addTask").on("click",function(){addTask()});$("#taskInput").on("keypress",function(e){if(e.which===13){addTask()}});function addTask(){const taskText=$("#taskInput").val().trim();if(taskText!==""){const taskItem=$(`
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
            `);$("#taskList").append(taskItem);$("#taskInput").val("");saveTasks()}}$("#taskList").on("click",".complete-task",function(){const taskItem=$(this).closest("li");taskItem.toggleClass("line-through text-gray-400");saveTasks()});$("#taskList").on("click",".delete-task",function(){$(this).closest("li").remove();saveTasks()});function saveTasks(){const tasks=[];$("#taskList li").each(function(){tasks.push({text:$(this).find("span").text(),completed:$(this).hasClass("line-through")})});localStorage.setItem("todoTasks",JSON.stringify(tasks))}function loadTasks(){const savedTasks=JSON.parse(localStorage.getItem("todoTasks")||"[]");savedTasks.forEach(task=>{const taskItem=$(`
                <li class="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm ${task.completed?"line-through text-gray-400":""}">
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
            `);$("#taskList").append(taskItem)})}});