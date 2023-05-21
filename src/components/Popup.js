import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import Controls from './controls/Controls';
import CloseIcon from "@material-ui/icons/Close"

const Popup = (props) => {
    const {children, openPopup, setOpenPopup} = props
    const Title = "Add/Edit Employee"
  return (
     <Dialog open={openPopup} maxWidth="md">
        <DialogTitle>
          <div style = {{display: "flex"}}>
            <div style={{flexGrow:1}}>{Title}</div>
            <Controls.ActionButton 
              color="dark"
              onClick ={() => setOpenPopup(false)}
            >
              <CloseIcon />
            </Controls.ActionButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <div>{children}</div>
        </DialogContent>
     </Dialog>
  )
}

export default Popup