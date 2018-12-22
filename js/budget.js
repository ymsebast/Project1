// $( document ).ready(function() 
// {
//      $('#BudgetStartModal').trigger('focus')
// });

//Firebase configuration code
var config = {
    apiKey: "AIzaSyBlek0__PTPfmmoGWL8zF4lSvwW_iNTU2k",
    authDomain: "diyknotlogin.firebaseapp.com",
    databaseURL: "https://diyknotlogin.firebaseio.com",
    projectId: "diyknotlogin",
    storageBucket: "",
    messagingSenderId: "802138216110"
  };
 firebase.initializeApp(config);
 
 //initialise the authentication service
 const auth = firebase.auth();




// Classes

class Budget {
     constructor(budget) {
          this.budget = Number(budget);
          this.budgetLeft = this.budget;
     }

     // Substrack from the budget
     substractFromBudget(amount) {
          return this.budgetLeft -= amount;
     }
}

// Everything related to HTML
class HTML {
     // Inserts the budget when the user submits it
     insertBudget(amount) {
          // Insert into HTML
          budgetTotal.innerHTML = `${amount}`;
          budgetLeft.innerHTML = `${amount}`;
     }


     // Displays a message (correct or invalid)
     printMessage(message, className) {
          const messageWrapper = document.createElement('div');
          messageWrapper.classList.add('text-center', 'alert', className);
          messageWrapper.appendChild(document.createTextNode(message));

          // Insert into HTML
          document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);


          // Clear the error
          setTimeout(function () {
               document.querySelector('.primary .alert').remove();
               addExpenseForm.reset();
          }, 3000);

     }
     // Displays the expenses from the form into the list
     addExpenseToList(name, amount) {
          const expensesList = document.querySelector('#expenses ul');

          // Create a li
          const li = document.createElement('li');
          li.className = "list-group-item d-flex justify-content-between align-items-center";
          // Create the template <span class="badge badge-primary badge-pill">$ ${amount}</span>
          // add new materialize class later for pill shape
          li.innerHTML = `
               ${name}
               <span>$ ${amount}</span>
              
          `;

          // Insert into the HTML
          expensesList.appendChild(li);
     }

     // Subtract expense amount from budget
     trackBudget(amount) {
          const budgetLeftDollars = budget.substractFromBudget(amount);
          budgetLeft.innerHTML = `${budgetLeftDollars}`;

          // Check when 25% is left
          if ((budget.budget / 4) > budgetLeftDollars) {
               budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
               budgetLeft.parentElement.parentElement.classList.add('alert-danger');

          } else if ((budget.budget / 2) > budgetLeftDollars) {
               budgetLeft.parentElement.parentElement.classList.remove('alert-success');
               budgetLeft.parentElement.parentElement.classList.add('alert-warning');

          }
     }
}




// Variables
const addExpenseForm = document.querySelector('#add-expense'),
     budgetTotal = document.querySelector('span#total'),
     budgetLeft = document.querySelector('span#left');


let budget, userBudget;

// Instanciate the HTML CLASS
const html = new HTML();

// Event Listeners
// eventListener();
// function eventListener() {

//      // // App Init
     // document.addEventListener('DOMContentLoaded', function() {
     //      // Ask the visitor the weekly budget
     //      userBudget = prompt(' What\'s your budget for this week?? ');
     //      // validate the userBudget 
     //      if(userBudget === null || userBudget === '' || userBudget === '0'  ) {
     //           window.location.reload();
     //      } else {
     //           // Budget is valid then instanciate the budget class
     //           budget = new Budget(userBudget);

     //           // Instanciate HTML Class
     //           html.insertBudget(budget.budget);
     //      }
     // });
//https://lipis.github.io/bootstrap-sweetalert/

// $('document').ready(function () {
//      swal("What\'s your budget for this week??", {
//           content: "input",
//         })
//         .then((amount) => {
//           swal(`Your Budget is: ${amount}`);
//         });

//try to instigate budget class
$('document').ready(function () {
     swal("What\'s your budget for this week??", {
          content: "input",
        })
              .then((userBudget) => {
               if(userBudget === null || userBudget === '' || userBudget === '0'  ) {
                              window.location.reload();
                         } else {
                              // Budget is valid then instanciate the budget class
                              budget = new Budget(userBudget);
               
                              // Instanciate HTML Class
                              html.insertBudget(budget.budget);
                         }
                    });
                       

     // When a new expense is added
     addExpenseForm.addEventListener('submit', function (e) {
          e.preventDefault();

          // Read the input values
          const expenseName = document.querySelector('#expense').value;
          const amount = document.querySelector('#amount').value;

          if (expenseName === '' || amount === '') {
               console.log(html);
               html.printMessage('There was error, all the fields are mandatory', 'alert-danger');
          } else {
               // Add the Expenses into the list
               html.addExpenseToList(expenseName, amount);
               html.trackBudget(amount);
               html.printMessage('Added...', 'alert-success');
          }
     });
})
