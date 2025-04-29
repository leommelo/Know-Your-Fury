import React from 'react'
import Header from '../../components/Header/Header'
import './MainPage.css'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className='main-page'>
        <Header/>

        <h1 className='title'>Know Your <span className="fury-fire">Fury</span></h1>
        <h2>Mostre sua paixão pela FURIA e viva experiências únicas!</h2>
        <p>Cadastre-se, monte seu perfil de fã e desbloqueie sua carteirinha excluisiva.</p>
        <p>Eventos, brindes, surpresas e muito mais te esperam.</p>
        <h3>JUNTE-SE AOS FÃS QUE FAZEM PARTE DA NOSSA HISTÓRIA!</h3>
        <a href="">
          <button className='cadastro-button' onClick={() => navigate('/cadastro')}>
                Quero me cadastrar
            </button>
        </a>
    </div>
  )
}

export default MainPage