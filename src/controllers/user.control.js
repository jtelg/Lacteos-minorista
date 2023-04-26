// import { getSession } from 'next-auth/react';
import { conexionDB } from '../config/db';

const ctrlUser = {
  VARIABLES_GET: async (_, res, resolve) => {
    const sql = `CALL SP_get_variables()`;
    APPLY_GET(sql, res, resolve);
  },
  SAVE_USER: async (req, res, resolve) => {
    const sql = `
        INSERT INTO
        usuario (
          role,
          nombre,
          pass,
          image,
          tipodoc,
          numdoc,
          telefono,
          email,
          fecregistro,
          recibe_oferta
        )
      VALUES
        (
          '${req.body.usuario.role}',
          '${req.body.usuario.nombre}',
          '${req.body.usuario.pass}',
          '${req.body.usuario.image}',
          '${req.body.usuario.tipodoc}',
          '${req.body.usuario.numdoc}',
          '${req.body.usuario.telefono}',
          '${req.body.usuario.email}',
          '${req.body.usuario.fecregistro}',
          '${req.body.usuario.recibe_oferta}'
        )
    `;
    const [result] = await conexionDB.query(sql);
    return res.status(200).json({
      nombre: result.nombre,
      email: result.email,
      id: result.insertId,
      role: result.role
    });
  },
  USUARIO_GET_LIST: async (_, res, resolve) => {
    const sql = `CALL SP_usuario_get_list()`;
    APPLY_GET(sql, res, resolve);
  },
  USUARIO_LOGIN: (req, res, resolve) => {
    const { usuario, password } = req.body;
    const sql = `CALL SP_usuario_login('${usuario}', '${password}')`;
    APPLY_GET(sql, res, resolve);
  },
  CATEGSVIEW_GET_COUNT: async (_, res, resolve) => {
    const sql = `CALL SP_categsview_get_counts()`;
    APPLY_GET(sql, res, resolve);
  },
  SP_variables_put: async (req, res, resolve) => {
    const sqlu = `UPDATE 
    variable
    set
      valor = '${req.body.valor}'
    WHERE 
    nombre = '${req.body.nombre}';`;

    try {
      const [result] = await conexionDB.query(sqlu);
      res.write(JSON.stringify(result));
      res.end();
      return;
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  }
};

export default ctrlUser;
const APPLY_GET = async (sql, res, resolve) => {
  try {
    const [result] = await conexionDB.query(sql);
    res.write(JSON.stringify(result[0]));
    res.end();
    // return;
  } catch (error) {
    console.error(error);
    res.status(500).end();
    return resolve();
  }
};
