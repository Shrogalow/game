let userSubmarinePlaced = false;
let flag = false;

let roundsPlayed = 0;
let userSubmarine = 10;
let userScore = 0;
let computerScore = 0;

let gridRows = 10;
let gridCols = 10;
let userGrid = [];


function grid() {
      // Get a reference to the grid element
    let gridElement = document.getElementById("pixelCanvas");
    let tb1 = document.getElementById("pixelCanvas");
    tb1.style.display = "table"; // Show the table
    tb1.innerHTML = ""; // Clear the table if it already exists
    
    for (let i = 0; i < 10; i++) {
        let myRow = document.createElement("tr");
        myRow.id = "row" + i; // Add unique ID to each row

        tb1.appendChild(myRow);
        let rowW = document.getElementById("row" + i);
        
        for (let j = 0; j < 10; j++) {
           let myCell = document.createElement("td");
           myCell.id = "cell" + i + "-" + j; // Add unique ID to each cell
           rowW.appendChild(myCell);
            
        }
        
    }

}



function setupGame() {
    grid();
    // userSubmarinePlaced = false; // reset userSubmarinePlaced flag
    console.log("here");
    let cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        console.log("inside the loop");
        cells[i].addEventListener("click", placeObject);
        // flag = true;
        // userSubmarinePlaced = true;
    }
    // grid();
}


function placeObject(event) {
    console.log("Clicked on cell!");
    // handle the placement of objects on the grid
    let cell = event.target;
    let objectType = prompt("What type of object do you want to place?");

     // check if cell is empty
    if (cell.innerHTML !== "") {
        alert("Cell is already occupied!");
        return;
    }


    //types of objectes 
    if (objectType >= 5 && objectType <= 9){
        // add fuel on the grid
        cell.innerHTML = objectType;
    } else{
        switch(objectType){
            case "o":
                //add obstacle on the grid
                cell.innerHTML = "obstacle";
                break;
            case "u":
                // add user's submarine on the grid
                if (userSubmarinePlaced) {
                    alert("You have already placed your submarine!");
                    break;
                }
                cell.innerHTML = "submarine";
                userSubmarinePlaced = true;
                 break;

            case "k":
                // add robotic killer submarine on the grid
                cell.innerHTML = "killer";
                break;
            default:
                alert("Invalid object type!");
        
        }
      }
    
}



// Add onclick event listener to end-play-button
let endGameButton = document.getElementById("EndBtn");
endGameButton.addEventListener("click", endStage);

// window.onload = setupGame;

function playStage(){
  // Increase the number of rounds played
  roundsPlayed++;
    // Display the initial state of the game grid and status information
    updatePlayStage();

    /* NOT SURE ABOUT THIS PART
    // Call the user's turn function
    userTurn();

    // Call the computer's turn function after a short delay
    setTimeout(computerTurn, 1000);
    */

    console.log("in the play stage");
    let cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        let cellValue = grid[i];

        // set the background color of the cell based on its value
        switch (cellValue) {
            
          case "obstacle":
            cell.style.backgroundColor = "black"; // obstacle
            break;
          case "u":
            cell.style.backgroundColor = "blue"; // user's submarine
            break;
          case "k":
            cell.style.backgroundColor = "red"; // robotic killer submarine
            break;
          case "f":
            cell.style.backgroundColor = "yellow"; // fuel cell
            cell.title = "Fuel: " + fuelCells[cell.id]; // add fuel amount to tooltip
            break;
          default:
            cell.style.backgroundColor = "lightblue"; // empty cell
            break;
        }
         // add additional status information to the cell
        if (cellValue === "u") {
            cell.title = "User's Submarine (Fuel: " + userSubmarineFuel + ")";
        } else if (cellValue === "k") {
            cell.title = "Robotic Killer Submarine (Fuel: " + killerSubmarineFuel + ")";
        }
    }

}

function updatePlayStage() {
  console.log("in the updatePlayStage");
  console.log(typeof userGrid);

    // Update the rounds played
    document.getElementById("roundsPlayed").innerHTML = roundsPlayed;
  
    // Update the fuel available to the user's submarine
    document.getElementById("userSubmarine").innerHTML = userSubmarine.fuel;
  
    // Update the user's score
    document.getElementById("userScore").innerHTML = userScore;
  
    // Update the computer's score
    document.getElementById("computerScore").innerHTML = computerScore;
  
    // Display the grid with all the objects placed during the setup stage
    let grid = document.getElementById("gameGrid");
    grid.innerHTML = "";
    // let gridRows = 10;
    // let gridCols = 10;
    // let userGrid = [];
    if (typeof userGrid !== 'undefined') {
      // the variable is defined
      console.log("IS DEFINDE");
    }else{
      console.log("IS NOT");
    }

    
    for (let i = 0; i < gridRows; i++) {
      let row = document.createElement("tr");
      for (let j = 0; j < gridCols; j++) {
        let cell = document.createElement("td");
        if (userGrid[i][j] === "u") {
          cell.className = "submarine";
        } else if (userGrid[i][j] === "k") {
          cell.className = "killer";
        } else if (userGrid[i][j] === "o") {
          cell.className = "obstacle";
        } else if (userGrid[i][j] === "c") {
          cell.className = "computer";
        }
        row.appendChild(cell);
      }
      grid.appendChild(row);
    }
}

  

function endStage(){
    let cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", placeObject);
    }
    alert("Game ended!");

}




function endSetup() {
    // Check if the user's submarine has been placed
    if (!userSubmarinePlaced) {
      alert("You must place your submarine before ending the setup stage.");
      return;
    }
  
    // Update the game status and UI
    setupStage = false;
    document.getElementById("gameStatus").innerHTML = "Play Stage";
    document.getElementById("EndSetupBtn").disabled = true;
    document.getElementById("EndBtn").disabled = false;
    document.getElementsByTagName("table")[0].style.opacity = "1";
  
    // Call the play function to start the game
    playStage();
}



function userTurn() {
  console.log("in the userTurn");

  // Check if the user's submarine has fuel
  if (userSubmarine.fuel === 0) {
    alert("Your submarine is out of fuel! Your turn ends.");
    endTurn();
    return;
  }

  // Ask the user for a move
  let move = prompt("Enter your move (a: move left, d: move right, w: move up, s: move down):");

  // Check if the move is valid and update the user's submarine position
  let x = userSubmarine.position[0];
  let y = userSubmarine.position[1];
  switch (move) {
    case "a":
      if (y > 0) {
        y--;
        userSubmarine.fuel--;
        userGrid[x][y + 1] = ".";
        userGrid[x][y] = "u";
      } else {
        alert("Cannot move left! Try again.");
      }
      break;
    case "d":
      if (y < 9) {
        y++;
        userSubmarine.fuel--;
        userGrid[x][y - 1] = ".";
        userGrid[x][y] = "u";
      } else {
        alert("Cannot move right! Try again.");
      }
      break;
    case "w":
      if (x > 0) {
        x--;
        userSubmarine.fuel--;
        userGrid[x + 1][y] = ".";
        userGrid[x][y] = "u";
      } else {
        alert("Cannot move up! Try again.");
      }
      break;
    case "s":
      if (x < 9) {
        x++;
        userSubmarine.fuel--;
        userGrid[x - 1][y] = ".";
        userGrid[x][y] = "u";
      } else {
        alert("Cannot move down! Try again.");
      }
      break;
    default:
      // Invalid input
      alert("Invalid input. Please enter a valid direction.");
      userTurn();
      return;
  }

  // Update the play stage and end the turn
  updatePlayStage();
  endTurn();
}

