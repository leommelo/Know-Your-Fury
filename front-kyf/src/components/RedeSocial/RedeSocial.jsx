import React, { useState } from 'react'
import "./RedeSocial.css"
import Button from '@mui/material/Button';
import './RedeSocial.css'; // Importar arquivo CSS separado

const RedeSocial = ({icon: Icon, rede}) => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
    };

    return (
        <>
            <Button
                disabled={loading}
                loading={loading}
                variant='outlined'
                startIcon={<Icon />}
                color='white'
                size='large'
                onClick={handleClick}
                loadingPosition="end"
                sx={{
                    width: '50%',
                    justifyContent: 'space-between',
                    fontSize: "1rem",
                }}
                className="custom-loading-button" // Classe personalizada para facilitar seleção no CSS
            >
                {rede}
            </Button>
        </>
    )
}

export default RedeSocial