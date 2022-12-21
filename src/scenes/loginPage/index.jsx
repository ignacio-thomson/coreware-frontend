import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import FlexCenter from "components/FlexCenter";
import Footer from "scenes/footer";
import Form from "./Form";
import Image from "mui-image";
import { setMode } from "state";
import { useDispatch } from "react-redux";
import pic from "../../assets/img/undraw_react_re_g3ui.svg";

const LoginPage = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dark = theme.palette.neutral.dark;
  const dispatch = useDispatch();

  return (
    <Box>
      <FlexBetween
        padding="0.5rem 6%"
        backgroundColor={alt}
        marginBottom="5rem"
      >
        <Box
          width="100%"
          backgroundColor={theme.palette.background.atl}
          textAlign="start"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Coreware &trade;
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
        </Box>
      </FlexBetween>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" varian="h5" sx={{ mb: "1.5rem" }}>
          Bienvenido a Coreware, soluciones de Hardware.
        </Typography>
        <Form />
      </Box>
      <FlexCenter sx={{ m: "5rem" }}>
        <Image src={pic} width={isNonMobileScreens ? "35%" : "100%"} />
      </FlexCenter>
      <Footer />
    </Box>
  );
};
export default LoginPage;
