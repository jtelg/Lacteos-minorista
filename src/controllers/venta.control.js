import { conexionDB } from "../config/db";
const ctrlVenta = {
  VENTA_ADD: async (req, res, resolve) => {
    await conexionDB.query("SET time_zone = '-03:00';");
    const sql = `INSERT INTO
          venta (
            iduser,
            CP,
            destino_calle,
            destino_nro,
            destino_dpto,
            destino_barrio,
            destino_ciudad,
            entrega,
            otra_persona,
            retira_nombre,
            retira_apellido,
            montototal,
            tipo_pago,
            estado,
            anulado_porque,
            fec_anulado,
            tel_form,
            tipo_alta,
            timestamp,
            fec_carga,
            comentario
          )
        VALUES
          (
            '${req.body.venta.iduser}',
            '${req.body.venta.CP}',
            '${req.body.venta.destino_calle}',
            '${req.body.venta.destino_nro}',
            '${req.body.venta.destino_dpto}',
            '${req.body.venta.destino_barrio}',
            '${req.body.venta.destino_ciudad}',
            '${req.body.venta.entrega}',
            '${req.body.venta.otra_persona}',
            '${req.body.venta.retira_nombre}',
            '${req.body.venta.retira_apellido}',
            '${req.body.venta.montototal}',
            '${req.body.venta.tipo_pago}',
            '${req.body.venta.estado}',
            '${req.body.venta.anulado_porque}',
            '${req.body.venta.fec_anulado}',
            '${req.body.venta.tel_form}',
            '${req.body.venta.tipo_alta}',
            NOW(),
            NOW(),
            '${req.body.venta.comentario}'
            );`;
    let idventa = "";
    try {
      const [result] = await conexionDB.query(sql);
      idventa = result.insertId;
      res.write(JSON.stringify(result));
      // senderWPP.enviaPedido('3536570880', req.body.entrega, req.body.arrProd, idventa);
      ctrlVenta.ARTXVENTA_ADD(
        req,
        res,
        resolve,
        idventa,
        req.body.venta.seguimiento_idestado
      );
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  ARTXVENTA_ADD: async (req, res, resolve, idventa, idestadoSeg) => {
    let string = "";
    req.body.arrProd.forEach((prod) => {
      string += `('${idventa}', '${prod.idpicada}', '${null}', '${null}',
       '0', '${prod.personas}', '${prod.comentario || ""}'),`;
    });
    string = string.substring(0, string.length - 1);

    const sqlS = `
        INSERT INTO
          artxventa (idventa, idpicada, nomcolor, size, precioventa, cantidad, comentario)
        VALUES
          ${string};`;
    try {
      await conexionDB.query(sqlS);
      ctrlVenta.SEGUIMIENTO_ADD(req, res, resolve, idventa, idestadoSeg);
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
  SEGUIMIENTO_ADD: async (_, res, resolve, idventa, idestadoSeg) => {
    const sqlS = `INSERT INTO seguimiento (idventa, idestado, create_time)
                      VALUES (${idventa}, ${idestadoSeg}, NOW());
                      `;
    try {
      await conexionDB.query(sqlS);
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
      return resolve();
    }
  },
};
export default ctrlVenta;
