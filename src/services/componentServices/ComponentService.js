import {
  Box,
  Typography,
  useTheme,
  Button,
  TablePagination,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
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
import TableRow from "@mui/material/TableRow";
import WidgetWrapper from "components/WidgetWrapper";

const ComponentsWidget = () => {
  const [component, setComponent] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

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

  const emptyRows =
    currentPage > 0
      ? Math.max(0, (1 + currentPage) * postsPerPage - component.length)
      : 0;

  useEffect(() => {
    getComponent();
  }, []);

  if (!component) {
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
          Componentes
        </Typography>
      </FlexBetween>
      <FlexBetween gap="1.5rem" pb="1.5rem">
        <TableContainer>
          <Table>
            <TableBody>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                {component
                  .slice(
                    currentPage * postsPerPage,
                    currentPage * postsPerPage + postsPerPage
                  )
                  .map((row) => (
                    <Card sx={{ minWidth: 275, m: "0.5rem" }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Marca: {row.brand}
                        </Typography>
                        <Typography variant="h5" component="div">
                          Modelo: {row.model}
                        </Typography>
                        <Typography variant="body2">
                          Precio: {row.price}
                        </Typography>
                      </CardContent>

                      <CardActions sx={{ justifyContent: "end" }}>
                        <Button onClick={() => handleUpdate(row._id)}>
                          Editar
                        </Button>
                        <Button onClick={() => handleDelete(row._id)}>
                          Eliminar
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
              </Box>
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height:
                      postsPerPage === 8 ? 31.9 * emptyRows : 41 * emptyRows,
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
                m: "1rem 0 0 0.50rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              onClick={() => handleAdd()}
            >
              Añadir componente
            </Button>
            <TablePagination
              rowsPerPageOptions={[8, 16, 24]}
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
