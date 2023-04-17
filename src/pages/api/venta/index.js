import ctrlVenta from "../../../controllers/venta.control";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    switch (req.method) {
      case "POST":
        switch (req.query.path) {
          case "VENTA_ADD":
            return ctrlVenta.VENTA_ADD(req, res, resolve);
        }
        break;
    }
    res.status(405).end();
    return resolve();
  });
}
