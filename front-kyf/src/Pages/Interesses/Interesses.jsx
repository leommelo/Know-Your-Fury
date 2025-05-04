import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const LISTA_PADRAO_JOGOS = [
    { id: "1", nome: "League of Legends" },
    { id: "2", nome: "Valorant" },
    { id: "3", nome: "CS2" },
    { id: "4", nome: "Rocket League" },
    { id: "5", nome: "Rainbow Six" },
];


const Interesses = () => {
    const navigate = useNavigate();

    const [respostaEventos, setrespostaEventos] = useState(null);
    const [respostaProdutos, setRespostaProdutos] = useState(null);
    const [foto, setFoto] = useState(null);
    const [textoFoto, setTextoFoto] = useState('Sua foto');
    const [listaJogos, setListaJogos] = useState(LISTA_PADRAO_JOGOS);
    const [eventosInputs, setEventosInputs] = useState([{ id: 1, value: '' }]);
    const [produtosInputs, setProdutosInputs] = useState([{ id: 1, value: '' }]);



    const fetchInteresses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/interesses', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data)

            const { jogos, eventos, compras } = response.data;

            if (jogos) {
                const ordemRecebida = jogos.split(',');
                const novaOrdem = ordemRecebida.map(nomeRecebido => 
                    listaJogos.find(jogo => jogo.nome === nomeRecebido)
                ).filter(Boolean); // remove qualquer "undefined"
                setListaJogos(novaOrdem);
            }
            

            if (eventos) {
                setrespostaEventos("sim");
                setEventosInputs(
                    eventos.split(',').map((value, index) => ({ id: index + 1, value }))
                );
            }

            if (compras) {
                setRespostaProdutos("sim");
                setProdutosInputs(
                    compras.split(',').map((value, index) => ({ id: index + 1, value }))
                );
            }

        } catch (error) {
            console.error("Erro ao buscar interesses:", error)
        }
    }


    const saveInteresses = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/social/fandometro', formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao salvar interesses:", error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            jogos: listaJogos.map(j => j.nome).join(','),
            eventos: eventosInputs.map(e => e.value).join(','),
            compras: produtosInputs.map(p => p.value).join(','),
            textos: ["amo a furia", "furia top 1", "fui demitido, to furioso hoje"]
        };
        console.log(formData)

        await saveInteresses(formData);
        navigate("/carteirinha")
    }

    useEffect(() => {
        fetchInteresses();

    }, []);



    return (
        <div className='interesses-page'>
            <Header />
            <h1 className='title'>Know Your <span className="fury-fire">Fury</span></h1>
            <div className='interesses-container'>
                <h2>Interesses:</h2>
                <div className='interesses-forms'>
                    <p>Dê um rank para seus jogos favoritos:</p>
                    <DragAndDropLista onListaAtualizada={setListaJogos} jogos={listaJogos}/>
                    <BlocoPergunta
                        pergunta="Participou de eventos de E-sports?"
                        name="evento-esports"
                        resposta={respostaEventos}
                        setResposta={setrespostaEventos}
                        placeholder="Ex.: Final CBLOL 2024/2"
                        inputs={eventosInputs}
                        setInputs={setEventosInputs}
                    />

                    <BlocoPergunta
                        pergunta="Comprou produtos de E-sports nos últimos 5 anos?"
                        name="comprou-produtos"
                        resposta={respostaProdutos}
                        setResposta={setRespostaProdutos}
                        placeholder="Ex.: Camiseta FURIA CS2"
                        inputs={produtosInputs}
                        setInputs={setProdutosInputs}
                    />

                    <p>Envie uma foto sua para sua carteirinha!</p>
                    <Button
                        variant="contained"
                        component="label"
                        size="larged"
                        startIcon={<ImageIcon />}
                        sx={{ backgroundColor: '#FFFFFF', color: '#000', ml: 8.5, mt: 1, height: 50 }}
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
            <SprayButton text={"Confirmar envio"} onClick={handleSubmit} />
        </div>
    )
}

export default Interesses