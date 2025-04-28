import * as React from "react";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

export default function AudioLoading({ lines = 3, eachHeight = 15 }) {
  return (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
      <LinearProgress color="inherit" sx={{ height: 20, borderRadius: 1 }} />
    </Stack>
  );
}
