let rows = 30
let cols = 30
let isRunning = false
let grid = new Array(rows)
let timer
const initializeGrids = ()=>{
    for(let i=0;i<rows;i++){
        grid[i] = new Array(cols)
    }
}
const initializeZeros = ()=>{
    console.log("enetered initixalize zeros")
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            grid[i][j] = 0
        }
    }
}
console.log(grid);
const randomButtonHandler=() =>{
    
    if (isRunning) return;
    console.log("entered random")
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var isLive = Math.round(Math.random());
            if (isLive == 1) {
                var cell = document.getElementById(i + "_" + j);
                cell.setAttribute("class", "live");
                grid[i][j] = 1;
            }
        }
    }
}
const clearTable = ()=>{
    isRunning = false
    clearTimeout(timer)
    let aliveCells = document.getElementsByClassName("live")
    console.log(aliveCells)
    let cells = [];
    for (let i = 0; i < aliveCells.length; i++) {
        cells.push(aliveCells[i]);
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].setAttribute("class", "dead");
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }
}
const createTable = ()=>{
    let gridContainer = document.getElementById('grid')
    let table = document.createElement("table")

    for(let i=0;i<rows;i++){
        let tr = document.createElement("tr")
        for(let j=0;j<cols;j++){
            let cell = document.createElement("td")
            cell.setAttribute("id",i +"_"+ j)
            cell.setAttribute("class","dead")
            tr.appendChild(cell)
        }
        table.appendChild(tr)
    }
    gridContainer.appendChild(table)
}
const clickstart = ()=>{
    let startButton = document.getElementById("start")
    startButton.onclick = play
}
const play = ()=>{
    isRunning = true
    console.log("entered in play")
    computeNextGen()
    if(isRunning){
        timer = setTimeout(play, 100);
    }
}
const computeNextGen = ()=>{
    console.log("entered in computenextgen")
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let aliveNeighbours = countNeighbors(i,j)
            if (grid[i][j] == 1) {
                if (aliveNeighbours < 2) {
                    grid[i][j] = 0;
                } else if (aliveNeighbours == 2 || aliveNeighbours == 3) {
                    grid[i][j] = 1;
                } else if (aliveNeighbours > 3) {
                    grid[i][j] = 0;
                }
            } else if (grid[i][j] == 0) {
                    if (aliveNeighbours == 3) {
                        grid[i][j] = 1;
                    }
            }
        }
    }

    updateTable()
}
const updateTable= () =>{
    console.log("entered in update table")
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var cell = document.getElementById(i + "_" + j);
                if (grid[i][j] == 0) {
                    cell.setAttribute("class", "dead");
                } else {
                    cell.setAttribute("class", "live");
                }
            }
        }
    }

const countNeighbors = (row,col)=>{
    console.log(row,col)
    console.log("entered in count neighbors")
    let count = 0;
    if (row-1 >= 0) {
        if (grid[row-1][col] == 1) count++;
    }
    if (row-1 >= 0 && col-1 >= 0) {
        if (grid[row-1][col-1] == 1) count++;
    }
    if (row-1 >= 0 && col+1 < cols) {
        if (grid[row-1][col+1] == 1) count++;
    }
    if (col-1 >= 0) {
        if (grid[row][col-1] == 1) count++;
    }
    if (col+1 < cols) {
        if (grid[row][col+1] == 1) count++;
    }
    if (row+1 < rows) {
        if (grid[row+1][col] == 1) count++;
    }
    if (row+1 < rows && col-1 >= 0) {
        if (grid[row+1][col-1] == 1) count++;
    }
    if (row+1 < rows && col+1 < cols) {
        if (grid[row+1][col+1] == 1) count++;
    }
    return count;
}
const stopgame = ()=>{
    isRunning = false
    clearTimeout(timer)
}
createTable()
initializeGrids()
initializeZeros()
clickstart()
let stopButton = document.getElementById("stop")
let randomButton = document.getElementById("random")
let clearButton = document.getElementById("clear")
randomButton.onclick = randomButtonHandler
stopButton.onclick = stopgame
clearButton.onclick = clearTable
