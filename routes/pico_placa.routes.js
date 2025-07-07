const express = require('express');
const router = express.Router();
const PicoPlaca = require('../model/PicoPlaca');
const catchAsync = require('../utils/catchAsync');

// Obtener todas las restricciones de pico y placa
router.get('/', catchAsync(async (req, res) => {
  const data = await PicoPlaca.findAll();
  res.json({ success: true, data });
}));

// Obtener restricción por ID
router.get('/:id', catchAsync(async (req, res) => {
  const data = await PicoPlaca.getById(req.params.id);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, data });
}));

// Crear nueva restricción
router.post('/', catchAsync(async (req, res) => {
  const data = await PicoPlaca.create(req.body);
  res.status(201).json({ success: true, message: 'Creado exitosamente', data });
}));

// Actualizar restricción
router.put('/:id', catchAsync(async (req, res) => {
  const data = await PicoPlaca.update(req.params.id, req.body);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Actualizado exitosamente', data });
}));

// Eliminar restricción
router.delete('/:id', catchAsync(async (req, res) => {
  const eliminado = await PicoPlaca.delete(req.params.id);
  if (!eliminado) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Eliminado exitosamente' });
}));

module.exports = router;
