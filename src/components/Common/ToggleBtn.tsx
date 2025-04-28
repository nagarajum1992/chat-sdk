import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

interface Props {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}


const CustomizedCheckbox: React.FC<Props> = ({ checked, onChange = () => {} }) => {
  return (
    <Checkbox
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      style={{
        color: "#006AFF",
        backgroundColor: "#E9E9EA",
        borderRadius: "4px",
        boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};

export default function ToggleBtn({ checked, onChange }: any) {
  // const [checked, setChekced] = React.useState(false);
  return (
    <label
      style={{
        display: "inline-block",
        width: "42px",
        height: "26px",
        position: "relative",
        cursor: "pointer",
        margin:"5px 0px"
      }}
    >
      <input
        type="checkbox"
        checked={checked ? true : false}
        onChange={onChange}
        style={{
          opacity: 0,
          width: 0,
          height: 0,
        }}
      />
      <span
        style={{
          position: "absolute",
          cursor: "pointer",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: checked ? "#006AFF" : "#E9E9EA",
          transition: "background-color 0.3s",
          borderRadius: "13px",
        }}
      />
      <span
        style={{
          position: "absolute",
          content: "",
          height: "22px",
          width: "22px",
          left: checked ? "20px" : "2px",
          bottom: "2px",
          backgroundColor: "#fff",
          transition: "left 0.3s",
          borderRadius: "50%",
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
        }}
      />
    </label>
  );
}

export { CustomizedCheckbox };