// material-ui
import {useTheme} from '@mui/material/styles';
import logo from "../../assets/hotdog.png";
import Box from "@mui/material/Box";

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

export default function LogoMain() {
    const theme = useTheme();
    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={theme.palette.mode === ThemeMode.DARK ? logoDark : logo} alt="Mantis" width="100" />
         *
         */
        <Box display={"flex"} alignItems="center" justifyContent={"center"}>
            <img src={logo} alt="logo" width="80" height="80"/>
        </Box>
    );
}
