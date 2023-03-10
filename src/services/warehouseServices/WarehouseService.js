import { Typography, useTheme, Button, TablePagination } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "@mui/material";
import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import WidgetWrapper from "components/WidgetWrapper";

const WarehousesWidget = () => {
  const [warehouse, setWarehouse] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const deleteWarehouse = async (id) => {
    const response = await fetch(
      `https://coreware-backend-production.up.railway.app/api/warehouses?id=${id}`,
      {
        method: "DELETE",
        headers: { "x-access-token": `${token}` },
      }
    );
    console.log(response.status);
  };

  const handleDelete = (id) => {
    deleteWarehouse(id).then(() => {
      getWarehouses();
    });
  };

  const handleUpdate = (id) => {
    console.log(id);
    navigate(`/editwarehouse/${id}`);
  };

  const handleAdd = () => {
    navigate(`/addwarehouse`);
  };

  const getWarehouses = async () => {
    const response = await fetch(
      `https://coreware-backend-production.up.railway.app/api/warehouses/`,
      {
        method: "GET",
        headers: { "x-access-token": `${token}` },
      }
    );
    const { warehouses } = await response.json();
    setWarehouse(warehouses);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPostsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const emptyRows =
    currentPage > 0
      ? Math.max(0, (1 + currentPage) * postsPerPage - warehouse.length)
      : 0;

  useEffect(() => {
    getWarehouses();
  }, []);

  if (!warehouse) {
    return null;
  }

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography
          fontWeight="medium"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          sx={{
            m: "0 0 0.5rem 1rem",
          }}
        >
          Bodegas
        </Typography>
      </FlexBetween>
      <FlexBetween gap="1.5rem" pb="1.5rem">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "15px" }}>ID</TableCell>
                <TableCell align="right" sx={{ fontSize: "15px" }}>
                  Nombre
                </TableCell>
                <TableCell align="right" sx={{ fontSize: "15px" }}>
                  Localizaci??n
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "15px" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouse
                .slice(
                  currentPage * postsPerPage,
                  currentPage * postsPerPage + postsPerPage
                )
                .map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="body2"
                        fontWeight={"light"}
                        sx={{ fontSize: 15 }}
                        color="dark"
                        gutterBottom
                      >
                        {row._id}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        fontWeight={"light"}
                        sx={{ fontSize: 16 }}
                        color="dark"
                        gutterBottom
                      >
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        fontWeight={"light"}
                        sx={{ fontSize: 16 }}
                        color="dark"
                        gutterBottom
                      >
                        {row.location}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleUpdate(row._id)}>
                        <Typography
                          variant="body2"
                          fontWeight={"light"}
                          sx={{ fontSize: 14 }}
                          color="dark"
                          gutterBottom
                        >
                          Editar
                        </Typography>
                      </Button>
                      <Button onClick={() => handleDelete(row._id)}>
                        <Typography
                          variant="body2"
                          fontWeight={"light"}
                          sx={{ fontSize: 14 }}
                          color="dark"
                          gutterBottom
                        >
                          Eliminar
                        </Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height:
                      postsPerPage === 5 ? 65.5 * emptyRows : 65.8 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <FlexBetween>
            <Button
              variant="contained"
              sx={{
                m: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => handleAdd()}
            >
              A??adir bodega
            </Button>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={warehouse.length}
              rowsPerPage={postsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </FlexBetween>
        </TableContainer>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default WarehousesWidget;
