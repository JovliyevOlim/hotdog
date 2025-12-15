import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
import {Backdrop} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModifierModal({children, handleClose, open}) {

    return (
        <Modal
            open={open}
            onToggle={handleClose}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{backdrop: Backdrop}}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Box sx={style} onClick={(e) => e.stopPropagation()}>
                {children}
            </Box>
        </Modal>
    );
}
