import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Button,
  TablePagination,
} from "@mui/material";
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

const ComponentsWidget = () => {
  const [component, setComponent] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState(0);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const deleteComponent = async (id) => {
    const response = await fetch(
      `http://localhost:8000/api/components?id=${id}`,
      {
        method: "DELETE",
        headers: { "x-access-token": `${token}` },
      }
    );
    console.log(response.status);
  };

  const handleDelete = (id) => {
    deleteComponent(id).then(() => {
      getComponent();
    });
  };

  const handleUpdate = (id) => {
    console.log(id);
    navigate(`/editcomponent/${id}`);
  };

  const handleAdd = () => {
    navigate(`/addcomponent`);
  };

  const getComponent = async () => {
    const response = await fetch(`http://localhost:8000/api/components/`, {
      method: "GET",
      headers: { "x-access-token": `${token}` },
    });
    const { components } = await response.json();
    setComponent(components);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPostsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    getComponent();
  }, []);

  if (!component) {
    return null;
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem" pb="1.5rem">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Marca</TableCell>
                <TableCell align="right">Modelo</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {component
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
                      {row._id}
                    </TableCell>
                    <TableCell align="right">{row.brand}</TableCell>
                    <TableCell align="right">{row.model}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleUpdate(row._id)}>
                        Editar
                      </Button>
                      <Button onClick={() => handleDelete(row._id)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <FlexBetween>
            <Button
              variant="contained"
              sx={{
                m: "0.75rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => handleAdd()}
            >
              Añadir componente
            </Button>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={component.length}
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

export default ComponentsWidget;
