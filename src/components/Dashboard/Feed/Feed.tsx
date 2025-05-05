import {
  Autocomplete,
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Toolbar,
} from "@mui/material";
import ChatFeed from "./FeedContent/ChatFeed";
import {
  ChatComponentProps,
  LanguageProps,
} from "../../../models/IChatComponent";
import languagesData from "../../../data/languages.json";
import { useEffect, useState } from "react";

export default function Feed({
  showLanguageSelector = true,
  ...props
}: ChatComponentProps) {
  const [languageCode, setLanguageCode] = useState<LanguageProps>({
    label: "",
    value: "",
  });
  const [formatSelection, setSelectedFormat] = useState<string>("");
  const formats = [
    { label: "English to English", value: "engToEng" },
    { label: "Regional to English", value: "regLangToEng" },
    { label: "Regional to Regional", value: "regLangToRegLang" },
    { label: "Regional to English & Regional", value: "regLangToBoth" },
  ];

  useEffect(() => {
    if (props.format) setSelectedFormat(props.format);
  }, []);
  return (
    <Box className="feedContainer">
      <Toolbar
        style={{
          zIndex: 1,
          position: "relative",
        }}
      ></Toolbar>
      {showLanguageSelector && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <Autocomplete
            sx={{
              width: 200,
              background: "#FFF",
              borderRadius: "10px",
            }}
            options={languagesData}
            autoHighlight
            getOptionLabel={(option: any) => option.label}
            value={languageCode}
            onChange={(e, data) =>
              setLanguageCode(data || { label: "", value: "" })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a language"
                slotProps={{
                  htmlInput: {
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  },
                }}
              />
            )}
          />
          <FormControl
            sx={{
              width: 300,
              background: "#FFF",
              borderRadius: "10px",
            }}
          >
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={formatSelection}
              label="Select Format"
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              {formats.map((format) => (
                <MenuItem key={format.value} value={format.value}>
                  {format.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box
        style={{
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <ChatFeed
          languageCode={languageCode}
          formatSelected={formatSelection}
          {...props}
        />
      </Box>
    </Box>
  );
}
