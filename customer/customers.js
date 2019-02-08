var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 6666,

  user: "root",

  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

function loadProducts() {

  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    
    console.table(res);

    items(res);
  });
}

function items(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Hello My Friend, what would you like to buy? [Quit with Q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
    
      checkout(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {


        howMany(product);
      }
      else {
        console.log("No No No My Firend, We do not carry that.");
        loadProducts();
      }
    });
}

function howMany
(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many? [Quit with Q]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      
      checkout(val.quantity);
      var quantity = parseInt(val.quantity);

    
      if (quantity > product.stock_quantity) {
        console.log("No No No My Friend, we dont have enough!");
        loadProducts();
      }
      else {
        buy(product, quantity);
      }
    });
}

function buy(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("Thank you for your purchace of " + quantity + " " + product.product_name + ", My Friend!");
      loadProducts();
    }
  );
}

// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}

// Check to see if the user wants to quit the program
function checkout(choice) {
  if (choice.toLowerCase() === "q") {
    // Log a message and exit the current node process
    console.log("Thank You My Friend. Come Again!");
    process.exit(0);
  }
}
