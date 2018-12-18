// define global variables
//localStorage.getItem("task") ? toDoArray = JSON.parse(localStorage.getItem("task")) : toDoArray = [];
// to do task array
var toDoArray = (localStorage.getItem("task")) ? JSON.parse(localStorage.getItem("task")) : toDoArray = [];
console.log(toDoArray);

// done task array
var doneArray = (localStorage.getItem("done")) ? JSON.parse(localStorage.getItem("done")) : doneArray = [];
console.log(doneArray);

// update display
displayList();

// on button click - add task
$("#addButton").on("click", function (event) {
    event.preventDefault();

    // get user input
    var taskInput = $("#task").val().trim();
    var dateInput = $("#due-date").val().trim();
    var noteInput = $("#notes").val().trim();

    // add if task input has value
    if (taskInput) {
        addTask(taskInput, dateInput, noteInput);
    }
});

// on enter button press - add task
$(document).keypress(function (event) {
    // get user input
    var taskInput = $("#task").val().trim();
    var dateInput = $("#due-date").val().trim();
    var noteInput = $("#notes").val().trim();

    // add task if enter key is pressed and task input has value
    if (event.which === 13 && taskInput) {
        addTask(taskInput, dateInput, noteInput);
    }
});

// on delete button click - delete task
$(document).on("click", ".deleteButton", deleteTask);

// on done button click - remove from to do table and add to done table
$(document).on("click", ".doneButton", completeTask);

// add task
function addTask(taskInput, dateInput, noteInput) {
    var taskObject = {
        task: taskInput,
        duedate: dateInput,
        note: noteInput
    };

    // push to toDo array
    toDoArray.push(taskObject);
    console.log(toDoArray);

    // store in localStorage
    localStorage.setItem("task", JSON.stringify(toDoArray));

    // clear inputs
    $("#task").val("");
    $("#due-date").val("");
    $("#notes").val("");

    // update display
    displayList();
}

// display to do list
function displayList() {
    // update to do table
    for (var i = 0; i < toDoArray.length; i++) {
        
        // create done button
        var doneButton = $("<button>");
        doneButton.attr("data-done", toDoArray[i]);
        doneButton.addClass("doneButton btn-floating btn-small");
        doneButton.html("<i class='material-icons'>check</i>");

        // create delete button
        var deleteButton = $("<button>");
        deleteButton.attr("data-delete", toDoArray[i]);
        deleteButton.addClass("deleteButton btn-floating btn-small");
        deleteButton.html("<i class='material-icons'>delete</i>");

        var toDoRow = $("<tr>").append(
            $("<td>").text(toDoArray[i].task),
            $("<td>").text(toDoArray[i].duedate),
            $("<td>").text(toDoArray[i].note),
            $("<td>").append(doneButton),
            $("<td>").append(deleteButton)
        )
    }

    // update done table
    for (var i = 0; i < doneArray.length; i++) {
        var doneRow = $("<tr>").append(
            $("<td>").text(doneArray[i][0].task),
            $("<td>").text(doneArray[i][0].duedate),
            $("<td>").text(doneArray[i][0].note)
        )
    }

    // append row to tables
    $("#toDoTable").append(toDoRow);
    $("#doneTable").append(doneRow);
}

// delete task
function deleteTask() {
    // remove from to do table
    $(this).closest("tr").remove();

    // remove from array
    var toDoNumber = $(this).attr("data-delete");
    toDoArray.splice(toDoNumber, 1);
    console.log(toDoArray);

    // localStorage
    localStorage.setItem("task", JSON.stringify(toDoArray));
}

// complete task
function completeTask() {    
    // remove from toDoArray
    var toDoNumber = $(this).attr("data-delete");
    var x = toDoArray.splice(toDoNumber, 1);

    // remove from to do table
    $(this).closest("tr").remove();

    // add to doneArray
    doneArray.push(x);
    console.log("toDo: ", toDoArray);
    console.log("done: ", doneArray);
    
    // store in localStorage
    localStorage.setItem("done", JSON.stringify(doneArray));

    // update display
    displayList();
}
