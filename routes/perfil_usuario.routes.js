const express = require('express');
const router = express.Router();
const PerfilUsuario = require('../model/PerfilUsuario');
const catchAsync = require('../utils/catchAsync');

// Obtener todos los perfiles de usuario
router.get('/', catchAsync(async (req, res) => {
  const data = await PerfilUsuario.findAll();
  res.json({ success: true, data });
}));

// Obtener perfil por ID
router.get('/:id', catchAsync(async (req, res) => {
  const data = await PerfilUsuario.getById(req.params.id);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, data });
}));

// Crear nuevo perfil
router.post('/', catchAsync(async (req, res) => {
  const data = await PerfilUsuario.create(req.body);
  res.status(201).json({ success: true, message: 'Creado exitosamente', data });
}));

// Actualizar perfil
router.put('/:id', catchAsync(async (req, res) => {
  const data = await PerfilUsuario.update(req.params.id, req.body);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Actualizado exitosamente', data });
}));

// Eliminar perfil
router.delete('/:id', catchAsync(async (req, res) => {
  const eliminado = await PerfilUsuario.delete(req.params.id);
  if (!eliminado) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Eliminado exitosamente' });
}));

module.exports = router;
