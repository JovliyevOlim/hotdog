import {Stack, Tooltip} from "@mui/material";
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined, PlusOutlined, PlusCircleOutlined
} from "@ant-design/icons";
import IconButton from "./IconButton";
import BasicModal from "../Modal";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import Grid from "@mui/material/Grid2";
import AnimateButton from "./AnimateButton";
import Button from "@mui/material/Button";

const ActionButtons = ({onView, onEdit, onAdd, loading, onDelete}) => {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(!open);
    }


    return (
        <Stack direction="row" spacing={1}>
            {
                onView && <Tooltip title="Ko‘rish">
                    <IconButton color="primary" onClick={onView}>
                        <EyeOutlined/>
                    </IconButton>
                </Tooltip>
            }
            {
                onAdd && <Tooltip title="Qo'shish">
                    <IconButton color="primary" onClick={onAdd}>
                        <PlusCircleOutlined/>
                    </IconButton>
                </Tooltip>
            }
            {
                onEdit && <Tooltip title="Tahrirlash">
                    <IconButton color="warning" onClick={onEdit}>
                        <EditOutlined/>
                    </IconButton>
                </Tooltip>
            }

            {
                onDelete && <Tooltip title="O‘chirish">
                    <IconButton color="error" onClick={() => {
                        setOpen(true)
                    }}>
                        <DeleteOutlined/>
                    </IconButton>
                </Tooltip>
            }
            <BasicModal open={open} onClose={handleClose}>
                <Typography color={'red'} textAlign={'center'} variant={'h4'} m={2}> Ishonchingiz komilmi !</Typography>
                <Grid size={12} direction="column" marginTop={5} display={'flex'} justifyContent="center" gap={2}>
                    <AnimateButton>
                        <Button type='button' fullWidth size="large"
                                onClick={handleClose}
                                variant="contained"
                                color="error">
                            Yo'q
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button type='submit' loadingPosition="end"
                                fullWidth size="large" variant="contained"
                                color="primary"
                                loading={loading}
                                onClick={onDelete}
                        >
                            Ha
                        </Button>
                    </AnimateButton>
                </Grid>
            </BasicModal>
        </Stack>
    );
};

export default ActionButtons;