import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import ComponentWidget from "services/ComponentService";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <ComponentWidget />
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}></Box>
      </Box>
    </Box>
  );
};
export default HomePage;
