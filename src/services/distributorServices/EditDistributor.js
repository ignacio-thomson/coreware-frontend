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
import pic from "../../assets/img/undraw_dev_productivity_re_fylf.svg";
import Footer from "scenes/footer";
import FlexCenter from "components/FlexCenter";
import Image from "mui-image";

const EditDistributor = () => {
  const [idDist, setIdDist] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const token = useSelector((state) => state.token);
  const { id } = useParams();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const { palette } = useTheme();

  const getDistributor = async () => {
    const response = await fetch(
      `http://localhost:8000/api/distributors?id=${id}`,
      {
        method: "GET",
        headers: { "x-access-token": `${token}` },
      }
    );
    const distributor = await response.json();
    setIdDist(distributor._id);
    setName(distributor.name);
    setAddress(distributor.address);
  };

  useEffect(() => {
    getDistributor();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const distributor = { idDist, name, address };

    fetch(`http://localhost:8000/api/distributors?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify(distributor),
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
    address: address,
  };

  return (
    <Box sx={{ justifyContent: "center", alignItems: "center" }}>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        sx={{ justifyContent: "center", alignItems: "center" }}
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
              Editar distribuidor
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
                        gridColumn: "span 2",
                      }}
                    />
                    <TextField
                      label="Direccón"
                      onBlur={handleBlur}
                      onChange={(e) => setAddress(e.target.value)}
                      className={"form-control"}
                      value={address}
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

export default EditDistributor;
