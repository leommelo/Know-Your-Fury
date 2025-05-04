import React from 'react'
import './SprayButton.css'
import CircularProgress from '@mui/material/CircularProgress'

const SprayButton = ({ text, onClick, isLoading = false, loadingColor = '#000000' }) => {
    return (
        <>
            <button className='spray-button' onClick={onClick}>
                <span className="spray-button-text">
                    {isLoading ? (
                        <div className="loading-container">
                            <CircularProgress
                                size={24}
                                color="inherit"
                                style={{ color: loadingColor }}
                            />
                        </div>
                    ) : (
                        text
                    )}
                </span>
            </button>
        </>
    )
}

export default SprayButton