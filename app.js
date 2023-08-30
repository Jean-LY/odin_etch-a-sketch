var leftMouseDown = false; 
var rightMouseDown = false;
var selectedCanvasColor = "#FFFFFF"; 
var selectedBrushColor = "#000000";
var selectRandomColor = false;
var selectedEraserTool = false;
var selectedBrushTool = true;

const container = document.getElementById("container");
const createGridBtn = document.getElementById("createBtn");
const clearGridBtn = document.getElementById("clearBtn");
const brushColorInput = document.getElementById("brushColor");
const selectEraserBtn = document.getElementById("eraseTool");
const selectBrushBtn = document.getElementById("brushTool");

createGridBtn.addEventListener('click', createNewGrid);
clearGridBtn.addEventListener('click',clearGrid);
brushColorInput.addEventListener('input', (e)=> selectedBrushColor =e.target.value);
selectEraserBtn.addEventListener('click', selectTool); 
selectBrushBtn.addEventListener('click', selectTool); 

let pixels = document.getElementsByClassName("col");

container.addEventListener("mousedown", (e)=> {
    if(e.button==0){
        leftMouseDown= true; 
    }
    if(e.button==2){
        rightMouseDown = true;
    }
})

container.addEventListener("mouseup", (e)=> {
    if(e.button==0){
        leftMouseDown= false; 
    }
    if(e.button==2){
        rightMouseDown = false;
    }
})

function createGrid(rows, cols){
    var grid = "";
    var newCols =""; 

    //create columns for grid
    for(let a=1; a<=cols; a++){
        let newCol = "<div id=col-"+a+" class='col'></div>";
        newCols = newCols + newCol; 
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

function addEventListener(){
    for(i=0; i<pixels.length; i++){
        pixels[i].addEventListener('mouseenter', changeColor);
    }
}

function changeColor(e){
    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    //brushtool
    if(leftMouseDown && selectedBrushTool){
        if(selectRandomColor == true)
            e.target.style =`background-color: ${randomColor}`;
        else
            e.target.style =`background-color: ${selectedBrushColor}`;
    }

    //eraserTool
    if(leftMouseDown && selectedEraserTool){
        e.target.style = `background-color: ${selectedCanvasColor}`;
    }
}

function clearGrid(){
    for(i=0; i<pixels.length; i++){
        pixels[i].style = `background-color: white`;
    }
    leftMouseDown = false; 
}

function selectTool(e){
    let accentColor = getComputedStyle(document.body).getPropertyValue('--accent');
    let primaryColor = getComputedStyle(document.body).getPropertyValue('--primary');

    selectedEraserTool = false; 
    selectEraserBtn.style = `background-color: ${primaryColor}`;
    selectedBrushTool = false; 
    selectBrushBtn.style = `background-color: ${primaryColor}`;

    if(e.target.id == "eraseTool"){
        selectedEraserTool = true; 
        selectEraserBtn.style = `background-color: ${accentColor}`    
    }

    if(e.target.id == "brushTool"){
        selectedBrushTool = true; 
        selectBrushBtn.style = `background-color: ${accentColor}`
    }


}


createGrid(16,16); 
addEventListener();
