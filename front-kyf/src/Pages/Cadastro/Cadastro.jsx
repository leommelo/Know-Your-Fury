import React from 'react'
import Header from '../../components/Header/Header'
import './Cadastro.css'

import { Button } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { IMaskInput } from 'react-imask'

const Cadastro = () => {
    return (
        <div className='cadastro-page'>
            <Header />
            <h1 className='title'>Know Your <span className="fury-fire">Fury</span></h1>
            <div className='cadastro-container'>
                <h2>Cadastro:</h2>
                <form className='cadastro-form'>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" name="name" placeholder='Nome'/>

                    <label htmlFor="cpf">CPF:</label>
                    <IMaskInput
                        mask="000.000.000-00"
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                    />

                    <label htmlFor="nascimento">Data de Nascimento:</label>
                    <IMaskInput
                        mask="00/00/0000"
                        id="nascimento"
                        name="nascimento"
                        type="text"
                        placeholder="DD/MM/AAAA"
                    />

                    <label>Documento:</label>
                    <div className="rg-buttons">
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<ImageIcon />}
                            sx={{ mr: 7, backgroundColor: '#FFFFFF', color: '#000' }}
                        >
                            Frente do RG
                            <input type="file" hidden accept="image/*" />
                        </Button>

                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<ImageIcon />}
                            sx={{ backgroundColor: '#FFFFFF', color: '#000' }}
                        >
                            Verso do RG
                            <input type="file" hidden accept="image/*" />
                        </Button>
                    </div>

                    <button type="submit" >Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Cadastro