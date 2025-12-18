"use client";

import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    useTheme,
    Pagination,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import {
    Search as SearchIcon,
    FilterAltOutlined as FilterIcon,
    SwapVert as SortIcon,
} from "@mui/icons-material";

const TransactionsControls = ({
    search,
    setSearch,
    view,
    setView,
    page,
    setPage,
    pageCount,
    filterAnchorEl,
    setFilterAnchorEl,
    sortAnchorEl,
    setSortAnchorEl,
}) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 4,
                alignItems: "center",
            }}
        >
            {/* Search */}
            <TextField
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
                width="45%"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: theme.palette.text.primary }} />
                        </InputAdornment>
                    ),
                }}
            />

            {/* View Toggle */}
            <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(e, newView) => {
                    if (newView) {
                        setView(newView);
                        setPage(1);
                    }
                }}
            >
                <ToggleButton value="All">All</ToggleButton>
                <ToggleButton value="Expense">Expenses</ToggleButton>
                <ToggleButton value="Income">Incomes</ToggleButton>
                <ToggleButton value="Subscription">Subscriptions</ToggleButton>
            </ToggleButtonGroup>

            {/* Filter */}
            <IconButton
                onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                sx={{
                    border: `1px solid ${theme.palette.primary.brightText}`
                }}
            >
                <FilterIcon />
            </IconButton>

            {/* Sort */}
            <IconButton
                onClick={(e) => setSortAnchorEl(e.currentTarget)}
                sx={{
                    border: `1px solid ${theme.palette.primary.brightText}`
                }}
            >
                <SortIcon />    
            </IconButton>

            {/* Pagination */}
            <Box sx={{ ml: "auto" }}>
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={(e, p) => setPage(p)}
                    color="primary"
                    shape="circle"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: theme.palette.text.primary,
                            fontWeight: "600",
                            "&:hover": {
                                bgcolor: theme.palette.action.hover,
                            },
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            bgcolor: theme.palette.primary.main,
                            "&:hover": {
                                bgcolor: theme.palette.primary.light,
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default TransactionsControls;
