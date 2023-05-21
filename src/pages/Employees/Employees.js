import React from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/PageHeader";
import { Paper,TableBody,TableCell,TableRow,makeStyles } from '@material-ui/core';
import * as employeeService from "../../services/employeeService"
import useTable from '../../components/useTable';
import { useState } from 'react';
import AddIcon from "@material-ui/icons/Add";
import Controls from '../../components/controls/Controls';
import Popup from '../../components/Popup';

const useStyles = makeStyles(theme => ({
    newButton : {
        position: "absolute",
        right: "10px",
        color:"white",
        backgroundColor:"grey"
      },
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
    }
}))

const headcells = [
    {id: "EmployeeId", lable: "Employee ID"},
    {id: "EmployeeName", lable: "Employee Name"},
    {id: "hired Date", lable: "DOJ"},
    {id: "departmentId", lable: "Department"},
    {id: "salary", lable: "Salary"},
    {id: "Designation", lable: "designation"},
    {id: "actions", lable: "Actions"},
]

export default function Employees() {
    const classes = useStyles()
    const [records, setRecords] = useState(employeeService.getAllEmployees())
    const [recordsForEdit, setRecordsForEdit] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)

    const { TableContainer, TblHead } = useTable(records,headcells)
    
    const addOrEdit = (employee, resetForm) => {
      employeeService.insertEmployee(employee)
      resetForm()
      setRecordsForEdit(null)
      setOpenPopup(false)
      setRecords(employeeService.getAllEmployees())
    }

    const openInPopup = item => {
      setRecordsForEdit(item)
      setOpenPopup(true)
    }

    const onDelete = id =>{
      employeeService.deleteEmployee(id)
      setRecords(employeeService.getAllEmployees())
    }
    return (
      <>
          <PageHeader/>
          <Controls.Button 
          text = "Add Employee"
          variant = "contained"
          startIcon = {<AddIcon />}
          className= {classes.newButton}
          onClick ={() => {setOpenPopup(true); setRecordsForEdit(null);}}
          />

        <Paper className={classes.pageContent}>
          <TableContainer>
            <TblHead />
            <TableBody>
              {
                records.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.empId}</TableCell>
                  <TableCell>{item.EmployeeName}</TableCell>
                  <TableCell>{item.hireDate}</TableCell>
                  <TableCell>{item.department}</TableCell> 
                  <TableCell>{item.salary}</TableCell>
                  <TableCell>{item.Designation}</TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="dark"
                      onClick={() => {openInPopup(item)}}
                    >
                    Modify
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="dark"
                      onClick={()=> {
                      onDelete(item.id)
                      }}
                    >
                    Delete
                    </Controls.ActionButton>
                  </TableCell>
                </TableRow>
                ))
              }
            </TableBody>
          </TableContainer>
        </Paper>
        <Popup
          openPopup = {openPopup} 
          setOpenPopup = {setOpenPopup}
        >
        <EmployeeForm
          recordsForEdit = {recordsForEdit}
          addOrEdit ={addOrEdit}
        />
        </Popup>
      </>
    )
}
