import React, { useState } from "react";
import './Interesses.css'
import Header from '../../components/Header/Header'
import DragAndDropLista from '../../components/DragAndDropList/DragAndDropList'
import BlocoPergunta from "../../components/BlocoPergunta/BlocoPergunta";



const Interesses = () => {
    const [respostaEventos, setrespostaEventos] = useState(null);
    const [respostaProdutos, setRespostaProdutos] = useState(null);

    return (
        <div className='interesses-page'>
            <Header />
            <h1 className='title'>Know Your <span className="fury-fire">Fury</span></h1>
            <div className='interesses-container'>
                <h2>Interesses:</h2>
                <div className='interesses-forms'>
                    <p>Dê um rank para seus jogos favoritos</p>
                    <DragAndDropLista />
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
                </div>
            </div>
        </div>
    )
}

export default Interesses