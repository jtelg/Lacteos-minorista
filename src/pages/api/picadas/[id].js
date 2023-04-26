import ctrlPicadas from '../../../controllers/ctrlPicadas';
export default async function handler(req, res) {
  return new Promise((resolve) => {
    switch (req.method) {
      case 'GET':
        switch (req.query.path) {
          case 'PICADA_GET_XID':
            return ctrlPicadas.PICADA_GET_XID(req, res, resolve);
        }
        break;
      case 'PUT':
        switch (req.query.path) {
          case 'PICADA_UPDATE':
            return ctrlPicadas.PICADA_UPDATE(req, res, resolve);
        }
        break;
    }
  });
}
