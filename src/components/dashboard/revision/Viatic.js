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

const columns = [
  { id: "date", label: "Fecha", minWidth: 170 },
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

class Viatic extends Component {
  constructor() {
    super();
    this.state = { viatics: [] };

    this.getViatics = this.getViatics.bind(this);
  }

  componentDidMount() {
    this.getViatics();
  }

  getViatics = () => {
    const tokenAux = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/api/viatic/mydrivers", {
        headers: {
          authorization: tokenAux,
        },
      })
      .then((response) => {
        this.setState({ viatics: response.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <Typography component="h1" variant="h5">
          Viatico
        </Typography>
        <br/>
        {this.state.viatics.map((viatic) => (
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{viatic.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                    {viatic.viatics.map((vi) => (
                      <StyledTableRow key={vi._id}>
                        <StyledTableCell component="th" scope="row">
                          {vi.day}
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
        ))}{" "}
      </div>
    );
  }
}

export default Viatic;
