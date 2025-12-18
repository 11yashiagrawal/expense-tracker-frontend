"use client";

import { Menu, MenuItem, useTheme } from "@mui/material";

const TransactionsSortMenu = ({ anchorEl, onClose, sort, setSort }) => {
    const theme = useTheme();
    const handleSort = (field) => {
        const order = sort.field === field && sort.order === "asc" ? "desc" : "asc";
        setSort({ field, order });
        onClose();
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            PaperProps={{
                sx: {
                    bgcolor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    border: "none",
                    p: 2,
                    borderRadius: 6,
                    minWidth: 200,
                },
            }}
        >
            <MenuItem onClick={() => handleSort("amount")} sx={{ borderRadius: 2}}>
                Amount {sort.field === "amount" && (sort.order === "asc" ? "↑" : "↓")}
            </MenuItem>
            <MenuItem onClick={() => handleSort("date")} sx={{ borderRadius: 2}}>
                Date {sort.field === "date" && (sort.order === "asc" ? "↑" : "↓")}
            </MenuItem>
        </Menu>
    );
};

export default TransactionsSortMenu;
