import * as Icons from "@mui/icons-material";
export const getIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons.Category;
    return <IconComponent sx={{ color: "#fff", fontSize: 20 }} />;
};