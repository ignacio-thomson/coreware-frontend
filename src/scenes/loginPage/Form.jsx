import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
// import Dropzone from "react-dropzone";
import { login } from "services/AuthService";
import { register } from "services/RegisterService";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  age: yup.number().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
  confirm: yup
    .string()
    .when("password", {
      is: (value) => (value && value.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password must be identical"),
    })
    .required("You must confirm your password"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  password: "",
  confirm: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      const loggedInResponse = await login(values.email, values.password);

      if (login) {
        dispatch(
          setLogin({
            user: loggedInResponse.data.email,
            token: loggedInResponse.data.token,
          })
        );
        sessionStorage.setItem("sessionJWT", loggedInResponse.data.token);
        sessionStorage.setItem("userName", values.email);
        navigate("/home");
      }
    }
    if (isRegister) {
      await register(
        values.firstName,
        values.lastName,
        values.age,
        values.email,
        values.password
      );
      if (register) {
        onSubmitProps.resetForm();
        setPageType("login");
      }
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Nombre"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 1",
                  }}
                />
                <TextField
                  label="Apellido"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 1",
                  }}
                />
                <TextField
                  label="Edad"
                  type="number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.age}
                  name="age"
                  error={Boolean(touched.age) && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 4",
              }}
            />
            <TextField
              label="Contrase??a"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 4",
              }}
            />

            {isRegister && (
              <>
                <TextField
                  label="Confirmar contrase??a"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirm}
                  name="confirm"
                  error={Boolean(touched.confirm) && Boolean(errors.confirm)}
                  helperText={touched.confirm && errors.confirm}
                  sx={{
                    gridColumn: "span 4",
                  }}
                />
              </>
            )}
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
              {isLogin ? "Iniciar sesi??n" : "Registrarse"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "No tienes una cuenta? Registrate aqu??"
                : "Ya tienes una cuenta? Conectate aqu??"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
