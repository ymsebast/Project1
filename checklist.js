// initialize firebase

var config = {
    apiKey: "AIzaSyBazcPqU9V_MbRsEHtIk3oFvHHtGSwS2l8",
    authDomain: "project-aef34.firebaseapp.com",
    databaseURL: "https://project-aef34.firebaseio.com",
    projectId: "project-aef34",
    storageBucket: "project-aef34.appspot.com",
    messagingSenderId: "668614696225"
};
firebase.initializeApp(config);

// create firebase variable
var database = firebase.database();

// on addButton click - add to firebase 
$("#addButton").on("click", function (event) {
    event.preventDefault();

    // get user input
    var taskInput = $("#task").val().trim();
    var dateInput = $("#due-date").val().trim();
    var noteInput = $("#notes").val().trim();

    // store in firebase if task input has value
    if (taskInput) {
        database.ref().push({
            task: taskInput,
            dueDate: dateInput,
            notes: noteInput,
            done: "false"
        });
    }

    else {
        swal("Please enter a task!");
    }

    // clear form
    $("#task").val("");
    $("#due-date").val("");
    $("#notes").val("");

});

// firebase event to add task to table
database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    console.log(snapshot.key);

    // get data from firebase
    var taskInput = snapshot.val().task;
    var dateInput = snapshot.val().dueDate;
    var noteInput = snapshot.val().notes;

    // create done button
    var doneButton = $("<button>");
    //doneButton.attr("data-done", i);
    doneButton.addClass("doneButton btn-floating btn-small");
    doneButton.html("<i class='material-icons'>check</i>");

    // create delete button
    var deleteButton = $("<button>");
    //deleteButton.attr("data-delete", i);
    deleteButton.addClass("deleteButton btn-floating btn-small");
    deleteButton.html("<i class='material-icons'>delete</i>");

    // create new table row
    var newRow = $("<tr>").append(
        $("<td>").text(taskInput),
        $("<td>").text(dateInput),
        $("<td>").text(noteInput),
        $("<td>").append(doneButton),
        $("<td>").append(deleteButton)
    )

    // add firebase key to row
    newRow.attr("data-key", snapshot.key);

    // append row to toDo table
    $("#toDoTable").append(newRow);
});

// on delete button click - delete task
$(document).on("click", ".deleteButton", deleteTask);

// delete task
function deleteTask() {
    swal("Delete this task?", {
        buttons: ["Cancel", "Delete"],
    }).then((willDelete) => {
        if (willDelete) {
            // get row of task
            var taskRow = $(this).closest("tr");

            // remove from table
            taskRow.remove();

            // get key of row
            var taskKey = taskRow.attr("data-key");
            console.log("taskKey: " + taskKey);

            // delete row from firebase
            database.ref().child(taskKey).remove();
        }
    });
}

// on done button click - complete task
$(document).on("click", ".doneButton", completeTask);

// complete task
function completeTask() {
    // get row of task
    var taskRow = $(this).closest("tr");

    // get key of row
    var taskKey = taskRow.attr("data-key");
    console.log("taskKey: " + taskKey);

    database.ref().child(taskKey).once("value", function (snap) {
        var taskDone = snap.val().done;
        console.log("taskDone: " + taskDone);

        // check if task is not done, then set task to done and update css
        if (taskDone === "false") {
            // update css to done
            taskRow.css({ "color": "lightgray", "font-style": "italic" });

            // set taskDone to true
            database.ref(taskKey).update({done: "true"});
            var taskDone = "true";
        }

        // else if task is done, set task to not done
        else {
            // update css to not done
            taskRow.css({ "color": "black", "font-style": "normal" });
            
            // set taskDone to true
            database.ref(taskKey).update({done: "false"});
            var taskDone = "false";
        }
    });
}