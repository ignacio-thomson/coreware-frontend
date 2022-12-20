import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import Navbar from "scenes/navbar";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Button, TextField, Typography, useTheme } from "@mui/material";
import { CheckBox } from "@mui/icons-material";

const EditWarehouse = () => {
  const [idWare, setIdWare] = useState();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const token = useSelector((state) => state.token);
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { palette } = useTheme();

  const getWarehouse = async () => {
    const response = await fetch(
      `http://localhost:8000/api/warehouses?id=${id}`,
      {
        method: "GET",
        headers: { "x-access-token": `${token}` },
      }
    );
    const warehouse = await response.json();
    setIdWare(warehouse._id);
    setName(warehouse.name);
    setLocation(warehouse.location);
  };

  useEffect(() => {
    getWarehouse();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const warehouse = { idWare, name, location };

    fetch(`http://localhost:8000/api/warehouses?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify(warehouse),
    })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const editSchema = yup.object().shape({
    name: yup.string(),
    oficialdistributor: yup.bool(),
    address: yup.string(),
  });

  const initialValuesEdit = {
    name: name,
    location: location,
  };

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
        <WidgetWrapper>
          <FlexBetween>
            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValuesEdit}
              validationSchema={editSchema}
            >
              {({ errors, touched, handleBlur, resetForm }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      label="Nombre"
                      onBlur={handleBlur}
                      onChange={(e) => setName(e.target.value)}
                      className={"form-control"}
                      value={name}
                      name="name"
                      required
                      error={Boolean(touched.name) && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      sx={{
                        gridColumn: "span 1",
                      }}
                    />
                    <TextField
                      label="Localización"
                      onBlur={handleBlur}
                      onChange={(e) => setLocation(e.target.value)}
                      className={"form-control"}
                      value={location}
                      name="location"
                      required
                      error={
                        Boolean(touched.location) && Boolean(errors.location)
                      }
                      helperText={touched.location && errors.location}
                      sx={{
                        gridColumn: "span 2",
                      }}
                    />
                  </Box>
                  {/* Buttons */}
                  <Box>
                    <Button
                      fullWidth
                      type="submit"
                      sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.main },
                      }}
                    >
                      Editar
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </FlexBetween>
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default EditWarehouse;
