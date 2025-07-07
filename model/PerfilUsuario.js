const supabase = require('../supabaseClient');

class PerfilUsuario {
  constructor(
    id = null,
    perfil = null,
  ) {
    this._id = id;
    this._perfil = perfil;
  }

  get id() { return this._id; }
  get perfil() { return this._perfil; }

  set id(value) { this._id = value; }
  set perfil(value) { this._perfil = value; }

  static async create(body) {
    const insertObj = {
      perfil: body.perfil
    };
    const { data, error } = await supabase.from('perfil_usuario').insert([insertObj]).select().single();
    if (error) throw new Error(`Error creating PerfilUsuario: ${error.message}`);
    const perfil = new PerfilUsuario();
    perfil._mapRowToObject(data);
    return perfil.toJSON();
  }

  async findById(id) {
    const { data, error } = await supabase.from('perfil_usuario').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Error finding PerfilUsuario: ${error.message}`);
    }
    if (data) {
      this._mapRowToObject(data);
      return this;
    }
    return null;
  }

  static async findAll() {
    const { data, error } = await supabase.from('perfil_usuario').select('*');
    if (error) throw new Error(`Error finding all PerfilUsuario: ${error.message}`);
    return (data || []).map(row => {
      const perfil = new PerfilUsuario();
      perfil._mapRowToObject(row);
      return perfil;
    });
  }

  static async update(id, body) {
    const updateObj = {
      perfil: body.perfil
    };
    const { error } = await supabase.from('perfil_usuario').update(updateObj).eq('id', id);
    if (error) throw new Error(`Error updating PerfilUsuario: ${error.message}`);
    return true;
  }

  static async delete(id) {
    const { error } = await supabase.from('perfil_usuario').delete().eq('id', id);
    if (error) throw new Error(`Error deleting PerfilUsuario: ${error.message}`);
    return true;
  }

  _mapRowToObject(row) {
    this._id = row.id;
    this._perfil = row.perfil;
  }

  toJSON() {
    return {
      id: this._id,
      perfil: this._perfil,
    };
  }
}

module.exports = PerfilUsuario;