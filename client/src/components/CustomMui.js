import { tooltipClasses } from "@mui/material/Tooltip";
import { Tab, Tabs, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

//  tooltip
export const ToolTipCustom = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: "14px",
    border: "1px solid #dadde9",
  },
}));
