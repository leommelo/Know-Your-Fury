import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './Cadastro.css'
import { Button } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { IMaskInput } from 'react-imask'
import { extractTextFromImage, validateRGData } from '../../Utils/ocr';
import { convertToGrayscale } from '../../Utils/imageUtils';
import SprayButton from '../../components/SprayButton/SprayButton'

const Cadastro = () => {
    const [rgFrente, setRgFrente] = useState(null);
    const [rgVerso, setRgVerso] = useState(null);
    const [textoFrente, setTextoFrente] = useState('Frente do RG');
    const [textoVerso, setTextoVerso] = useState('Verso do RG');
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        nascimento: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rgFrente || !rgVerso) {
            alert("Envie frente e verso do RG!");
            return;
        }

        console.log("Dados do formulário:", formData);

        const rgFrentePB = await convertToGrayscale(rgFrente);
        const rgVersoPB = await convertToGrayscale(rgVerso);

        const textoFrente = await extractTextFromImage(rgFrentePB);
        const textoVerso = await extractTextFromImage(rgVersoPB);
        console.log("Texto do verso:", textoVerso)
        const textoCompleto = `${textoFrente} ${textoVerso}`;

        if (validateRGData(textoCompleto, formData.cpf, formData.name)) {
            alert("Documento válido! Prosseguir com o cadastro.");
            // aqui você pode enviar os dados para o backend
        } else {
            alert("Não foi possível validar o RG. Verifique a imagem.");
        }
    };


    return (
        <div className='cadastro-page'>
            <Header />
            <h1 className='title'>Know Your <span className="fury-fire">Fury</span></h1>
            <div className='cadastro-container'>
                <h2>Cadastro:</h2>
                <form className='cadastro-form'>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" name="name" placeholder='Nome' onChange={handleInputChange} />

                    <label htmlFor="cpf">CPF:</label>
                    <IMaskInput
                        mask="000.000.000-00"
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        onAccept={(value) => handleInputChange({ target: { name: 'cpf', value } })}
                    />

                    <label htmlFor="nascimento">Data de Nascimento:</label>
                    <IMaskInput
                        mask="00/00/0000"
                        id="nascimento"
                        name="nascimento"
                        type="text"
                        placeholder="DD/MM/AAAA"
                        onAccept={(value) => handleInputChange({ target: { name: 'nascimento', value } })}
                    />

                    <label>Documento:</label>
                    <div className="rg-buttons">
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<ImageIcon />}
                            sx={{ mr: 7, backgroundColor: '#FFFFFF', color: '#000' }}
                        >
                            {textoFrente}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    setRgFrente(file);
                                    setTextoFrente(file.name);
                                }}
                            />
                        </Button>

                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<ImageIcon />}
                            sx={{ backgroundColor: '#FFFFFF', color: '#000' }}
                        >
                            {textoVerso}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    setRgVerso(file);
                                    setTextoVerso(file.name);
                                }}
                            />

                        </Button>
                    </div>
                </form>
            </div>
            <div className='cadastro-button-container'>
                <SprayButton text={"Enviar"} onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default Cadastro