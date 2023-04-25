import APIConsultas from '../../services/consultas';
import ServUsos from '../usos';
import senderFRONT from '../whatsapp/senderFront';

const utilsOrderStatus = {
  orderStatusChange: (venta, data, estado, idestado) => {
    const objSeguimiento = {
      idventa: venta.idventa,
      name: estado,
      value: ServUsos.newDateMysql(),
      idestado: idestado
    };
    APIConsultas.ventas
      .UPDATE_SEGUIMIENTO(objSeguimiento, true)
      .then((data) => {});
    const ventaUpd = {
      idventa: venta.idventa,
      campo: 'timestamp',
      valor: data.replace(' ', 'T')
    };
    const msg =
      idestado === 4
        ? senderFRONT.msgPedidoConfirm(data)
        : senderFRONT.msgOrderPendingConfirm(data.split('T')[1]);
    APIConsultas.ventas.UPDATE_XCAMPO(ventaUpd, true);
    APIConsultas.usuario.SendWppBot(venta.tel_wpp, msg, true);
  }
};

export default utilsOrderStatus;
