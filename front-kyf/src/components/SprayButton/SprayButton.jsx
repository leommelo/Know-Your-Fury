import React from 'react'
import './SprayButton.css'

const SprayButton = ({text, onClick}) => {
    return (
        <>
            <button className='spray-button' onClick={onClick}>
                <span className="spray-button-text">{text}</span>
            </button>
        </>
    )
}

export default SprayButton