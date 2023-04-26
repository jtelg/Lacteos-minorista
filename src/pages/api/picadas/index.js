import ctrlPicadas from '../../../controllers/ctrlPicadas';

export default async function handler(req, res) {
  return new Promise((resolve) => {
    switch (req.method) {
      case 'GET':
        switch (req.query.path) {
          case 'PICADAS_GET_LIST':
            return ctrlPicadas.PICADAS_GET_LIST(req, res, resolve);
        }
        break;
      case 'POST':
        switch (req.query.path) {
          case 'PICADAS_ADD':
            return ctrlPicadas.PICADAS_ADD(req, res, resolve);
        }
        break;
    }
    res.status(405).end();
    return resolve();
  });
}
