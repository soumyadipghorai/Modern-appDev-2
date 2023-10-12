let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let next = 1; 
let gState = 0; 

function i2c(i){
    return i == 1 ? 'x' : i == -1 ? 'o' : 'b';
}

function resetBoard(){
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    next = 1; 
    gState = 0; 
    updatePage();
}

function updatePage(){
    const e = document.getElementById("next"); 
    if (gState == 0){
        e.innerHTML = `<h1>Next move : <img src="assets/${i2c(next)}.png" alt=""></h1>`;
    }
    else if (gState == 1){
        e.innerHTML = `<h1>Yay! <img src="assets/x.png" alt=""> won</h1>`; 
        e.innerHTML += `<button onclick="resetBoard()">Play Again</button>`;
    }
    else if (gState == -1){
        e.innerHTML = `<h1>Yay! <img src="assets/o.png" alt=""> won</h1>`; 
        e.innerHTML += `<button onclick="resetBoard()">Play Again</button>`;
    }
    else{
        e.innerHTML = `<h1>That was a boring draw</h1>`; 
        e.innerHTML += `<button onclick="resetBoard()">Play Again</button>`;
    }

    for (const i in board){
        const e = document.getElementById("td" + i); 
        e.innerHTML =`<img src="assets/${i2c(board[i])}.png" onclick="updateEntry(${i})" alt="">`
    }
}

function checkState(){
    let patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for (p of patterns){
        const sum = p.reduce((a, i) => a + board[i], 0);

        if (sum == 3){
            return 1; 
        }
        else if (sum == -3) {
            return -1;
        }
    }

    for (i in board){
        if (board[i] == 0){
            return 0;
        }
    }
    return 2;
}

function updateEntry(x){
    if (gState == 0 && board[x] == 0){
        board[x] = next; 
        next = -next; 
        gState = checkState(); 
    }
    updatePage();
}

resetBoard();