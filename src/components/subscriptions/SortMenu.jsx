"use client";

import { Menu, MenuItem, useTheme } from "@mui/material";

const SortMenu = ({ anchorEl, onClose, sort, setSort }) => {
    const theme = useTheme();
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
            <MenuItem
                selected={sort.field === "amount"}
                onClick={() =>
                    setSort((prev) => ({
                        field: "amount",
                        order:
                            prev.field === "amount" && prev.order === "asc" ? "desc" : "asc",
                    }))
                }
            >
                Amount {sort.field === "amount" && (sort.order === "asc" ? "↑" : "↓")}
            </MenuItem>
            <MenuItem
                selected={sort.field === "nextPaymentDate"}
                onClick={() =>
                    setSort((prev) => ({
                        field: "nextPaymentDate",
                        order:
                            prev.field === "nextPaymentDate" && prev.order === "asc"
                                ? "desc"
                                : "asc",
                    }))
                }
            >
                Next Payment Date{" "}
                {sort.field === "nextPaymentDate" &&
                    (sort.order === "asc" ? "↑" : "↓")}
            </MenuItem>
        </Menu>
    );
};

export default SortMenu;
