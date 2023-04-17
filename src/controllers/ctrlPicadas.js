import { conexionDB } from "../config/db";

const ctrlPicadas = {
  PICADAS_GET_LIST: async (req, res, resolve) => {
    const sql = "CALL SP_get_picadas()";
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
};

export default ctrlPicadas;
