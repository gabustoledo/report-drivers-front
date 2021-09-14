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
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const columnsExtra = [
  { id: "date", label: "Fecha", minWidth: 170 },
  { id: "comment", label: "Comentario", minWidth: 100 },
  {
    id: "amount",
    label: "Monto",
    minWidth: 170,
    align: "right",
  },
];

const columnFuel = [
  { id: "date", label: "Fecha", minWidth: 170 },
  { id: "liters", label: "Litros", minWidth: 170 },
  {
    id: "amount",
    label: "Monto",
    minWidth: 170,
  },
  {
    id: "mileage",
    label: "Kilometraje",
    minWidth: 170,
    align: "right",
  },
];

const columnsToll = [
  { id: "date", label: "Fecha", minWidth: 170 },
  { id: "name", label: "Peaje", minWidth: 170 },
  {
    id: "amount",
    label: "Monto",
    minWidth: 170,
    align: "right",
  },
];

const columnsViatic = [
  { id: "date", label: "Fecha", minWidth: 170 },
  {
    id: "amount",
    label: "Monto",
    minWidth: 170,
    align: "right",
  },
];

const columnsMoney = [
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

class History extends Component {
  constructor() {
    super();
    this.state = {
      extras: [],
      fuels: [],
      tolls: [],
      viatics: [],
      moneys: [],
      total: 0,
    };

    this.getAll = this.getAll.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    this.getExtras();
    this.getFuels();
    this.getTolls();
    this.getViatics();
    this.getMoney();
  };

  getMoney = () => {
    const tokenAux = localStorage.getItem("token");
    axios
      .get(this.props.host + ":8080/api/money", {
        headers: {
          authorization: tokenAux,
        },
      })
      .then((response) => {
        this.setState({ moneys: response.data.moneys });
        this.setState({ total: response.data.total });
      })
      .catch((err) => console.log(err));
  };

  getViatics = () => {
    const tokenAux = localStorage.getItem("token");
    axios
      .get(this.props.host + ":8080/api/viatic", {
        headers: {
          authorization: tokenAux,
        },
      })
      .then((response) => {
        this.setState({ viatics: response.data });
      })
      .catch((err) => console.log(err));
  };

  getTolls = () => {
    const tokenAux = localStorage.getItem("token");
    axios
      .get(this.props.host + ":8080/api/toll", {
        headers: {
          authorization: tokenAux,
        },
      })
      .then((response) => {
        this.setState({ tolls: response.data });
      })
      .catch((err) => console.log(err));
  };

  getFuels = () => {
    const tokenAux = localStorage.getItem("token");
    axios
      .get(this.props.host + ":8080/api/fuel", {
        headers: {
          authorization: tokenAux,
        },
      })
      .then((response) => {
        this.setState({ fuels: response.data });
      })
      .catch((err) => console.log(err));
  };

  getExtras = () => {
    const tokenAux = localStorage.getItem("token");
    axios
      .get(this.props.host + ":8080/api/extra", {
        headers: {
          authorization: tokenAux,
        },
      })
      .then((response) => {
        this.setState({ extras: response.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Typography component="h1" variant="h5">
          Historial
        </Typography>
        <br />
        <Accordion defaultExpanded={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Combustible</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {columnFuel.map((column) => (
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
                  {this.state.fuels.reverse().map((fuel) => (
                    <StyledTableRow key={fuel._id}>
                      <StyledTableCell component="th" scope="row">
                        {fuel.date.substring(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell>{fuel.liters}</StyledTableCell>
                      <StyledTableCell>{fuel.amount}</StyledTableCell>
                      <StyledTableCell align="right">
                        {fuel.mileage}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Peaje</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {columnsToll.map((column) => (
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
                  {this.state.tolls.reverse().map((to) => (
                    <StyledTableRow key={to._id}>
                      <StyledTableCell component="th" scope="row">
                        {to.date.substring(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell>{to.name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {to.amount}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Viatico</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {columnsViatic.map((column) => (
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
                  {this.state.viatics.reverse().map((vi) => (
                    <StyledTableRow key={vi._id}>
                      <StyledTableCell component="th" scope="row">
                        {vi.day.substring(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {vi.amount}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Extra</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {columnsExtra.map((column) => (
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
                  {this.state.extras.reverse().map((extra) => (
                    <StyledTableRow key={extra._id}>
                      <StyledTableCell component="th" scope="row">
                        {extra.date.substring(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell>{extra.comment}</StyledTableCell>
                      <StyledTableCell align="right">
                        {extra.amount}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={false}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Caja chica</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper>
                  <Typography
                    component="h2"
                    variant="h6"
                    gutterBottom
                  >
                    En caja chica: ${this.state.total}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        {columnsMoney.map((column) => (
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
                      {this.state.moneys.reverse().map((money) => {
                        if (money.type === "egreso") {
                          return (
                            <StyledTableRow
                              key={money._id}
                              style={{ backgroundColor: "#c96057" }}
                            >
                              <StyledTableCell component="th" scope="row">
                                {money.date.substring(0, 10)}
                              </StyledTableCell>
                              <StyledTableCell>{money.detail}</StyledTableCell>
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
                              <StyledTableCell>{money.detail}</StyledTableCell>
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
      </div>
    );
  }
}

export default History;
