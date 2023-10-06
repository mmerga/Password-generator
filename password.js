import { upper, lower, number, simbol } from './characters.js';

function getUniqueChar (arr) {
    const index = Math.floor( Math.random() * arr.length );
    return arr[index]; 
}

export default function password ( {withUpper, withLower, withNumber, withSimbol, length} ) {
    if(length>=1){
        if(withUpper || withLower || withNumber || withSimbol ){
            let password = [];
            do{
                const index = Math.floor ( Math.random() * 4);
                if( withUpper && index === 0){
                    password.push( getUniqueChar(upper) );
                }
                else if( withLower && index === 1){
                    password.push( getUniqueChar(lower) );
                }
                else if( withNumber && index === 2){
                    password.push( getUniqueChar(number) );
                }
                else if( withSimbol && index === 3){
                    password.push( getUniqueChar(simbol) );
                }
            } while (password.length != length) 
            return password.join('');
        }
    }
    return 'Not possible'
}