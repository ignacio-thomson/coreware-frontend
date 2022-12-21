import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import Navbar from "scenes/navbar";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, TextField, Typography, useTheme } from "@mui/material";
import pic from "../../assets/img/undraw_engineering_team_a7n2.svg";
import Footer from "scenes/footer";
import FlexCenter from "components/FlexCenter";
import Image from "mui-image";

const EditComponent = () => {
  const [idComp, setIdComp] = useState();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState(0);
  const token = useSelector((state) => state.token);
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { palette } = useTheme();

  const getComponent = async () => {
    const response = await fetch(
      `https://coreware-backend-production.up.railway.app/api/components?id=${id}`,
      {
        method: "GET",
        headers: { "x-access-token": `${token}` },
      }
    );
    const component = await response.json();
    setIdComp(component._id);
    setBrand(component.brand);
    setModel(component.model);
    setPrice(component.price);
  };

  useEffect(() => {
    getComponent();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const component = { idComp, brand, model, price };

    fetch(
      `https://coreware-backend-production.up.railway.app/api/components?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
        body: JSON.stringify(component),
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
    brand: yup.string(),
    model: yup.string(),
    price: yup.number(),
  });

  const initialValuesEdit = {
    brand: brand,
    model: model,
    price: price,
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
              Editar componente
            </Typography>
          </FlexBetween>
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
                        gridColumn: isNonMobile ? undefined : "span 2",
                      },
                    }}
                  >
                    <TextField
                      label="Marca"
                      onBlur={handleBlur}
                      onChange={(e) => setBrand(e.target.value)}
                      className={"form-control"}
                      value={brand}
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
                      onChange={(e) => setModel(e.target.value)}
                      className={"form-control"}
                      value={model}
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
                      onChange={(e) => setPrice(e.target.value)}
                      className={"form-control"}
                      value={price}
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
                      Editar
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </FlexBetween>
        </WidgetWrapper>
      </Box>
      <FlexCenter sx={{ m: "5rem" }}>
        <Image src={pic} width={isNonMobileScreens ? "35%" : "100%"} />
      </FlexCenter>
      <Footer />
    </Box>
  );
};

export default EditComponent;
