import React, { useState } from "react";
import { Avatar, Typography, Paper, IconButton, Box } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DropDown from "../../components/DropDown";

const HomeMobileItem = ({ item }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <>
      <Paper sx={{ p: 2, my: 2 }} key={item.id}>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Avatar src={item.image_url} sx={{ width: 64, height: 64 }} />
            <Typography variant="h5" noWrap={true}>
              {item.first_name}
              <Typography noWrap={true} sx={{ textOverflow: "ellipsis" }}>
                {item.email}
              </Typography>
            </Typography>
            <Typography
              component="div"
              noWrap={true}
              sx={{ textOverflow: "ellipsis" }}
              variant="h5"
            >
              {item.last_name}
            </Typography>
            <Box component="div" overflow="visible">
              <VerifiedIcon
                color="secondary"
                sx={{ display: { xs: "block", sm: "block", md: "block" } }}
              />
            </Box>
            <Box sx={{ display: { xs: "block", sm: "block", md: "block" } }}>
              <IconButton
                sx={{ overflow: "hidden" }}
                onClick={() => {
                  setOpenDropDown(true);
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>

          <Typography noWrap={true} sx={{ textOverflow: "ellipsis", ml: 1 }}>
            {item.description}
          </Typography>
        </Box>
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
