import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Typography from "@mui/material/Typography";
function Info({ totalPrice, edit }) {
  return (
    <React.Fragment>
      {edit ? (
        <>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Edit
          </Typography>
          <Typography variant="h4" gutterBottom>
            {totalPrice}
          </Typography>
        </>
      ) : (
        <Typography variant="h4" gutterBottom>
          Add new
        </Typography>
      )}
      <Card
        onClick={() => router.push("/add")}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          color: "inherit",
          cursor: "pointer",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          sx={{
            p: 3,
            height: "100%",
            borderColor: "hsla(220, 25%, 25%, 0.3)",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Avatar alt="Annas" src="ima" sx={{ width: 32, height: 32 }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexGrow: 1, alignItems: "center" }}
          >
            <div style={{ width: "100%" }}>
              <Typography sx={{ fontWeight: "medium", fontSize: 14 }}>
                Name
              </Typography>
              <Typography sx={{ fontWeight: "medium", fontSize: 12 }}>
                example@example.com
              </Typography>
            </div>
          </Stack>
        </Stack>
      </Card>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
