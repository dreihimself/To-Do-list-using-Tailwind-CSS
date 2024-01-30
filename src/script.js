var btnAdd = document.querySelector("#add-task");
var taskInput = document.querySelector("input[name='task']");
var prioritySelect = document.querySelector("select[name='priority']");
var tableBody = document.querySelector("tbody");
var noDataFoundMessage = document.getElementById("no-data-found");

btnAdd.addEventListener("click", addTask);

function addTask() {
    var task = taskInput.value.trim();
    var priority = prioritySelect.value;

    if (task !== "" && priority !== "") {
        var newRow = document.createElement("tr");

        // Create checkbox column
        var checkboxColumn = document.createElement("td");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "done";
        checkboxColumn.appendChild(checkbox);
        newRow.appendChild(checkboxColumn);

        // Create task column
        var taskColumn = document.createElement("td");
        taskColumn.classList.add(
            "text-left",
            "pl-5",
            "border-2",
            // Add dynamic border color class based on priority
            priority === "none" ?  "border-neutral-400" :
            priority === "high" ? "border-red-400" :
            priority === "medium" ? "border-yellow-400" :
            priority === "low" ? "border-green-400" : ""
        );
        taskColumn.textContent = task;
        newRow.appendChild(taskColumn);

        // Create action column with remove button
        var actionColumn = document.createElement("td");
        var removeButton = document.createElement("button");
        removeButton.classList.add("rounded-lg", "bg-red-100", "text-neutral-700");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
            newRow.remove();
            checkEmpty();
        });
        actionColumn.appendChild(removeButton);
        newRow.appendChild(actionColumn);

        // Append the new row to the table
        tableBody.appendChild(newRow);

        var lineBreak = document.createElement("br");
        tableBody.appendChild(lineBreak);
       
        // Clear input fields
        taskInput.value = "";
        prioritySelect.value = "";

        // Mark as done
        markAsDone(checkbox, taskColumn);

        // Check for empty list and add/remove "Task will be placed here."
        checkEmpty();
    }
}

function markAsDone(checkbox, taskColumn) {
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            taskColumn.style.textDecoration = "line-through";
        } else {
            taskColumn.style.textDecoration = "none";
        }
    });
}

function checkEmpty() {
    var todoItems = document.querySelectorAll("tbody tr");

    if (todoItems.length === 0) {
        tableBody.innerHTML = "";
        noDataFoundMessage.style.display = "block";
    } else {
        noDataFoundMessage.style.display = "none";
    }
}
var btnAll = document.querySelector("ul li:nth-child(1) button");
var btnHigh = document.querySelector("ul li:nth-child(2) button");
var btnMedium = document.querySelector("ul li:nth-child(3) button");
var btnLow = document.querySelector("ul li:nth-child(4) button");

btnAll.addEventListener("click", function () {
    showTasksByPriority("all");
});

btnHigh.addEventListener("click", function () {
    showTasksByPriority("high");
});

btnMedium.addEventListener("click", function () {
    showTasksByPriority("medium");
});

btnLow.addEventListener("click", function () {
    showTasksByPriority("low");
});

function showTasksByPriority(priority) {
    var todoItems = document.querySelectorAll("tbody tr");

    todoItems.forEach(function (item) {
        var priorityColumn = item.querySelector("td:nth-child(2)");
        var itemPriority = priorityColumn.classList[2]; // Extract priority class

        if (priority === "all" || itemPriority === `border-${priority}-400`) {
            item.style.display = "table-row";
        } else {
            item.style.display = "none";
        }
    });
}
