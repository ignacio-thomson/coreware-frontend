import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import Navbar from "scenes/navbar";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, TextField, Typography, useTheme } from "@mui/material";

const AddWarehouse = () => {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { palette } = useTheme();

  const handleFormSubmit = async (values) => {
    await fetch(`http://localhost:8000/api/warehouses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify(values),
    })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const editSchema = yup.object().shape({
    name: yup.string().required(),
    location: yup.string().required(),
  });

  const initialValuesEdit = {
    name: "",
    location: "",
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
              onSubmit={handleFormSubmit}
              initialValues={initialValuesEdit}
              validationSchema={editSchema}
            >
              {({
                errors,
                touched,
                values,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
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
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      required
                      error={Boolean(touched.name) && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      sx={{
                        gridColumn: "span 2",
                      }}
                    />
                    <TextField
                      label="Localización"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
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
                      Añadir
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

export default AddWarehouse;
