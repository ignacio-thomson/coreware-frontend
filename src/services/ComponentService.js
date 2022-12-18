import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "@mui/material";

const ComponentsWidget = () => {
  const [component, setComponent] = useState([]);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getComponent = async () => {
    const response = await fetch("http://localhost:8000/api/components", {
      method: "GET",
      headers: { "x-access-token": `${token}` },
    });
    const { components, totalPages, currentPage } = await response.json();
    setComponent(components);
  };

  useEffect(() => {
    getComponent();
  }, []);

  if (!component) {
    return null;
  }

  return (
    <div>
      {component.map((c) => (
        <div key={c._id}>
          <h1>Marca: {c.brand}</h1>
          <h1>Modelo: {c.model}</h1>
          <h1>Precio: {c.price}</h1>
        </div>
      ))}
    </div>
  );
};

export default ComponentsWidget;
