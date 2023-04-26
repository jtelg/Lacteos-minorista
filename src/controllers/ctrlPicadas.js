import { conexionDB } from '../config/db';

const ctrlPicadas = {
  PICADAS_ADD: async (req, res, resolve) => {
    const sqlIns = `INSERT INTO picadas(
            nombre,
            ingredientes,
            precioxpers,
            visible,
            eliminado
          ) VALUES(
            '${req.body.nombre}',
            '${req.body.ingredientes}',
            '${req.body.precioxpers}',
            '0',
            '0'
          )`;
    try {
      const [result] = await conexionDB.query(sqlIns);

      return res.status(200).json({
        idpicada: result.insertId
      });
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  PICADAS_GET_LIST: async (req, res, resolve) => {
    const sql = 'CALL SP_get_picadas()';
    try {
      const [result] = await conexionDB.query(sql);
      if (!result) {
        res.write(JSON.stringify([]));
        return res.end();
      }

      res.write(JSON.stringify(result[0]));
      return res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  PICADA_GET_XID: async (req, res, resolve) => {
    const sql = `CALL SP_picada_get_xid('${req.query.id}')`;
    try {
      const [result] = await conexionDB.query(sql);
      const dataprod = result[0];
      if (!dataprod) {
        res.write(JSON.stringify([]));
        return res.end();
      }
      if (dataprod.arrcolor) {
        dataprod.arrcolor = JSON.parse(dataprod.arrcolor);
        for (const color of dataprod.arrcolor) {
          if (color.arrmedidas) {
            color.arrmedidas = JSON.parse(color.arrmedidas);
            color.medida = color.arrmedidas.map((e) => e.valor).join(', ');
          }
        }
      } else {
        dataprod.arrcolor = [];
      }
      if (dataprod.arrmedidasIndiv) {
        dataprod.arrmedidasIndiv = JSON.parse(dataprod.arrmedidasIndiv);
      } else {
        dataprod.arrmedidasIndiv = [];
      }
      // switch (dataprod.typeCatalog) {
      //   case 0:
      //     dataprod.arrimagesIndiv = await APIConsultas.Images.SET_IMAGE(dataprod);
      //     break;
      //   case 1:
      //     dataprod = await APIConsultas.Images.SET_ARRCOLOR(dataprod);
      //     break;
      // }

      res.write(JSON.stringify(dataprod));
      return res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  PICADA_UPDATE: async (req, res, resolve) => {
    const idpicada = req.query.id;
    const campo = req.body.campo;
    const valor = req.body.valor;
    const sql = `UPDATE picadas SET ${campo} = '${valor}' WHERE idpicada = ${idpicada}`;
    APPLY_GET(sql, res, resolve);
  }
};

const APPLY_GET = async (sql, res, resolve) => {
  try {
    const [result] = await conexionDB.query(sql);
    res.write(JSON.stringify(result));
    res.end();
    return;
  } catch (error) {
    console.error(error);
    res.status(500).end();
    return resolve();
  }
};
export default ctrlPicadas;
