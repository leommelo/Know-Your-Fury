import React, { forwardRef } from 'react';
import {
  Card, Typography, Avatar, Button, Box
} from '@mui/material';
import LogoFuria from '../../assets/LogoFuria.svg'

const Carteirinha = forwardRef(({ nome, score, foto }, ref) => {

  return (
    <>
      <Card
        ref={ref}
        sx={{
          width: 350,
          padding: 2,
          backgroundColor: '#000',
          border: '2px solid #444',
          textAlign: 'center',
          boxShadow: 6,
          borderRadius: 3,
          fontFamily: 'Roboto, sans-serif',
          color: '#fff',
          position: 'relative'
        }}
      >
        <img
          src={LogoFuria}
          alt="Logo FURIA"
          style={{ width: 60, position: 'absolute', top: 16, left: 16 }}
        />

        <Typography variant="h5" sx={{ color: '#F6FF00', mt: 2, fontFamily: 'Koulen' }} gutterBottom>
          CARTEIRINHA FURIA
        </Typography>

        <Avatar
          src={foto}
          alt={nome}
          sx={{ width: 100, height: 100, margin: '0 auto', mb: 2, border: '2px solid #F6FF00' }}
        />

        <Typography variant="body1" sx={{textAlign: "start", ml:2, fontFamily: 'Koulen'}}><strong>Nome:</strong> {nome}</Typography>
        <Typography variant="body1" sx={{textAlign: "start", ml:2, fontFamily: 'Koulen'}}><strong>Rank:</strong> {score}</Typography>
      </Card>
    </>
  );
});

export default Carteirinha;
