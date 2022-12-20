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

const AddDistributor = () => {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { palette } = useTheme();

  const handleFormSubmit = async (values) => {
    await fetch(
      `https://coreware-backend-production.up.railway.app/api/distributors`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
        body: JSON.stringify(values),
      }
    )
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const editSchema = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
  });

  const initialValuesEdit = {
    name: "",
    address: "",
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
              Añadir distribuidor
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
                      label="Dirección"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      name="address"
                      required
                      error={
                        Boolean(touched.address) && Boolean(errors.address)
                      }
                      helperText={touched.address && errors.address}
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

export default AddDistributor;
