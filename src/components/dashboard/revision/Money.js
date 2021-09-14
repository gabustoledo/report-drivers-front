import React, { Component } from "react";
import axios from "axios";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

const columns = [
  { id: "date", label: "Fecha", minWidth: 170 },
  { id: "detail", label: "Detalle", minWidth: 170 },
  {
    id: "amount",
    label: "Monto",
    minWidth: 170,
    align: "right",
  },
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

class Money extends Component {
  constructor() {
    super();
    this.state = {
      moneys: [],
      amount: 0,
      id_driver: "",
      drivers: [],
      detail: "",
      date: today,
      open: false,
      text: "",
    };

    this.getMoneys = this.getMoneys.bind(this);
  }

  componentDidMount() {
    this.getMoneys();
  }

  getMoneys = () => {
    const tokenAux = localStorage.getItem("token");
    axios
      .get(this.props.host + ":8080/api/money/mydrivers", {
        headers: {
          authorization: tokenAux,
        },
      })
      .then((response) => {
        this.setState({ moneys: response.data });
      })
      .catch((err) => console.log(err));

    axios
      .get(this.props.host + ":8080/api/users", {
        headers: {
          authorization: tokenAux,
        },
      })
      .then((response) => {
        this.setState({ drivers: response.data });
        this.setState({ id_driver: this.state.drivers[0]._id });
      })
      .catch((err) => console.log(err));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const tokenAux = localStorage.getItem("token");

    axios
      .post(
        this.props.host + ":8080/api/money/byuser",
        {
          amount: this.state.amount,
          date: this.state.date,
          detail: this.state.detail,
          type: "ingreso",
          id_driver: this.state.id_driver,
        },
        {
          headers: {
            authorization: tokenAux,
          },
        }
      )
      .then((response) => {
        this.setState({ open: true });
        this.setState({ text: "Monto ingresado exitosamente." });
      })
      .catch((err) => {
        this.setState({ open: true });
        this.setState({
          text: "Ha ocurrido un problema, intentelo nuevamente.",
        });
      });
  };

  handleClose = (e) => {
    e.preventDefault();
    this.setState({ open: false });
    window.location.href = "/dashboard/dinero";
  };

  render() {
    return (
      <div>
        <Typography component="h1" variant="h5">
          Caja chica
        </Typography>
        <br />
        {this.state.moneys.map((money) => (
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{money.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper>
                    <Typography component="h2" variant="h6" gutterBottom>
                      En caja chica: ${money.total}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {money.moneys.reverse().map((money) => {
                          if (money.type === "egreso") {
                            return (
                              <StyledTableRow
                                key={money._id}
                                style={{ backgroundColor: "#c96057" }}
                              >
                                <StyledTableCell component="th" scope="row">
                                  {money.date.substring(0, 10)}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {money.detail}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {money.amount}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          } else {
                            return (
                              <StyledTableRow
                                key={money._id}
                                style={{ backgroundColor: "#7fd15c" }}
                              >
                                <StyledTableCell component="th" scope="row">
                                  {money.date.substring(0, 10)}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {money.detail}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {money.amount}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}{" "}
        <br />
        <br />
        <div>
          <Typography>Recargar caja chica</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              required
              id="amount"
              label="Monto"
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              onChange={(e) => this.setState({ amount: e.target.value })}
            />

            <TextField
              id="select"
              label="Chofer"
              value={this.state.id_driver}
              onChange={(e) => this.setState({ id_driver: e.target.value })}
              variant="outlined"
              select
              fullWidth
              required
            >
              {this.state.drivers.map((driver) => (
                <MenuItem value={driver._id}>{driver.name}</MenuItem>
              ))}
            </TextField>

            <TextField
              required
              id="detail"
              label="Detalle"
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              onChange={(e) => this.setState({ detail: e.target.value })}
            />

            <TextField
              id="date"
              label="Fecha"
              type="date"
              value={this.state.date}
              variant="outlined"
              margin="normal"
              fullWidth
              autoFocus
              format="MM/dd/yyyy"
              onChange={(e) => this.setState({ date: e.target.value })}
            />
            <br />
            <br />
            <Button type="submit" fullWidth variant="contained" color="primary">
              ENVIAR
            </Button>
          </form>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Atención"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secundary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Money;
