"use client";

import {
    Box,
    Typography,
    Paper,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    useTheme,
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon
} from "@mui/icons-material";
import { formatCurrency } from "@/utils/formatUtils";
import { getIcon } from "@/utils/getCategoryIcon";

const CategoryList = ({ categories, onEdit, onDelete, onAdd }) => {
    const theme = useTheme();

    return (
        <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Categories
                </Typography>
                <IconButton onClick={onAdd}>
                    <AddIcon />
                </IconButton>
            </Box>
            <Box sx={{ maxHeight: 400, overflowY: "auto", scrollbarWidth: "none" }}>
                <List>
                    {categories.map((category, index) => (
                        <div key={category._id}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar
                                        src={
                                            category.icon &&
                                                (category.icon.startsWith("http") || category.icon.startsWith("/"))
                                                ? category.icon
                                                : undefined
                                        }
                                        sx={{
                                            bgcolor: category.colour,
                                            width: 40,
                                            height: 40,
                                        }}
                                    >
                                        {category.icon &&
                                            !(
                                                category.icon.startsWith("http") || category.icon.startsWith("/")
                                            ) &&
                                            getIcon(category.icon)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={category.title}
                                    secondary={`Budget: ${formatCurrency(category.budget)}`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        size="small"
                                        onClick={() => onEdit(category)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        size="small"
                                        onClick={() => onDelete(category)}
                                        sx={{
                                            color: theme.palette.error.main,
                                            "&:hover": { bgcolor: theme.palette.error.dark },
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {index < categories.length - 1 && <Divider variant="inset" component="li" />}
                        </div>
                    ))}
                </List>
            </Box>
        </Paper>
    );
};

export default CategoryList;
