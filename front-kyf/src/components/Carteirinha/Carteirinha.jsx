import React, { forwardRef } from 'react';
import {
  Card, Typography, Avatar, Box
} from '@mui/material';
import LogoFuria from '../../assets/LogoFuria.svg'

const Carteirinha = forwardRef(({ nome, score, foto, nasc, id }, ref) => {

  const getRank = (score) => {
    if (score > 80) return 'Diamante';
    if (score > 60) return 'Gold';
    if (score > 40) return 'Prata';
    return 'Bronze';
  };

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
        <Typography variant="body1" sx={{ position: 'absolute', top: 12, left: "85%", fontFamily: 'Koulen' }}><strong>ID:</strong> {id}</Typography>
        <Typography variant="h5" sx={{ color: '#F6FF00', mt: 2, fontFamily: 'Koulen' }} gutterBottom>
          Fury Pass
        </Typography>

        <Avatar
          src={`http://localhost:3000/${foto}`}
          alt={nome}
          sx={{ width: 100, height: 100, margin: '0 auto', mb: 2, border: '2px solid #F6FF00' }}
        />

        <Typography variant="body1" sx={{ textAlign: "start", ml: 2, fontFamily: 'Koulen' }}><strong>Nome:</strong> {nome}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, }}>
          <Typography variant="body1" sx={{ ml: 2, fontFamily: 'Koulen', mr: 13 }}><strong>Rank:</strong> {getRank(score)}</Typography>
          <Typography variant="body1" sx={{ ml: 2, fontFamily: 'Koulen' }}><strong>Nasc:</strong> {nasc}</Typography>
        </Box>

      </Card>
    </>
  );
});

export default Carteirinha;
