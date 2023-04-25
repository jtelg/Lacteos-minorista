import { Box, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
const ModalView = (props) => {
  const [open, setOpen] = useState(props.open);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const closemodal = (ev) => {
    ev.preventDefault();
    setOpen(false);
    return props.close(ev);
  };

  return (
    <>
      {/* <section
        className={`${
          open ? 'translate-y-0 ease-out' : 'translate-y-full ease-in'
        }  w-full fixed left-0 min-h-screen top-0 overflow-hidden transition-all z-[100] flex  items-center justify-center`}
      >
        <div
          className="h-screen w-full absolute top-0 left-0 bg-[#0000008f]"
          onClick={(ev) => closemodal(ev)}
          aria-hidden
        ></div>
        <article className="w-full h-full m-8 z-[101] max-w-xs rounded">
          <button
            title="Cerrar modal"
            className="relative mb-4 shadow-sm bg-red-600 px-3 py-1 text-white rounded"
            onClick={(ev) => closemodal(ev)}
          >
            X
          </button>
          <div className="bg-white w-full rounded">{props.children}</div>
        </article>
      </section> */}
      <Modal
        open={open}
        onClose={(ev) => closemodal(ev)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="flex flex-col items-center rounded-xl overflow-hidden border-none px-5 py-4 w-auto "
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h3"
            className={`font-commuter uppercase pt-1 pb-5 font-bold  text-xl flex w-full justify-between text-secondary-500`}
          >
            {props.titulo}
            <div
              className="text-red-500 cursor-pointer"
              onClick={(ev) => closemodal(ev)}
              aria-hidden
            >
              <span className="material-icons text-2xl">close</span>
            </div>
          </Typography>
          {props.children}
        </Box>
      </Modal>
    </>
  );
};
export default ModalView;
