import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import ComponentWidget from "services/componentServices/ComponentService";
import DistributorsWidget from "services/distributorServices/DistributorService";
import WarehousesWidget from "services/warehouseServices/WarehouseService";

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
        justifyContent="center"
      >
        <ComponentWidget />
        {/* <Box flexBasis={isNonMobileScreens ? "26%" : undefined}></Box> */}
      </Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <DistributorsWidget />
        {/* <Box flexBasis={isNonMobileScreens ? "26%" : undefined}></Box> */}
      </Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <WarehousesWidget />
        {/* <Box flexBasis={isNonMobileScreens ? "26%" : undefined}></Box> */}
      </Box>
    </Box>
  );
};
export default HomePage;
