import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const mainListItems = (
  <div>
    <ListItemLink button href={'http://localhost:3000/dashboard/home'}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItemLink>
    <ListItemLink button href={'http://localhost:3000/dashboard/combustible'}>
      <ListItemIcon>
        <LocalGasStationIcon />
      </ListItemIcon>
      <ListItemText primary="Combustible" />
    </ListItemLink>
    <ListItemLink button href={'http://localhost:3000/dashboard/peaje'}>
      <ListItemIcon>
        <LocalAtmIcon />
      </ListItemIcon>
      <ListItemText primary="Peaje" />
    </ListItemLink>
    <ListItemLink button href={'http://localhost:3000/dashboard/viatico'}>
      <ListItemIcon>
        <FastfoodIcon />
      </ListItemIcon>
      <ListItemText primary="Viatico" />
    </ListItemLink>
    <ListItemLink button href={'http://localhost:3000/dashboard/extra'}>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Extra" />
    </ListItemLink>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Adicional</ListSubheader>
    <ListItemLink button href={'http://localhost:3000/dashboard/add'}>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Agregar nuevo usuario" />
    </ListItemLink>
  </div>
);
