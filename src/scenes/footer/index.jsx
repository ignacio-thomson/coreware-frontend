import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const theme = useTheme();
  const alt = theme.palette.background.alt;

  return (
    <Box gap="0.5rem" width="100%" margin="2rem 0 0 0">
      <FlexBetween padding="0.5rem 6%" backgroundColor={alt}>
        <FlexBetween padding="0.5rem" justifyContent={"center"}>
          <Box>
            <Typography
              fontWeight="medium"
              fontSize="18px"
              color="primary"
              sx={{ m: "0.25rem" }}
            >
              Ignacio Thomson &copy; 2022
            </Typography>
          </Box>
        </FlexBetween>
        <FlexBetween>
          <IconButton
            href="https://www.linkedin.com/in/ignacio-thomson/"
            target="_blank"
          >
            <LinkedInIcon sx={{ fontSize: "25px", m: "0.25rem" }} />
          </IconButton>
          <IconButton href="https://github.com/ignacio-thomson" target="_blank">
            <GitHubIcon sx={{ fontSize: "25px", m: "0.25rem" }} />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
    </Box>
  );
};
export default Footer;
