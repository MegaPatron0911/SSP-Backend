// Rutas de API para la clase Usuario
const express = require('express');
const router = express.Router();
const { Usuario } = require('../model');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const path = require('path');

// Configuración de multer para guardar archivos en /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Obtener todos los usuarios
router.get('/', catchAsync(async (req, res) => {
  const data = await Usuario.findAll();
  res.json({ success: true, data: data.map(u => u.toJSON()) });
}));

// Obtener usuario por ID
router.get('/:id', catchAsync(async (req, res) => {
  const usuario = new Usuario();
  const encontrado = await usuario.findById(req.params.id);
  if (encontrado) {
    res.json({ success: true, data: encontrado.toJSON() });
  } else {
    res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
}));

// Obtener usuario por número de documento
router.get('/documento/:numero', catchAsync(async (req, res) => {
  const usuario = new Usuario();
  const encontrado = await usuario.findByDocument(req.params.numero);
  if (encontrado) {
    res.json({ success: true, data: encontrado.toJSON() });
  } else {
    res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
}));

// Crear un nuevo usuario (con foto de perfil)
router.post('/', upload.single('foto_perfil'), catchAsync(async (req, res) => {
  const datos = req.body;
  let fotoPerfilPath = null;
  if (req.file) {
    fotoPerfilPath = '/uploads/' + req.file.filename;
  }
  const usuario = new Usuario(
    null,
    datos.tipo_documento,
    datos.numero_documento,
    datos.primer_nombre,
    datos.segundo_nombre,
    datos.primer_apellido,
    datos.segundo_apellido,
    datos.direccion_correo,
    datos.numero_celular,
    fotoPerfilPath,
    datos.estado || 'activo',
    datos.clave,
    null
  );
  await usuario.create();
  res.status(201).json({ success: true, message: 'Usuario creado exitosamente', data: usuario.toJSON() });
}));

// Actualizar usuario por ID
router.put('/:id', catchAsync(async (req, res) => {
  const usuario = new Usuario();
  const encontrado = await usuario.findById(req.params.id);
  if (!encontrado) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  Object.assign(encontrado, req.body);
  await encontrado.update();
  res.json({ success: true, message: 'Usuario actualizado exitosamente', data: encontrado.toJSON() });
}));

// Eliminar usuario por ID
router.delete('/:id', catchAsync(async (req, res) => {
  const usuario = new Usuario();
  const encontrado = await usuario.findById(req.params.id);
  if (!encontrado) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  await encontrado.delete();
  res.json({ success: true, message: 'Usuario eliminado exitosamente' });
}));

module.exports = router;
