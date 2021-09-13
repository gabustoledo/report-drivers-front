import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

export default function Title(props) {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://128.199.5.111:8080/api/auth/register",
        {
          name: name,
          password: password,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((response) => {
        setAlertText("Usuario registrado exitosamente.");
        handleClickOpen();
      })
      .catch((err) => {
        setAlertText("Ha ocurrido un problema, intentelo nuevamente.");
        handleClickOpen();
      });
  };

  return (
    <div>
      <div>
        <Typography>Agregar Usuario</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            required
            id="name"
            label="Nombre de usuario"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            id="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button type="submit" fullWidth variant="contained" color="primary">
            ENVIAR
          </Button>
        </form>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Atención"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secundary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
