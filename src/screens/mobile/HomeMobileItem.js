import React, { useState } from "react";
import { Avatar, Typography, Paper, IconButton, Stack } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DropDown from "../../components/DropDown";

const HomeMobileItem = ({ item }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <>
      <Paper sx={{ p: 2, my: 2 }} key={item.id}>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Avatar src={item.image_url} />
            <Stack direction="column">
              <Stack direction="row">
                <Typography variant="h5">
                  {item.first_name} {item.last_name}
                </Typography>

                <VerifiedIcon color="secondary" />
              </Stack>
              <Typography>{item.email}</Typography>
            </Stack>
            <IconButton
              onClick={() => {
                setOpenDropDown(true);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Stack>
          <Typography>{item.description}</Typography>
        </Stack>
      </Paper>

      <DropDown
        selectedRows={[item]}
        open={openDropDown}
        setOpen={setOpenDropDown}
      />
    </>
  );
};

export default HomeMobileItem;
