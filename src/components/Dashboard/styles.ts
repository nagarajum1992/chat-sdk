import { Theme, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  mainBg: {
    width: "100%",
    height: "100%",
    // background: "linear-gradient(to bottom,#050522, #000000)",

    display: "flex",
    color: "white",
    position: "fixed",
    top: 0,
    left: 0,
  },

  

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // backgroundColor: "rgba(0, 0, 0, 0.88)",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1,
  },

  animatedBlurBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    objectFit: "cover",
    animation: "$blurZoomPulse 6s ease-in-out infinite",
    transformOrigin: "center",
  },
  "@keyframes blurZoomPulse": {
    "0%": {
      // filter: "blur(2px)",
      transform: "scale(1.01)",
    },
    "50%": {
      // filter: "blur(8px)",
      transform: "scale(1.05)",
    },
    "100%": {
      // filter: "blur(2px)",
      transform: "scale(1.01)",
    },
  },

  leftSidebar: {
    background: "#1E1C1C",
    // #242427
    padding: "30px 20px",
    width: "40%",
    maxWidth: "350px",
    position: "relative",
  },

  feedContainer: {
    zIndex: 5,
    padding: "20px",
    margin: "15px",
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: "0px",
    flex: 1,
    position: "relative",
  },

  formRoot: {
    position: "relative",
  },
  feedBox: {
    // height: "calc(100vh - 230px)",
    // // overflowY: "auto",
    // overflowY:"scroll",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: "1000px",
    marginTop: "10px",
  },

  form: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",

    display: "flex",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #161617",
    background: "#242427",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
    borderRadius: "12px",
  },

  formInput: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      padding: "0px",
      "& fieldset": {
        border: "none", // Remove the outline
      },
    },
    "& .MuiInputBase-input": {
      width: "100%",
      padding: "15px",
      fontSize: "15px",
      color: "#16151C",
      borderRadius: "8px",

      border: "1px solid  #D0D5DD",
    },
  },
  media: {
    // height: "100%",
    // width: "100%",

    maxHeight: "200px",
    maxwWidth: "200px",
  },

  btnmenu: {
    minWidth: 200,
    height: 50,
    background: "transparent !important",

    textTransform: "capitalize",
    fontWeight: 300,
  },
  menuroot: {
    width: "200px !important",
  },

  downloadButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
    minWidth: 150,
    height: 45,
    color: "#FFFFFF",
    fontFamily: "Lexend",
    fontWeight: 400,
    borderRadius: 10,
    cursor: "pointer",
    backgroundColor: "#7152F3",
    border: "1px solid #7152F3",
    fontSize: "16px",
    paddingLeft: "10px",
    "&:hover": {
      backgroundColor: "#7152F3CC",
    },
  },
  search: {
    position: "relative",
    marginLeft: 10,
    width: "100%",
    display: "flex",
    height: 45,
    marginRight: 10,
  },
  searchicon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#16151C",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    border: "1px solid #A2A1A833",
    borderRadius: 10,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px) !important`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  option: {
    '&[aria-selected="true"]': {
      backgroundColor: "#16151C",
    },
    fontFamily: "Lexend",
    fontWeight: 300,
    fontSize: 14,
  },

  formcontrol: {
    margin: "8px !important",
    marginLeft: "0 !important",
    width: "100%",
  },
  labelHeader: {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "30px",
    margin: "0px 0px",
  },
  formTextArea: {
    width: "100%",
    borderRadius: 10,
    background: "transparent !important",
    fontSize: "14px !important",

    border: "1px solid rgba(162, 161, 168, 0.20) !important",
  },
}));

export default useStyles;
