import React from 'react'
import { Table, TableHead, TableRow, TableCell} from "@material-ui/core"

function useTable( records, headcells) {
    const TableContainer = props =>(
      <Table>
        {props.children}
      </Table>
    )

    const TblHead = () => {
      return(
        <TableHead>
         <TableRow>
           {
            headcells.map(headcells => (
              <TableCell key ={headcells.id}>
                {headcells.lable}
              </TableCell>
            ))
            }
         </TableRow>
        </TableHead>
        )
    }
  return {
    TableContainer,
    TblHead
  }
}

export default useTable