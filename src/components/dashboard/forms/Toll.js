import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Fuel() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState("");

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
        "http://localhost:8080/api/toll",
        {
          amount: amount,
          date: date,
          name: name,
          photo: "./photos",
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((response) => {
        setAlertText("Peaje ingresado exitosamente.");
        // console.log(response);
        handleClickOpen();
      })
      .catch((err) => {
        // console.log(err);
        setAlertText("Ha ocurrido un problema, intentelo nuevamente.");
        handleClickOpen();
      });
    //handleClose();
    // console.log(liters, amount, mileage, date);
  };

  return (
    <div>
      <div>
        <Typography component="h1" variant="h5">
          Peaje
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            required
            id="amount"
            label="Precio"
            type="number"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            required
            id="name"
            label="Nombre Peaje"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="date"
            label="Fecha"
            type="date"
            defaultValue="2021-09-01"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
            format="MM/dd/yyyy"
            onChange={(e) => setDate(e.target.value)}
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