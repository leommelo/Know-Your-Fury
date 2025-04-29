import React from 'react'
import Torcida from '../../../public/torcida.png'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <img src={Torcida} alt="Foto da torcida da FURIA" />
    </div>
  )
}

export default Header