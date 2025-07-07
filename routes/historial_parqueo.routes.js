const express = require('express');
const router = express.Router();
const HistorialParqueo = require('../model/HistorialParqueo');
const catchAsync = require('../utils/catchAsync');

// Obtener todos los historiales
router.get('/', catchAsync(async (req, res) => {
  const data = await HistorialParqueo.findAll();
  res.json({ success: true, data });
}));

// Obtener historial por ID
router.get('/:id', catchAsync(async (req, res) => {
  const data = await HistorialParqueo.getById(req.params.id);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, data });
}));

// Crear nuevo historial
router.post('/', catchAsync(async (req, res) => {
  const data = await HistorialParqueo.create(req.body);
  res.status(201).json({ success: true, message: 'Creado exitosamente', data });
}));

// Actualizar historial
router.put('/:id', catchAsync(async (req, res) => {
  const data = await HistorialParqueo.update(req.params.id, req.body);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Actualizado exitosamente', data });
}));

// Eliminar historial
router.delete('/:id', catchAsync(async (req, res) => {
  const eliminado = await HistorialParqueo.delete(req.params.id);
  if (!eliminado) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Eliminado exitosamente' });
}));

module.exports = router;
