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
    id: '',
  })

  const handleDownload = async () => {
    const canvas = await html2canvas(carteirinhaRef.current, {
      useCORS: true
    });

    const ctx = canvas.getContext('2d');
    const avatar = document.getElementById('avatar-furia');
    const avatarImg = new Image();
    avatarImg.crossOrigin = 'anonymous'; // necessário se a imagem ainda estiver externa
    avatarImg.src = avatar.src;

    avatarImg.onload = () => {
      // desenhe a imagem em cima do canvas no local correto (ajuste as coords conforme layout)
      ctx.drawImage(avatarImg, canvas.width / 2 - 50, 90, 100, 100); // exemplo

      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'carteirinha-furia.png';
      link.click();
    };

    avatarImg.onerror = () => {
      alert("Erro ao carregar imagem do avatar.");
    };
  };


  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://know-your-fury-production-6ce7.up.railway.app/usuarios/perfil', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const userData = response.data;

      if (userData.data_nascimento) {
        const data = new Date(userData.data_nascimento);
        userData.data_nascimento = new Intl.DateTimeFormat('pt-BR').format(data);
      }

      console.log(userData);

      setUser(userData);
    } catch (error) {
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

      <Carteirinha ref={carteirinhaRef} nome={user.nome} score={user.fandometro_score} nasc={user.data_nascimento} foto={user.foto_url} id={user.id} />

      <SprayButton text={"Baixar Carteirinha"} onClick={handleDownload} />
    </div>
  )
}

export default CarteirinhaPage
