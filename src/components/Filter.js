import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Controls from './controls/Controls'
import { useForm } from './useForm'
import * as employeeService from "../services/employeeService";
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const initialValues = {
    empId: '',
    hireDate: new Date(),
    departmentId: '',
    EmployeeName: '',
    salary :'',
    designation : ""
}
function Filter() {
    const [depart, setDepart] = useState('')
    const [design, setDesign] = useState('')

    const classes = useStyles()

    const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
    if ('designation' in fieldValues)
      temp.designation = fieldValues.designation.length != 0 ? "" : "This field is required."
      setErrors({
        ...temp
    })

    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, true, validate);

    const departmentHandler = (e) => {
      setDepart(e.target.value)
    }

    const designationHandler = (e) => {
      setDesign(e.target.value)
    }
    const  property  = values
    console.log(property,"lllllllllll");

    if(depart.toString() === "Human Resources"){
        property.filter(() => property.depart == "Human Resources")
    }
    if( depart.toString() === "Technology"){
        property.filter(() => property.depart == "Technology")
    }
    if(depart.toString() === "Sales"){
        property.filter(() => property.depart === "Sales")
    }
    if(depart.toString() === "Management"){
        property.filter(() => property.depart === "Management")
    }

    if(design.toString() === "Manager"){
    }

  return (
    <Grid>
      <Controls.Select
        name="departmentId"
        label="Department"
        value={values.departmentId}
        onChange={handleInputChange}
        options={employeeService.getDepartmentCollection()}
        error={errors.departmentId}
        className={classes.pageContent}
      />
      <Controls.Select
        name="designation"
        label="designation"
        value={values.designation}
        onChange={handleInputChange}
        options={employeeService.getDesignationCollection()}
        error={errors.designation}
      />
    </Grid>
  )
}

export default Filter