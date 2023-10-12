Vue.component('tic', {
    props: ['val'],
    template: `<div @click="$emit('click')" class="cell"><span>{{val}}</span></div>`
})

Vue.component('board', {
    data: function() {
        // component has its own data which is defined as a function
        return {
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            next: 1
        }
    },
    template: `
    <div class="boardtop">
        <span v-html="headmsg"></span>
        <div class="board">
            <div v-for="(n, i) in 9">
                <tic :val="v2c(board[i])" @click="update(i)"></tic>
            </div>
        </div>
    </div>
    `,
    methods: {
        v2c(r) {
            return (r == 1) ? 'X' : (r == -1) ? 'O' : '';
        },
        update(i) {
            if (this.result == 0) {
                if (this.board[i] == 0) {
                    Vue.set(this.board, i, this.next);
                    this.next = -this.next;
                }
            }
        }
    },
    computed: {
        headmsg: function() {
            let msg = "";
            switch(this.result) {
                case 0: msg = `<h1>Next move: ${this.v2c(this.next)}</h1>`; break;
                case 1: msg = `<h1>Congratulations X`; break;
                case -1: msg = `<h1>Congratulations O`; break;
                case 2: msg = `<h1>Boring draw!</h1>`; break;
                default: msg = "Hello?"; break;
            }
            return msg;
        },
        result: function() {
            let patts = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
            for (p of patts) {
                const sum = p.reduce((a, i) => a + this.board[i], 0);
                if (sum == 3) {
                    return 1;   // X won
                } else if (sum == -3) {
                    return -1;  // O won
                }
            }
            for (i in this.board) {
                if (this.board[i] == 0) return 0;    // Still in progress
            }
            return 2;   // Draw
        }
    }
})

var app = new Vue({
    el: '#app',
})

