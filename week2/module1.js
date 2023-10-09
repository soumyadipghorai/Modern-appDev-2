export const c = 3000000000;

function sq(x){
    return x*x;
}

export function energy(m){
    return m*sq(c);
}

const speedOfLight = 299792458; 

function e(m){
    return m * sq(speedOfLight);
}

export {
    speedOfLight as val,
    e as energy_
};

export default function (m){
    return m * c * c;
}

export let x = 0; 
export function incx(){
    x++;
}
