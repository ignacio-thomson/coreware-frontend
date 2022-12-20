import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import RegisterPage from "scenes/registerPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import EditComponent from "services/componentServices/EditComponent";
import EditWarehouse from "services/warehouseServices/EditWarehouse";
import EditDistributor from "services/distributorServices/EditDistributor";
import AddComponent from "services/componentServices/AddComponent";
import AddDistributor from "services/distributorServices/AddDistributor";
import AddWarehouse from "services/warehouseServices/AddWarehouse";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/editcomponent/:id" element={<EditComponent />} />
            <Route path="/editwarehouse/:id" element={<EditWarehouse />} />
            <Route path="/editdistributor/:id" element={<EditDistributor />} />
            <Route path="/addcomponent" element={<AddComponent />} />
            <Route path="/addDistributor" element={<AddDistributor />} />
            <Route path="/addWarehouse" element={<AddWarehouse />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
