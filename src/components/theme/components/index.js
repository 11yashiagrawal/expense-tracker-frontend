import MuiButton from "./MuiButton";
import MuiIconButton from "./MuiIconButton";
import MuiTextField from "./MuiTextField";
import MuiBox from "./MuiBox";
import MuiSelectTheme from "./MuiSelect";
import MuiToggleButtonTheme from "./MuiToggleButton";

const components = {
    MuiButton,
    MuiIconButton,
    MuiTextField,
    MuiBox,
    ...MuiSelectTheme,
    ...MuiToggleButtonTheme,
};

export default components;