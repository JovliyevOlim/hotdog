import {Stack, Tooltip} from "@mui/material";
import {
    EyeOutlined,
    EditOutlined,
    DeleteOutlined, PlusOutlined, PlusCircleOutlined
} from "@ant-design/icons";
import IconButton from "./IconButton";

const ActionButtons = ({onView, onEdit, onDelete,onAdd}) => {
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
                    <IconButton color="error" onClick={onDelete}>
                        <DeleteOutlined/>
                    </IconButton>
                </Tooltip>
            }


        </Stack>
    );
};

export default ActionButtons;