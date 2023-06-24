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
import DeleteProfile from "./DeleteProfile";

const DropDown = ({ open, setOpen, selectedRows }) => {
  const [openEditPro, setOpenEditPro] = useState(false);
  const [openDeletePro, setOpenDeletePro] = useState(false);
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
                setOpenDeletePro(true);
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
      <DeleteProfile open={openDeletePro} setOpen={setOpenDeletePro} />
    </>
  );
};

export default DropDown;
