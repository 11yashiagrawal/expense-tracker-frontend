"use client";

import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
    MenuItem,
    useTheme,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNotification } from "@/utils/notificationUtils";
import { useTransactions } from "@/hooks/useTransactions";
import { useTransactionFilters } from "@/hooks/useTransactionFilters";
import TransactionsControls from "@/components/transactions/TransactionsControls";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import TransactionsFilterMenu from "@/components/transactions/TransactionsFilterMenu";
import TransactionsSortMenu from "@/components/transactions/TransactionsSortMenu";
import AddExpenseForm from "@/components/forms/AddExpenseForm";
import AddIncomeForm from "@/components/forms/AddIncomeForm";
import ProtectedLayout from "@/components/layout/ProtectedLayout";

const TransactionsPage = () => {
    const theme = useTheme();
    const { showNotification, NotificationComponent } = useNotification();
    const { transactions, loading, fetchTransactions, removeTransaction } =
        useTransactions(showNotification);
    const {
        search, setSearch,
        page, setPage,
        pageCount,
        filters, handleFilterChange, setFilters,
        sort, setSort,
        paginatedTransactions,
        view, setView,
    } = useTransactionFilters(transactions);

    // --- State ---
    const [addMenuAnchor, setAddMenuAnchor] = useState(null);
    const [openAddExpense, setOpenAddExpense] = useState(false);
    const [openAddIncome, setOpenAddIncome] = useState(false);
    const [editingTx, setEditingTx] = useState(null); // { ...txData }

    // Delete Confirmation
    const [deleteTx, setDeleteTx] = useState(null); // { id, type }

    // Filter/Sort Menus
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [sortAnchorEl, setSortAnchorEl] = useState(null);

    // --- Handlers ---

    const handleAddClick = (event) => {
        setAddMenuAnchor(event.currentTarget);
    };

    const handleAddMenuClose = () => {
        setAddMenuAnchor(null);
    };

    const handleOpenAddExpense = () => {
        setEditingTx(null);
        setOpenAddExpense(true);
        handleAddMenuClose();
    };

    const handleOpenAddIncome = () => {
        setEditingTx(null);
        setOpenAddIncome(true);
        handleAddMenuClose();
    };

    const handleEdit = (tx) => {
        setEditingTx(tx);
        if (tx.type === "Expense") {
            setOpenAddExpense(true);
        } else if (tx.type === "Income") {
            setOpenAddIncome(true);
        }
    };

    const handleDeleteClick = (tx) => {
        setDeleteTx(tx);
    };

    const confirmDelete = async () => {
        if (!deleteTx) return;
        const success = await removeTransaction(deleteTx._id, deleteTx.type);
        if (success) {
            setDeleteTx(null);
        }
    };

    const handleFormSuccess = (message, type) => {
        showNotification(message, type);
        setOpenAddExpense(false);
        setOpenAddIncome(false);
        setEditingTx(null);
        fetchTransactions();
    };

    return (
        <ProtectedLayout>
            <Box sx={{ width: "100%", mx: "auto", p: 3 }}>
                <NotificationComponent />

                {/* Header */}

                {/* ... (rest of the content) */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 4,
                        mb: 4,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        Transactions
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAddClick}
                    >
                        Add Transaction
                    </Button>
                    <Menu
                        anchorEl={addMenuAnchor}
                        open={Boolean(addMenuAnchor)}
                        onClose={handleAddMenuClose}
                        PaperProps={{
                            sx: {
                                bgcolor: theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                borderRadius: 2,
                                p: 2,
                                mt: 1,
                            }
                        }}
                    >
                        <MenuItem onClick={handleOpenAddExpense} sx={{ borderRadius: 2 }}>Add Expense</MenuItem>
                        <MenuItem onClick={handleOpenAddIncome} sx={{ borderRadius: 2 }}>Add Income</MenuItem>
                    </Menu>
                </Box>

                {/* Controls */}
                <TransactionsControls
                    search={search}
                    setSearch={setSearch}
                    view={view}
                    setView={setView}
                    page={page}
                    setPage={setPage}
                    pageCount={pageCount}
                    filterAnchorEl={filterAnchorEl}
                    setFilterAnchorEl={setFilterAnchorEl}
                    sortAnchorEl={sortAnchorEl}
                    setSortAnchorEl={setSortAnchorEl}
                />

                {/* Table */}
                <TransactionsTable
                    transactions={paginatedTransactions}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />

                {/* --- Dialogs & Menus --- */}

                {/* Filter Menu */}
                <TransactionsFilterMenu
                    anchorEl={filterAnchorEl}
                    onClose={() => setFilterAnchorEl(null)}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    resetFilters={() => setFilters({ type: "All", minAmount: 0, maxAmount: 1000000, date: "" })}
                />

                {/* Sort Menu */}
                <TransactionsSortMenu
                    anchorEl={sortAnchorEl}
                    onClose={() => setSortAnchorEl(null)}
                    sort={sort}
                    setSort={setSort}
                />

                {/* Add/Edit Expense Dialog */}
                <Dialog
                    open={openAddExpense}
                    onClose={() => setOpenAddExpense(false)}
                    PaperProps={{
                        sx: {
                            bgcolor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            borderRadius: 3,
                            p: 1,
                            minWidth: 400,
                        },
                    }}
                >
                    <DialogTitle>{editingTx ? "Edit Expense" : "Add Expense"}</DialogTitle>
                    <DialogContent>
                        <AddExpenseForm
                            initialData={editingTx}
                            onSuccess={handleFormSuccess}
                            onCancel={() => setOpenAddExpense(false)}
                        />
                    </DialogContent>
                </Dialog>

                {/* Add/Edit Income Dialog */}
                <Dialog
                    open={openAddIncome}
                    onClose={() => setOpenAddIncome(false)}
                    PaperProps={{
                        sx: {
                            bgcolor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            borderRadius: 3,
                            p: 1,
                            minWidth: 400,
                        },
                    }}
                >
                    <DialogTitle>{editingTx ? "Edit Income" : "Add Income"}</DialogTitle>
                    <DialogContent>
                        <AddIncomeForm
                            initialData={editingTx}
                            onSuccess={handleFormSuccess}
                            onCancel={() => setOpenAddIncome(false)}
                        />
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={Boolean(deleteTx)}
                    onClose={() => setDeleteTx(null)}
                    PaperProps={{
                        sx: {
                            bgcolor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            borderRadius: 3,
                            p: 2,
                        },
                    }}
                >
                    <DialogTitle variant="h6">Delete Transaction</DialogTitle>
                    <DialogContent>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            Are you sure you want to delete this {deleteTx?.type}?
                            <br />
                            This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={() => setDeleteTx(null)} sx={{ color: theme.palette.text.disabled }}>
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete} color="error" variant="contained">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ProtectedLayout>
    );
};

export default TransactionsPage;