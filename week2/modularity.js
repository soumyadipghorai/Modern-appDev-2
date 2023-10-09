// import {c} from './module1.js'; 
// console.log(c);

import {c, energy} from './module1.js'; 
// we can't import sq as we haven't exported sq 
console.log(energy(10));

import {c as speedOfLight} from './module1.js'; 
console.log(speedOfLight);

import {val, energy_} from './module1.js';
console.log(val, energy_(10));

// export whatever is default from module1.js and name it something 
import something from './module1.js'; 
console.log(something(10));

// read-only-view of exported variables
import {x, incx} from './module1.js'; 
console.log(x); 
// ? x++; // although x was not const we can't update it here 
incx(); 
console.log(x);
incx(); 
console.log(x);