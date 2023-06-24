import {
  Dialog,
  ListItemText,
  List,
  Divider,
  ListItem,
  ListItemButton,
} from "@mui/material";
import React, { useState } from "react";
import EditProfile from "./EditProfile";

const DropDown = ({ open, setOpen, selectedRows }) => {
  const [openEditPro, setOpenEditPro] = useState(false);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem>
            <ListItemButton
              autoFocus
              onClick={() => {
                setOpenEditPro(true);
                setOpen(false);
              }}
            >
              <ListItemText primary="Edit profile" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem color="secondary">
            <ListItemButton
              autoFocus
              onClick={() => {
                setOpen(false);
              }}
            >
              <ListItemText primary="Remove profile" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
      <EditProfile
        open={openEditPro}
        setOpen={setOpenEditPro}
        initialData={selectedRows.length > 0 && selectedRows[0]}
        profileId={selectedRows.length > 0 && selectedRows[0]["id"]}
      />
    </>
  );
};

export default DropDown;
