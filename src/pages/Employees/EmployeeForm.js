import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";

const initialValues = {
    empId: '',
    hireDate: new Date(),
    departmentId: '',
    EmployeeName: '',
    salary :'',
    designation : ""
}

 function EmployeeForm(props) {
    const {addOrEdit, recordsForEdit} = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('EmployeeName' in fieldValues)
            temp.EmployeeName = fieldValues.EmployeeName ? "" : "This field is required."
        if ('empId' in fieldValues)
            temp.empId = fieldValues.empId ? "" : "ID should be required."
        if ('salary' in fieldValues)
            temp.salary = fieldValues.salary.length > 3 ? "" : "Minimum Thousand's required."
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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
           addOrEdit(values,resetForm)
        }
    }

    useEffect(() => {
     if(recordsForEdit != null){
        setValues({
          ...recordsForEdit
        })
     }
    },[recordsForEdit])

    return (
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="empId"
                label="Employee ID"
                value={values.empId}
                onChange={handleInputChange}
                error={errors.empId}
              />

              <Controls.DatePicker
                name="hireDate"
                label="Hire Date"
                value={values.hireDate}
                onChange={handleInputChange}
              />
              <Controls.Select
                name="departmentId"
                label="Department"
                value={values.departmentId}
                onChange={handleInputChange}
                options={employeeService.getDepartmentCollection()}
                error={errors.departmentId}
              />
            </Grid>

            <Grid item xs={6}>
              <Controls.Input
                label="Employee Name"
                name="EmployeeName"
                value={values.EmployeeName}
                onChange={handleInputChange}
                error={errors.EmployeeName}
              />
              <Controls.InputNumber
                label="Salary"
                name="salary"
                value={values.salary}
                onChange={handleInputChange}
                error={errors.salary}
              />
              <Controls.Select
                name="designation"
                label="designation"
                value={values.designation}
                onChange={handleInputChange}
                options={employeeService.getDesignationCollection()}
                error={errors.designation}
              />

              <div>
                <Controls.Button
                  text="Cancel"
                  color="default"
                  onClick={resetForm} 
                />
                <Controls.Button
                  type="submit"
                  color="default"
                  text="Save" 
                />
              </div>
            </Grid>

          </Grid>
        </Form>
    )
}

export default EmployeeForm
