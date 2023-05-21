import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles( style =>({
    root: {
      minWidth: 0,
      margin: style.spacing(0.5)
    },
    secondary: {
      backgroudColor: style.palette.secondary.dark,
      '& .MuiButton-lable': {
      color: style.palette.secondary.light,
      }
    },
    primary: {
        backgroundColor: style.palette.primary.dark,
        '& .MuiButton-lable': {
            color: style.palette.primary.light,
        }
    }
}))

const ActionButton = (props) => {
    const { color, children, onClick } = props
    const classes = useStyles()
  return (
    <Button 
      onClick={onClick}
      className={`${classes.root} ${classes[color]}`}
    >
     {children}
    </Button>
  )
}

export default ActionButton