// should have both server side and client side validation because 
// someone might try to remove the js code and then run 
function validate(event){
    const v = document.getElementById("email").value; 
    if (v.indexOf("@") == -1){
        // stop the submit event 
        event.preventDefault(); 
        alert("enter valid email"); 
        return false;
    }
    return true;
}

function showThanks(article, response){
    var div = document.createElement('div');
    div.class = "message";
    div.innerHTML = "thank you for liking";
    article.parentNode.appendChild(div)
}

function sendLike(event){
    const article = event.target;
    const articleID = article.dataset.article_id;
    
    fetch('/article_like/'+articleID).then(
        response => console.log(showThanks(article, response)).catch(err => console.log(err))
    )
}

function initialize(){
    const likeButtons = document.querySelectorAll(".rating-icon");
    for (const button of likeButtons){
        button.onclick = sendLike;
    }
}