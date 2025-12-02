// material-ui
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import logo from "../../assets/hotdog.png"
// ==============================|| AUTH BLUR BACK SVG ||============================== //

export default function AuthBackground() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'absolute',
                filter: 'blur(18px)',
                zIndex: -1,
                bottom: 0,
                left: -20,
                transform: 'inherit'
            }}
        >

            <div className={''}>
                <img src={logo} alt="logo" width="100%" height="calc(100% - 175px)"/>
            </div>
        </Box>
    );
}
