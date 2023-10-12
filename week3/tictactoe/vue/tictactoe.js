Vue.component('tic', {
    props: ['pos'], //property
    template: `<span v-html = "imgl" v-on: click = "setVal(pos);"></span>`, 
    methods: {
        setVal() {
            this.$parent.setVal(this.pos); // parent is the vue app
        }
    }, 
    computed: {
        imgl: function(){
            return `<img src="src='assets/{this.$parent.v2c(this.$parent.board[this.pos])}.png" alt="">`;
        }
    }
})

var app = new Vue({
    el: '#app', 
    data: {
        board: [0, 0, 0, 0, 0, 0, 0, 0, 0], 
        next: 1,
    }, 
    methods: {
        v2c(r){
            return (r == 1) ? 'x' : (r == -1) ? 'o' : 'b';
        }, 
        setVal(i){
            if (this.result == 0){
                if (this.board[i] == 0){
                    // this.board[i] = this.next;
                    Vue.set(this.board, i, this.next);
                    this.next = -this.next;
                }
            }
        }
    }, 
    computed : {
        // data flow analysis 
        headmsg: function(){
            let msg = ""; 
            switch(this.result){
                case 0: msg = `<h1>Next Move: <img src="assets/${this.v2c(this.next)}.png" alt=""> </h1>`; break;
                case 1: msg = `<h1>Congratulations <img src="assets/x.png" alt=""> </h1>`; break;
                case -1: msg = `<h1>Congratulations <img src="assets/o.png" alt=""> </h1>`; break;
                case 2: msg = `<h1>Draw</h1>`; break;
                default: msg = "hello"; break;
            }
            return msg;
        }, 
        reuslt: function(){
            let pattern = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], 
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ]

            for (p of pattern){
                const sum = p.reduce((a, i) => a + this.board[i], 0);
                if (sum == 3){
                    return 1;
                }
                else if (sum == -3){
                    return -1;
                }
            }

            for (i in this.board){
                if (this.board[i] == 0) return 0; // still in progress 
            }
            return 2; // draw 
        }
    }
})