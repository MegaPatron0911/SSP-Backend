const express = require('express');
const router = express.Router();
const AccesoSalida = require('../model/AccesoSalida');
const catchAsync = require('../utils/catchAsync');

// Obtener todos los accesos/salidas
router.get('/', catchAsync(async (req, res) => {
  const data = await AccesoSalida.findAll();
  res.json({ success: true, data });
}));

// Obtener acceso/salida por ID
router.get('/:id', catchAsync(async (req, res) => {
  const data = await AccesoSalida.getById(req.params.id);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, data });
}));

// Crear nuevo acceso/salida
router.post('/', catchAsync(async (req, res) => {
  const data = await AccesoSalida.create(req.body);
  res.status(201).json({ success: true, message: 'Creado exitosamente', data });
}));

// Actualizar acceso/salida
router.put('/:id', catchAsync(async (req, res) => {
  const data = await AccesoSalida.update(req.params.id, req.body);
  if (!data) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Actualizado exitosamente', data });
}));

// Eliminar acceso/salida
router.delete('/:id', catchAsync(async (req, res) => {
  const eliminado = await AccesoSalida.delete(req.params.id);
  if (!eliminado) {
    return res.status(404).json({ success: false, error: 'No encontrado' });
  }
  res.json({ success: true, message: 'Eliminado exitosamente' });
}));

module.exports = router;
