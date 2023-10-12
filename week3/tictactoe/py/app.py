from flask import Flask, render_template, redirect 

# application state 
BOARD = [0] * 9                 # 1D representation of board 
NEXT = 1                        # 1 = X, -1 = 0

app = Flask(
    __name__, 
    static_folder = 'assets',
    template_folder = 'templates'
)

@app.route('/')
def homepage() : 
    return render_template('tic.html', board = BOARD, next = NEXT)

def checkstate(board) : 
    patterns = [
        (0, 1, 2), (3, 4, 5), (6, 7, 8), 
        (0, 3, 6), (1, 4, 7), (2, 5, 8),
        (0, 4, 8), (2, 4, 6)
    ]

    for p in patterns : 
        t = sum(board[x] for x in p)
        if t == 3 : 
            return 1            # X has won the game
        elif t == -3 :  
            return -1           # 0 has won the game 

        r = 0 
        for i in board : 
            if i == 0 : 
                return 0        # game still in progress
        return 2                # draw 

@app.route('/set/<int:i>') 
def setvalue(i) : 
    global BOARD, NEXT          # might change the global values by mistake  
    BOARD[i] = NEXT 
    NEXT = -NEXT 
    r = checkstate(BOARD)
    if r == 0 : 
        return redirect('/')
    else : 
        return render_template("end.html", winner = 3, board = BOARD, next = NEXT) 


@app.route('/new') 
def newgame() : 
    global BOARD, NEXT 
    BOARD = [0] * 9 
    NEXT = 1 
    return redirect('/') 


if __name__ == '__main__' :
    app.run()
