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
    Pagination,
    useTheme,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import SubscriptionForm from "@/components/forms/SubscriptionForm";
import { useNotification } from "@/utils/notificationUtils";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { useSubscriptionFilters } from "@/hooks/useSubscriptionFilters";
import FilterMenu from "@/components/subscriptions/FilterMenu";
import SortMenu from "@/components/subscriptions/SortMenu";
import SubscriptionsTable from "@/components/subscriptions/SubscriptionsTable";
import SubscriptionsControls from "@/components/subscriptions/SubscriptionsControls";

export default function Subscriptions() {
    const [view, setView] = useState("all");
    const { showNotification, NotificationComponent } = useNotification();
    const { subscriptions, loading, fetchSubscriptions, removeSubscription } =
        useSubscriptions(view, showNotification);

    // Dialogs State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingSubscription, setEditingSubscription] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // UI State for menus
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [sortAnchorEl, setSortAnchorEl] = useState(null);

    const theme = useTheme();

    // Filter & Logic Hook
    const {
        search,
        setSearch,
        page,
        setPage,
        filters,
        setFilters,
        handleFilterChange,
        sort,
        setSort,
        paginatedSubscriptions,
        pageCount,
    } = useSubscriptionFilters(subscriptions);

    const handleFormSuccess = (message, severity) => {
        setIsFormOpen(false);
        setEditingSubscription(null);
        showNotification(message, severity);
        fetchSubscriptions();
    };

    const handleDelete = async () => {
        const success = await removeSubscription(deleteId);
        if (success) {
            setDeleteId(null);
        }
    };

    return (
        <ProtectedLayout>
            <Box sx={{ p: 3 }}>
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Subscriptions
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setEditingSubscription(null);
                            setIsFormOpen(true);
                        }}
                    >
                        Add Subscription
                    </Button>
                </Box>

                {/* Controls */}
                <SubscriptionsControls
                    search={search}
                    setSearch={setSearch}
                    page={page}
                    setPage={setPage}
                    pageCount={pageCount}
                    view={view}
                    setView={setView}
                    filterAnchorEl={filterAnchorEl}
                    setFilterAnchorEl={setFilterAnchorEl}
                    sortAnchorEl={sortAnchorEl}
                    setSortAnchorEl={setSortAnchorEl}
                />

                {/* Table */}
                <SubscriptionsTable
                    subscriptions={paginatedSubscriptions}
                    onEdit={(sub) => {
                        setEditingSubscription(sub);
                        setIsFormOpen(true);
                    }}
                    onDelete={(id) => setDeleteId(id)}
                />

                {/* --- Dialogs & Menus --- */}

                {/* Add/Edit Subscription Dialog */}
                <Dialog
                    open={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: { borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary },
                    }}
                >
                    <DialogTitle sx={{ fontWeight: 700 }}>
                        {editingSubscription ? "Edit Subscription" : "Add Subscription"}
                    </DialogTitle>
                    <DialogContent>
                        <SubscriptionForm
                            onSuccess={handleFormSuccess}
                            onCancel={() => setIsFormOpen(false)}
                            initialData={editingSubscription}
                        />
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={!!deleteId}
                    onClose={() => setDeleteId(null)}
                    PaperProps={{
                        sx: { borderRadius: 4, bgcolor: theme.palette.background.paper, color: theme.palette.text.primary },
                    }}
                >
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete this subscription?
                        </Typography>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button
                            onClick={() => setDeleteId(null)}
                            sx={{ color: theme.palette.text.disabled }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} variant="contained" color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Filter Menu */}
                <FilterMenu
                    anchorEl={filterAnchorEl}
                    onClose={() => setFilterAnchorEl(null)}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    resetFilters={() =>
                        setFilters({
                            frequency: "All",
                            minAmount: 0,
                            maxAmount: 10000,
                            nextPaymentDate: "",
                        })
                    }
                />

                {/* Sort Menu */}
                <SortMenu
                    anchorEl={sortAnchorEl}
                    onClose={() => setSortAnchorEl(null)}
                    sort={sort}
                    setSort={setSort}
                />

                <NotificationComponent />
            </Box>
        </ProtectedLayout>
    );
}