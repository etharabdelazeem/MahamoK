$(document).ready(function() {
    // Event handler for the form submission
    $('#add-button').click(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const title = $('#todo-input').val();
        const description = $('#todo-description').val();
        const priority = $('#todo-priority').val();
        const deadline = $('#todo-deadline').val();

        // Validate required fields
        if (!title) {
            alert("Task title is required.");
            return;
        }

        // AJAX POST request to add_task endpoint
        $.ajax({
            url: '/add_task',
            type: 'POST',
            data: {
                title: title,
                description: description,
                priority: priority,
                deadline: deadline
            },
            success: function(response) {
                // On success, append the new task to the task list
                appendTask(response.task);

                // Clear form inputs after adding task
                $('#todo-input').val('');
                $('#todo-description').val('');
                $('#todo-priority').val('');
                $('#todo-deadline').val('');
            },
            error: function(error) {
                console.error("Error adding task:", error);
                alert("Error adding task. Please try again.");
            }
        });
    });

    // Function to append a task to the task list
    function appendTask(task) {
        $('#todo-list').append(`
            <li class="todo" id="todo-${task.id}">
                <input type="checkbox" id="todo-checkbox-${task.id}">
                <label for="todo-checkbox-${task.id}" class="custom-checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#124c81">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </label>
                <label for="todo-checkbox-${task.id}" class="todo-text">${task.title}</label>
                <button class="delete-button" onclick="deleteTask(${task.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#124c81">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            </li>
        `);
    }

    // Function to delete a task
    function deleteTask(taskId) {
        $.ajax({
            url: `/delete_task/${taskId}`,
            type: 'GET',
            success: function(response) {
                // Remove the task from the UI
                $(`#todo-${taskId}`).remove();
            },
            error: function(error) {
                console.error("Error deleting task:", error);
                alert("Error deleting task. Please try again.");
            }
        });
    }

    // Event handler for logout button
    $('#logout-button').click(function(event) {
        window.location.href = '/logout';
    });
});

