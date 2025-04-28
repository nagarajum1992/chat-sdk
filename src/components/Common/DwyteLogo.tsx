import { Box, FormControl, Typography, Button } from "@mui/material";
import { ReactComponent as DwyteIcon } from "svgs/light/dwyte/dwyte-icon.svg";

export default function DwyteLogo() {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        fontFamily: "Gill Sans",
        color: "#FFF",
      }}
    >
      <DwyteIcon
        style={{
          marginRight: 10,
          width: 30,
        }}
      />
      <Typography
        component="span"
        style={{
          fontSize: "32px",
          fontWeight: 600,
        }}
      >
        {" "}
        Dwyte
      </Typography>
    </Box>
  );
}
