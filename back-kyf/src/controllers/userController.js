const db = require('../config/db');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Interesse = require('../models/Interesse');

exports.createUser = async (req, res) => {
  const { cpf, nome, data_nascimento } = req.body;

  try {
    const existingUser = await User.findByCpf(cpf);

    if (existingUser) {
      const token = jwt.sign({ cpf }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      const interesses = await Interesse.findByCpf(cpf);

      return res.status(200).json({
        message: 'Usuário já cadastrado',
        token,
        user: existingUser,
        interesses: interesses,
      });
    }

    await User.create(cpf, nome, data_nascimento);

    const token = jwt.sign({ cpf }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await User.findAll();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const cpf_usuario = req.user.cpf; 
    const user = await User.findByCpf(cpf_usuario);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};