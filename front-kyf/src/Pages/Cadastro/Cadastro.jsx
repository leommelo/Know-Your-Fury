import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './Cadastro.css'
import { Button } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { IMaskInput } from 'react-imask'
import { extractTextFromImage, validateRGData } from '../../Utils/ocr';
import { convertToGrayscale } from '../../Utils/imageUtils';
import SprayButton from '../../components/SprayButton/SprayButton'
import axios from 'axios';

const Cadastro = () => {
    const navigate = useNavigate();

    const [rgFrente, setRgFrente] = useState(null);
    const [rgVerso, setRgVerso] = useState(null);
    const [textoFrente, setTextoFrente] = useState('Frente do RG');
    const [textoVerso, setTextoVerso] = useState('Verso do RG');
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        data_nascimento: ''
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

        const textoFrente = await extractTextFromImage(rgFrente);
        const textoVerso = await extractTextFromImage(rgVerso);
        console.log("Texto do verso:", textoFrente)
        const textoCompleto = `${textoFrente} ${textoVerso}`;

        const formDataFormatado = {
            ...formData,
            data_nascimento: formatarData(formData.data_nascimento),
        };    

        if (validateRGData(textoCompleto, formData.cpf, formData.nome)) {
            alert("Documento válido! Prosseguir com o cadastro.");
            try{
                await saveUserData(formDataFormatado);
                navigate("/interesses")
            }catch(error){
                console.error("Erro ao salvar usuário:", error)
            }
            
        } else {
            alert("Não foi possível validar o RG. Verifique a imagem.");
        }
    };
    
    const saveUserData = async (userData) => {
        try{
            const response = await axios.post("http://localhost:3000/usuarios", userData);
            console.log("Usuário salvo com sucesso:", response.data);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

        } catch (error) {
            console.error("Erro ao salvar usuário:", error)
        }
    }

    const formatarData = (data) => {
        const [dia, mes, ano] = data.split('/');
        return `${ano}-${mes}-${dia}`;
    };

    return (
        <div className='cadastro-page'>
            <Header />
            <h1 className='title'>Know Your <span className="fury-fire">Fury</span></h1>
            <div className='cadastro-container'>
                <h2>Cadastro:</h2>
                <form className='cadastro-form'>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" placeholder='Nome' onChange={handleInputChange} />

                    <label htmlFor="cpf">CPF:</label>
                    <IMaskInput
                        mask="000.000.000-00"
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        onAccept={(value) => handleInputChange({ target: { name: 'cpf', value } })}
                    />

                    <label htmlFor="data_nascimento">Data de Nascimento:</label>
                    <IMaskInput
                        mask="00/00/0000"
                        id="data_nascimento"
                        name="data_nascimento"
                        type="text"
                        placeholder="DD/MM/AAAA"
                        onAccept={(value) => handleInputChange({ target: { name: 'data_nascimento', value } })}
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