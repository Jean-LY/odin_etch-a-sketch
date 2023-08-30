//-------------------------------------------GRID------------------------------------
//create default grid 
const container = document.getElementById("container");

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

createGrid(16,16); 

//create new grid with specified dimensions
const createGridBtn = document.getElementById("createBtn");
createGridBtn.addEventListener('click', createNewGrid);

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

function promptInput(type){
    let input; 

    if(type=="row") 
        input = prompt("Please enter the number of rows (<=50)");
    if(type=="col") 
        input = prompt("Please enter the number of col (<=50)");

    return input;
}

//clear painting
const clearGridBtn = document.getElementById("clearBtn");
clearGridBtn.addEventListener('click',clearGrid);

function clearGrid(){
    for(i=0; i<pixels.length; i++){
        pixels[i].style = `background-color: white`;
    }
    leftMouseDown = false; 
}


//---------------------------------Settings------------------------------------------
//get theme colors 
let textColor = getComputedStyle(document.body).getPropertyValue('--text');
let backgroundColor = getComputedStyle(document.body).getPropertyValue('--background');
let primaryColor = getComputedStyle(document.body).getPropertyValue('--primary');
let secondaryColor = getComputedStyle(document.body).getPropertyValue('--secondary');
let accentColor = getComputedStyle(document.body).getPropertyValue('--accent');
    
//set brush color 
var selectedBrushColor = "#000000";

const brushColorInput = document.getElementById("brushColor");
brushColorInput.addEventListener('input', (e)=> {
    selectedBrushColor =e.target.value;
    
})

//set brush color (random)
var selectedRandomColor = false;

const randomColorBtn = document.getElementById("randomColorBtn");
randomColorBtn.addEventListener('click', ()=>{
    selectedRandomColor = randomColorBtn.checked;
})

function getRandomColor(){
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

//set eraser color 
var eraserColor = "#FFFFFF"; 

//---------------------------------Tools -----------------------------------------

//select brush 
var selectedBrushTool = true;
const selectBrushBtn = document.getElementById("brushTool");

selectBrushBtn.addEventListener('click', ()=>{
    if(!selectedBrushTool){
        deselectTools();
        selectBrushBtn.style = `background-color: ${accentColor}`;
        selectedBrushTool = true; 
    }
    else{
        selectBrushBtn.style = `background-color: ${primaryColor}`;
        selectedBrushTool =false;
    }
})

//select eraser 
var selectedEraserTool = false;
const selectEraserBtn = document.getElementById("eraseTool");

selectEraserBtn.addEventListener('click', ()=>{
    if(!selectedEraserTool){
        deselectTools();
        selectEraserBtn.style = `background-color: ${accentColor}`;
        selectedEraserTool = true; 
    }
    else{
        selectEraserBtn.style = `background-color: ${primaryColor}`;
        selectedEraserTool =false;
    }
}); 

function deselectTools(){
    selectedBrushTool = false; 
    selectBrushBtn.style = `background-color: ${primaryColor}`;

    selectedEraserTool = false;
    selectEraserBtn.style = `background-color: ${primaryColor}`;

}

//change pixel colors 
let pixels = document.getElementsByClassName("col");

container.addEventListener("mousedown", startPainting);
container.addEventListener("mouseup", stopPainting);

function startPainting(e){
    e.preventDefault(); 
    for(i=0; i<pixels.length; i++){
        pixels[i].addEventListener('mousedown', paint);
        pixels[i].addEventListener('mouseenter', paint);
    }
}

function stopPainting(){
    for(i=0; i<pixels.length; i++){
        pixels[i].removeEventListener('mouseenter',paint);
    }}

function paint(e){
    //brushtool
    if(selectedBrushTool){
        if(selectedRandomColor == true)
            e.target.style =`background-color: ${randomColor}`;
        else
            e.target.style =`background-color: ${selectedBrushColor}`;
    }

    //eraserTool
    if(selectedEraserTool){
        e.target.style = `background-color: ${eraserColor}`;
    }
}

