import ServUsos from '../usos';
const functions = {
  EnviaPedido_msg: (idventa, entrega, arr_cartprods) => {
    const pedido = `_¡Hola! Te hago el siguiente pedido:_ %0A
           %0A*Pedido:* PTX-A-${idventa}
           %0A*Nombre:* ${entrega.nombre}
           %0A*Telefono:* ${entrega.telefono}
           %0A
           %0A
           %0A*Pedido:*
           %0A${arr_cartprods
             .map(
               (d) =>
                 `${d.personas} x ${d.nombre}: $ ${(
                   d.personas * d.precioxpers
                 ).toLocaleString('de')} %0A`
             )
             .flat()
             .join('')}
           %0A*TOTAL: $${arr_cartprods
             .reduce((a, b) => a + b.precioxpers * b.personas, 0)
             .toLocaleString('de')}*
          
           %0A
           %0A_Espero tu respuesta para confirmar mi pedido_
           `;
    return pedido;
  }
};

const senderFRONT = {
  enviaPedido: (number, entrega, arr_cartprods, idventa) => {
    const pedido = functions.EnviaPedido_msg(idventa, entrega, arr_cartprods);
    ServUsos.SendWhatsapp(number, pedido);
  },
  msgOrderPendingConfirm: (hora, entrega) => {
    const msg = `¡¡Tu pedido está confirmado!! 🤩 Va a estar listo a las ${hora}hs. ${
      entrega === 'Envio a domicilio'
        ? 'A partir de ese momento depende de la demora del cadete 🛵😊'
        : ''
    }`;
    return msg;
  },
  msgPedidoConfirm: (comentario = '') => {
    return `¡¡Tu pedido está en camino!! 🛵
    ${comentario}`;
  }
};

export default senderFRONT;
