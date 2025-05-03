import React, { useRef } from 'react'
import './CarteirinhaPage.css'
import Carteirinha from '../../components/Carteirinha/Carteirinha'
import Header from '../../components/Header/Header'
import SprayButton from '../../components/SprayButton/SprayButton'
import html2canvas from 'html2canvas'

const CarteirinhaPage = () => {
  const carteirinhaRef = useRef();

  const handleDownload = async () => {
    const canvas = await html2canvas(carteirinhaRef.current);
    const dataURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'carteirinha-furia.png';
    link.click();
  };

  return (
    <div className='carteirinha-page'>
      <Header />
      <h1>Parabéns! Agora você é um fã real da FURIA!</h1>
      <h2>Baixe sua carteirinha:</h2>
      
      <Carteirinha ref={carteirinhaRef} />
      
      <SprayButton text={"Baixar Carteirinha"} onClick={handleDownload} />
    </div>
  )
}

export default CarteirinhaPage
