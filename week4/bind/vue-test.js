let app = new Vue({
    el : "#app", // connect with the app
    data : {
        message : "Hello", 
        fsize : "42px", 
        msg2 : "dummy"
    }, 
    methods : {
        updateMsg(){
            this.message = "Back to square one"; // sets the message to this 
        }
    }, 
    computed : {
        myFontSize : function(){
            return `${this.message.length + 10}px`; // the shorter the message the smaller the size 
            // any time message changes the function will update 
        }
    }, 
    watch: {
        // message : function(nmsg){
        //     this.msg2 = `New: ${nmsg}`;
        // }, 
        message : function(omsg, nmsg){
            this.msg2 = `old : ${nmsg}, New ${omsg}`;
            // prev msg and curr msg 
        }
    }
})