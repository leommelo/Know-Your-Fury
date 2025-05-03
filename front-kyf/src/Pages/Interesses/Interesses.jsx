import React, { useState } from "react";
import './Interesses.css'
import Header from '../../components/Header/Header'
import { Button } from '@mui/material'
import DragAndDropLista from '../../components/DragAndDropList/DragAndDropList'
import BlocoPergunta from "../../components/BlocoPergunta/BlocoPergunta";
import RedeSocial from "../../components/RedeSocial/RedeSocial";
import XIcon from '@mui/icons-material/X';
import ImageIcon from '@mui/icons-material/Image'
import SprayButton from "../../components/SprayButton/SprayButton"
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import { FaTwitch } from 'react-icons/fa';


const Interesses = () => {
    const [respostaEventos, setrespostaEventos] = useState(null);
    const [respostaProdutos, setRespostaProdutos] = useState(null);
    const [foto, setFoto] = useState(null);
    const [textoFoto, setTextoFoto] = useState('Sua foto');
    const [listaJogos, setListaJogos] = useState([]);

    

    return (
        <div className='interesses-page'>
            <Header />
            <h1 className='title'>Know Your <span className="fury-fire">Fury</span></h1>
            <div className='interesses-container'>
                <h2>Interesses:</h2>
                <div className='interesses-forms'>
                    <p>Dê um rank para seus jogos favoritos</p>
                    <DragAndDropLista onListaAtualizada={setListaJogos}/>
                    <BlocoPergunta
                        pergunta="Participou de eventos de E-sports?"
                        name="evento-esports"
                        resposta={respostaEventos}
                        setResposta={setrespostaEventos}
                        placeholder="Ex.: Final CBLOL 2024/2"
                    />

                    <BlocoPergunta
                        pergunta="Comprou produtos de E-sports nos últimos 5 anos?"
                        name="comprou-produtos"
                        resposta={respostaProdutos}
                        setResposta={setRespostaProdutos}
                        placeholder="Ex.: Camiseta FURIA CS2"
                    />
                    <p>Envie uma foto sua para sua carteirinha!</p>
                    <Button
                        variant="contained"
                        component="label"
                        size="larged"
                        startIcon={<ImageIcon />}
                        sx={{ backgroundColor: '#FFFFFF', color: '#000', ml: 8.5, mt: 1, height:50 }}
                    >
                        {textoFoto}
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                setFoto(file);
                                setTextoFoto(file.name);
                            }}
                        />

                    </Button>
                    <p>Conecte-se em suas redes!</p>
                    <div className="grid-redes">
                        <RedeSocial icon={FacebookIcon} rede={"Facebook"} />
                        <RedeSocial icon={XIcon} rede={"X"} />
                        <RedeSocial icon={YouTubeIcon} rede={"Youtube"} />
                        <RedeSocial icon={FaTwitch} rede={"Twitch"} />
                    </div>
                </div>
            </div>
            <SprayButton text={"Confirmar envio"} />
        </div>
    )
}

export default Interesses