import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 10
};

const BasicModal = ({ type, titulo }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [certificate, setCertificate] = useState('');

  useEffect(() => {
    switch (type) {
      case 1:
        setCertificate('/media/pol.calidad.png');
        break;
      case 2:
        setCertificate('/media/certificado.png');
        break;
      case 3:
        setCertificate('/media/cert.gestion.png');
        break;
      case 4:
        setCertificate('/media/cert.peligros.png');
        break;
      case 5:
        setCertificate('/media/cert.manufactura.png');
        break;

      default:
        break;
    }
  }, []);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="text-white hover:text-secondary w-full brother-500 border-2 border-white hover:border-secondary  rounded-[30px] md:px-6 py-1 md:text-base text-sm "
      >
        {titulo}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="md:w-[500px] w-full relative md:top-[50%] top-[40%] left-[50%]"
        >
          <button className="absolute right-1 top-3" onClick={handleClose}>
            <i className="bx bx-x text-[50px]"></i>
          </button>
          <Typography id="modal-modal-description">
            <img src={certificate} alt="foto" />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
