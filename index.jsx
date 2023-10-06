import React from 'react';
import ReactDOM from "react-dom/client";
import password from './password.js';

const initObj = {
    withUpper: true, 
    withLower: true, 
    withNumber: true, 
    withSimbol: true, 
    length: 15
}

function App () {
    const [displayOne, setDisplayOne] = React.useState(password(initObj));
    const [displayTwo, setDisplayTwo] = React.useState(password(initObj));
    const [displayThree, setDisplayThree] = React.useState(password(initObj));
    const [displayFour, setDisplayFour] = React.useState(password(initObj));
    const [uppercase, setUppercase] = React.useState(true);
    const [lowercase, setLowercase] = React.useState(true);
    const [number, setNumber] = React.useState(true);
    const [symbol, setSymbol] = React.useState(true);
    const [length, setLength] = React.useState(initObj.length);

    const handleGetPasswords = () => {
        const newPassword = {
            withUpper: uppercase, 
            withLower: lowercase, 
            withNumber: number, 
            withSimbol: symbol, 
            length: length
        }
        setDisplayOne(password(newPassword));
        setDisplayTwo(password(newPassword));
        setDisplayThree(password(newPassword));
        setDisplayFour(password(newPassword));
    }

    const handleLength = (event) => {
        const value = document.getElementById(event.target.id).value;
        setLength(prevState => value <= 0 ? prevState : value);
    }

    const handleCheckbox = (event) => {
        let id = document.getElementById(event.target.id);
        id = id.id;
        if(id === 'uppercase'){
            setUppercase(prevState => !prevState);
        }else if( id === 'lowercase'){
            setLowercase(prevState => !prevState);
        }else if(id === 'number'){
            setNumber(prevState => !prevState);
        }else if(id === 'symbol'){
            setSymbol(prevState => !prevState);
        }
    }

    const handleClickPassword = (event) => {
        navigator.clipboard.writeText(event.target.innerText);
    }

    return (
        <>
            <p className='bold'><span className='white margin'>Generate a </span><span>random password</span></p>
            <p className='white'>Never use a insecure password again.</p>
            <Choose handleCheckbox={handleCheckbox} handleLength={handleLength} handleGetPasswords={handleGetPasswords} uppercase={uppercase} lowercase={lowercase} number={number} symbol={symbol} length={length} />
            <div id="passwords">
                <Display pass={displayOne} id={0} handleClickPassword={handleClickPassword} />
                <Display pass={displayTwo} id={1} handleClickPassword={handleClickPassword}/>
                <Display pass={displayThree} id={2} handleClickPassword={handleClickPassword}/>
                <Display pass={displayFour} id={3} handleClickPassword={handleClickPassword}/>
            </div>
        </>
    );
}

function Choose ({handleCheckbox, handleLength, handleGetPasswords, uppercase, lowercase, number, symbol, length}) {
    return (
        <>
            <fieldset className='white'>
                <legend>Choose what you want in your passwords</legend>
                <div className='choose-type'>
                    <div className="type">
                        <input type="checkbox" id="uppercase" onChange={(event) => handleCheckbox(event)} checked={uppercase}></input>
                        <label htmlFor="uppercase">Capital Letters</label>
                    </div>
                    <div className="type">
                        <input type="checkbox" id="lowercase" onChange={(event) => handleCheckbox(event)} checked={lowercase}></input>
                        <label htmlFor="lowercase">Small Letters</label>
                    </div>
                    <div className="type">
                        <input type="checkbox" id="number" onChange={(event) => handleCheckbox(event)} checked={number}></input>
                        <label htmlFor="number">Numbers</label>
                    </div>
                    <div className="type">
                        <input type="checkbox" id="symbol" onChange={(event) => handleCheckbox(event)} checked={symbol}></input>
                        <label htmlFor="symbol">Symbols</label>
                    </div>
                </div>
                <div className='length type'>
                    <input type="number" id="length" value={length} onChange={(event) => handleLength(event)}></input>
                    <label htmlFor="length">Password Length</label>
                </div>
            </fieldset>
            <button className='type' id="get-passwords" onClick={handleGetPasswords}>Generate passwords</button>
        </>
    )
}

function Display ({pass, id, handleClickPassword}) {
    return (
        <div className="password">
            <span id={id} onClick={(event) => handleClickPassword(event)} >{pass}</span>
        </div>
    );
}

/* Only run when page is full loaded */
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />); 
});