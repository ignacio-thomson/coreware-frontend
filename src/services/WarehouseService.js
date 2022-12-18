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

const WarehousesWidget = () => {
  const [warehouse, setWarehouse] = useState([]);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getWarehouse = async () => {
    const response = await fetch("http://localhost:8000/api/warehouses", {
      method: "GET",
      headers: { "x-access-token": `${token}` },
    });
    const { warehouses, totalPages, currentPage } = await response.json();
    setWarehouse(warehouses);
  };

  useEffect(() => {
    getWarehouse();
  }, []);

  if (!warehouse) {
    return null;
  }

  return (
    <div>
      {warehouse.map((c) => (
        <div key={c._id}>
          <h1>Marca: {c.name}</h1>
          <h1>Modelo: {c.location}</h1>
          <h1>Precio: {c.stockavailable}</h1>
        </div>
      ))}
    </div>
  );
};

export default WarehousesWidget;
