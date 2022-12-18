import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

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
          p="1rem 6%"
          textAlign="start"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Coreware &trade;
          </Typography>
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
    </Box>
  );
};
export default LoginPage;
