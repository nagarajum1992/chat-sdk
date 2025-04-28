import { useState } from "react";
import { InputBase } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { ReactComponent as SearchIcon } from "svgs/light/search-icon.svg";

export default function CustomSearch({
  placeholder,
  value,
  onChange,

  sx = {},
}: any) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        border: `2px solid ${isFocused ? "#D1E9FF" : "#E0E3E7"}`, // Highlight on focus
        borderRadius: "4px",
        padding: "6px 10px",
        transition: "border-color 0.3s",
        backgroundColor: "#FFF",
        width: "100%",
      }}
    >
      <SearchIcon style={{ color: "#A0A0A0" }} />
      <InputBase
        placeholder={placeholder}
        style={{
          fontSize: "13px",
          flex: 1,
          ...sx,
        }}
        value={value}
        inputProps={{ "aria-label": "search" }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
      />
    </div>
  );
}
