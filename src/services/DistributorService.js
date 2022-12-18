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

const DistributorsWidget = () => {
  const [distributor, setDistributors] = useState([]);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getDistributor = async () => {
    const response = await fetch("http://localhost:8000/api/distributors", {
      method: "GET",
      headers: { "x-access-token": `${token}` },
    });
    const { distributors, totalPages, currentPage } = await response.json();
    setDistributors(distributors);
  };

  useEffect(() => {
    getDistributor();
  }, []);

  if (!distributor) {
    return null;
  }

  return (
    <div>
      {distributor.map((c) => (
        <div key={c._id}>
          <h1>Direccion: {c.address}</h1>
          <h1>Nombre: {c.name}</h1>
          <h1>Distribuidor oficial: {c.officialdistributor}</h1>
        </div>
      ))}
    </div>
  );
};

export default DistributorsWidget;
