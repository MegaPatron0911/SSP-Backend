const express = require('express');
const router = express.Router();
const Celda = require('../model/Celda');
const catchAsync = require('../utils/catchAsync');

// Obtener todas las celdas
router.get('/', catchAsync(async (req, res) => {
  const data = await Celda.findAll();
  res.json({ success: true, data });
}));

// Obtener celda por ID
router.get('/:id', catchAsync(async (req, res) => {
  const data = await Celda.getById(req.params.id);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, data });
}));

// Crear nueva celda
router.post('/', catchAsync(async (req, res) => {
  const data = await Celda.create(req.body);
  res.status(201).json({ success: true, message: 'Creado exitosamente', data });
}));

// Actualizar celda
router.put('/:id', catchAsync(async (req, res) => {
  const data = await Celda.update(req.params.id, req.body);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Actualizado exitosamente', data });
}));

// Eliminar celda
router.delete('/:id', catchAsync(async (req, res) => {
  const eliminado = await Celda.delete(req.params.id);
  if (!eliminado) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Eliminado exitosamente' });
}));

module.exports = router;
