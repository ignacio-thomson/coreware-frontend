import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import Navbar from "scenes/navbar";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, TextField, Typography, useTheme } from "@mui/material";
import FlexCenter from "components/FlexCenter";
import Image from "mui-image";
import pic from "../../assets/img/undraw_engineering_team_a7n2.svg";
import Footer from "scenes/footer";

const AddComponent = () => {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { palette } = useTheme();

  const handleFormSubmit = async (values) => {
    await fetch(`http://localhost:8000/api/components`, {
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
    brand: yup.string().required(),
    model: yup.string().required(),
    price: yup.number().required(),
  });

  const initialValuesEdit = {
    brand: "",
    model: "",
    price: "",
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
            <Typography
              fontWeight="medium"
              fontSize="clamp(1rem, 2rem, 2.25rem)"
              color="primary"
              sx={{
                m: "0 0 1rem 0",
              }}
            >
              Añadir componente
            </Typography>
          </FlexBetween>
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
                        gridColumn: isNonMobile ? undefined : "span 2",
                      },
                    }}
                  >
                    <TextField
                      label="Marca"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.brand}
                      name="brand"
                      required
                      error={Boolean(touched.brand) && Boolean(errors.brand)}
                      helperText={touched.brand && errors.brand}
                      sx={{
                        gridColumn: "span 1",
                      }}
                    />
                    <TextField
                      label="Modelo"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.model}
                      name="model"
                      required
                      error={Boolean(touched.model) && Boolean(errors.model)}
                      helperText={touched.model && errors.model}
                      sx={{
                        gridColumn: "span 1",
                      }}
                    />
                    <TextField
                      label="Precio"
                      type="number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.price}
                      name="price"
                      required
                      error={Boolean(touched.price) && Boolean(errors.price)}
                      helperText={touched.price && errors.price}
                      sx={{
                        gridColumn: "span 2",
                      }}
                    />
                  </Box>
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
      <FlexCenter sx={{ m: "5rem 0 10rem 0" }}>
        <Image src={pic} width={isNonMobileScreens ? "35%" : "100%"} />
      </FlexCenter>
      <Footer />
    </Box>
  );
};

export default AddComponent;
