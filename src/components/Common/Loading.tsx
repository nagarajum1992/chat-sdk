import * as React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loading({}) {
  return (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
      <LinearProgress color="inherit" sx={{ height: 15, borderRadius: 1 }} />
      <LinearProgress color="inherit" sx={{ height: 15, borderRadius: 1 }} />
      <LinearProgress color="inherit" sx={{ height: 15, borderRadius: 1 }} />
    </Stack>
  );
}
