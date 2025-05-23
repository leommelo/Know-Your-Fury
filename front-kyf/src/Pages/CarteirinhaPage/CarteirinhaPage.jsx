import React, { useRef, useState, useEffect, use } from 'react'
import './CarteirinhaPage.css'
import Carteirinha from '../../components/Carteirinha/Carteirinha'
import Header from '../../components/Header/Header'
import SprayButton from '../../components/SprayButton/SprayButton'
import html2canvas from 'html2canvas'
import axios from 'axios'


const CarteirinhaPage = () => {
  const carteirinhaRef = useRef();

  const [user, setUser] = useState({
    cpf: '',
    nome: '',
    data_nascimento: '',
    fandometro_score: 0,
    foto_url: '',
    id:'',
  })

  const handleDownload = async () => {
    const canvas = await html2canvas(carteirinhaRef.current);
    const dataURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'carteirinha-furia.png';
    link.click();
  };

  const fetchUserData = async () => {
    try{
      const response = await axios.get('https://know-your-fury-production-6ce7.up.railway.app/usuarios/perfil',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const userData = response.data;

      if (userData.data_nascimento) {
        const dataApenas = userData.data_nascimento.split('T')[0]; // "2002-11-20"
        const [ano, mes, dia] = dataApenas.split('-');
        userData.data_nascimento = `${dia}/${mes}/${ano}`; // "20/11/2002"
      }

      console.log(userData);
    
      setUser(userData);
    }catch(error){
      console.error('Erro ao buscar dados do usuário:', error);
    }
  }

  useEffect(() => {
    fetchUserData()
    
  }, [])

  return (
    <div className='carteirinha-page'>
      <Header />
      <h1>Parabéns! Agora você é um fã real da FURIA!</h1>
      <h2>Baixe sua carteirinha:</h2>
      
      <Carteirinha ref={carteirinhaRef} nome={user.nome} score={user.fandometro_score} nasc={user.data_nascimento} foto={user.foto_url} id={user.id}/>
      
      <SprayButton text={"Baixar Carteirinha"} onClick={handleDownload} />
    </div>
  )
}

export default CarteirinhaPage
