import React, { useState } from "react";
import './Interesses.css'
import Header from '../../components/Header/Header'
import DragAndDropLista from '../../components/DragAndDropList/DragAndDropList'
import InputAdd from '../../components/InputAdd/InputAdd'


const Interesses = () => {
    const [resposta, setResposta] = useState(null);

    const handleChangeResposta = (e) => {
        setResposta(e.target.value);
    };

    return (
        <div className='interesses-page'>
            <Header />
            <h1 className='title'>Know Your <span className="fury-fire">Fury</span></h1>
            <div className='interesses-container'>
                <h2>Interesses:</h2>
                <div className='interesses-forms'>
                    <p>Quais jogos você mais acompanha?</p>
                    <DragAndDropLista />
                    <p>Participou de eventos de E-sports?</p>
                    <div className='interesses-radio'>
                        <input type="radio" id="sim" name="evento-esports" value="sim" onChange={handleChangeResposta}/>
                        <label htmlFor="sim">Sim</label>
                        <input type="radio" id="nao" name="evento-esports" value="nao" onChange={handleChangeResposta}/>
                        <label htmlFor="nao">Não</label>
                        {resposta === "sim" && <InputAdd />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interesses