import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import LocalGasStationIcon from "@material-ui/icons/LocalGasStation";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HistoryIcon from '@material-ui/icons/History';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const listForm = (
  <div>
    <ListItemLink button href={"/dashboard/home"}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/combustible"}>
      <ListItemIcon>
        <LocalGasStationIcon />
      </ListItemIcon>
      <ListItemText primary="Combustible" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/peaje"}>
      <ListItemIcon>
        <LocalAtmIcon />
      </ListItemIcon>
      <ListItemText primary="Peaje" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/viatico"}>
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Viatico" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/extra"}>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Extra" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/historial"}>
      <ListItemIcon>
        <HistoryIcon />
      </ListItemIcon>
      <ListItemText primary="Historial" />
    </ListItemLink>
  </div>
);

export const listRev = (
  <div>
    <ListItemLink button href={"/dashboard/home"}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/combustibleRev"}>
      <ListItemIcon>
        <LocalGasStationIcon />
      </ListItemIcon>
      <ListItemText primary="Combustible" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/peajeRev"}>
      <ListItemIcon>
        <LocalAtmIcon />
      </ListItemIcon>
      <ListItemText primary="Peaje" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/viaticoRev"}>
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Viatico" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/extraRev"}>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Extra" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/add"}>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Agregar nuevo usuario" />
    </ListItemLink>
    <ListItemLink button href={"/dashboard/dinero"}>
      <ListItemIcon>
        <AttachMoneyIcon />
      </ListItemIcon>
      <ListItemText primary="Caja chica" />
    </ListItemLink>
  </div>
);
