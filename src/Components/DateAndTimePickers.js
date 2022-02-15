import React from 'react';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    color: "white", 
    width:"90%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
}));

export default function DateAndTimePickers(props) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={props.id}
        name={props.name}
        //label={props.label}
        type={props.type}
        defaultValue={props.defaultValue}
        value={props.Value}
        className={classes.textField}
        onChange={props.onChange}
        style={{color:"teal"}}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
