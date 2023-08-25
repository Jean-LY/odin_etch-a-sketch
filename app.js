const container = document.getElementById("container");

const createGridBtn = document.querySelector("button");
createGridBtn.addEventListener('click', createNewGrid);

let pixels = document.getElementsByClassName("col");

function createGrid(rows, cols){
    var grid = "";
    var newCols =""; 

    //create columns for grid
    for(let a=1; a<=cols; a++){
        let newCol = "<div id=col-"+a+" class='col'></div>";
        newCols = newCols + newCol; 
        console.log(newCol);
    }
    
    //create rows for grids 
    for(let i=1; i<=rows; i++){
        let newRow = "<div id=row-"+i+" class='row'>"+newCols+"</div>";
        grid = grid + newRow; 
    }

    container.innerHTML=grid;

}

function promptInput(type){
    let input; 

    if(type=="row") 
        input = prompt("Please enter the number of rows (<=50)");
    if(type=="col") 
        input = prompt("Please enter the number of col (<=50)");

    return input;
}

function createNewGrid(){
        let inputRow, inputCol;
        
        inputRow = promptInput("row");
        
        while(inputRow>50){
            alert("please specify dimensions smaller than 50 for best experience.");
            inputRow = promptInput("row");
        }
        
        inputCol = promptInput("col");
        
        while(inputCol>50){
            alert("please specify dimensions smaller than 50 for best experience.");
            inputCol = promptInput("col");
        }
        
        createGrid(inputRow, inputCol);
        addEventListener(); 
}

function changeColor(e){
    e.target.style ="background-color: red";
    console.log(e.target);
}

createGrid(16,16); 
addEventListener();


function addEventListener(){
    for(i=0; i<pixels.length; i++){
        pixels[i].addEventListener('mouseover', changeColor);
    }
}