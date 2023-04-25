import Swal from 'sweetalert2';
const ServUsos = {
  convertUrl: (dato, indice) => {
    if (!dato) return dato;
    if (indice === 'convert') {
      return dato.replace(/ /g, '_').toLocaleLowerCase();
    }
    return dato.replace(/_/g, ' ').toLocaleLowerCase();
  },
  newDateMysql: () => {
    const dateArg = new Date().toLocaleString('eu-ES', {
      timeZone: 'America/Argentina/Buenos_Aires'
    });
    const date = new Date();
    const year = date.getFullYear();
    const hours = dateArg.split(' ')[1];
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${year}-${month}-${day} ${hours}`;
  },
  sendMail_confirmacioncheckin: (obj) => {
    const requestOptions = {
      method: 'POST',
      body: obj,
      redirect: 'follow'
    };

    fetch('https://api.custer.com.ar/server/mailerFiles.php', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado !',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch((error) => console.log('error', error));
  },
  SendWhatsapp: (numero, msg) => {
    const isMobile = navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );
    if (isMobile) {
      window.location.replace(`whatsapp://send?text=${msg}&phone=549${numero}`);
    } else {
      window.open(`https://wa.me/549${numero}/?text=${msg}`, '_system');
    }

    // window.location.replace(`https://wa.me/549${numero}/?text=${pedido}`);
  }
};
export default ServUsos;
