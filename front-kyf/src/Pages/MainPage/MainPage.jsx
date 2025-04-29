import React from 'react'
import Header from '../../components/Header/Header'
import './MainPage.css'

const MainPage = () => {
  return (
    <div className='main-page'>
        <Header/>

        <h1>Know Your Fury</h1>
        <h2>Mostre sua paixão pela FURIA e viva experiências únicas!</h2>
        <p>Cadastre-se, monte seu perfil de fã e desbloqueie sua carteirinha excluisiva.</p>
        <p>Eventos, brindes, surpresas e muito mais te esperam.</p>
        <h3>JUNTE-SE AOS FÃS QUE FAZEM PARTE DA NOSSA HISTÓRIA!</h3>
        <a href="">
            <button>
                Quero me cadastrar
            </button>
        </a>
    </div>
  )
}

export default MainPage