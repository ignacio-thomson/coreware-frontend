import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import FlexCenter from "components/FlexCenter";
import pic from "../../assets/img/undraw_spreadsheet_re_cn18.svg";
import Image from "mui-image";

const Hero = () => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box margin={"4rem"}>
      <Box
        sx={{
          marginBottom: "1rem",
        }}
      >
        <FlexCenter>
          <Typography
            fontWeight="bold"
            fontSize="clamp(2rem, 2.5rem, 4rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              margin: "0 0 2rem 0",
            }}
          >
            Portal de administración Codeware
          </Typography>
        </FlexCenter>
      </Box>
      <FlexBetween>
        <Box gap="0.5rem" width="100%" margin="2rem 0 0 0">
          <FlexCenter>
            <Image src={pic} width={isNonMobileScreens ? "35%" : "100%"} />
          </FlexCenter>
        </Box>
      </FlexBetween>
    </Box>
  );
};
export default Hero;
