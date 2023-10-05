/*
 * document is a global variable in js, its of type document 
 */
// const d1 = document.getElementById("d1");
// console.log(d1);
// d1.innerHTML = 'welcome to d1';

// const d2 = document.getElementById("d2"); 
// console.log(d2);
// d2.innerHTML = "in d2";

// async function demo(){
//     console.log("just starting");

//     await new Promise(r => setTimeout(r, 2000)); // waits for 2 sec  
//     const d3 = document.getElementById("d1");
//     d3.innerHTML = 'in d1';
//     console.log("after 2 seconds");
    
//     await new Promise(r => setTimeout(r, 2000)); 
//     const d4 = document.getElementById("d2");
//     d4.innerHTML = 'in d2';
//     console.log("after 4 seconds");
// }
// demo();

// increment the size of text by clicking 
let counter = 0; 
const d5 = document.getElementById('d1'); 
// console.log(d5);
d5.innerHTML = `click count : ${counter}`;
d5.addEventListener('click', e => {
    counter++; 
    d5.innerHTML = `click count: ${counter}`;
    d5.style.fontSize = `${counter+10}px`;
})