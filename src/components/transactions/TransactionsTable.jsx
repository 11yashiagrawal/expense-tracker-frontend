"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    useTheme,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { formatCurrency } from "@/utils/formatUtils";

const TransactionsTable = ({
    transactions,
    onEdit,
    onDelete,
}) => {
    const theme = useTheme();

    const getTypeColor = (type) => {
        switch (type) {
            case "Income":
                return theme.palette.primary.main;
            case "Expense":
                return theme.palette.error.main;
            case "Subscription":
                return theme.palette.warning.main;
            default:
                return theme.palette.text.secondary;
        }
    };

    const getTypeBgColor = (type) => {
        switch (type) {
            case "Income":
                return theme.palette.primary.dark; // Or a specific darker shade
            case "Expense":
                return theme.palette.error.dark;
            case "Subscription":
                return theme.palette.warning.dark;
            default:
                return theme.palette.action.hover;
        }
    }

    return (
        <TableContainer
            component={Paper}
            sx={{ bgcolor: theme.palette.background.paper, borderRadius: 4, mb: 2, p: 3 }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 900 }}>Title</TableCell>
                        <TableCell sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 900 }}>Amount</TableCell>
                        <TableCell sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 900 }}>Date</TableCell>
                        <TableCell sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 900 }}>Type</TableCell>
                        <TableCell align="right" sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 900 }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.length > 0 ? (
                        transactions.map((t, index) => (
                            <TableRow
                                key={t._id || index}
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                    transition: "background-color 0.4s ease",
                                    "&:hover": {
                                        bgcolor: theme.palette.action.hover,
                                    }
                                }}
                            >
                                <TableCell sx={{ color: theme.palette.text.primary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 600 }}>{t.title}</TableCell>
                                <TableCell sx={{ color: getTypeColor(t.type), borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 600 }}>
                                    {t.type === "Income" ? "+" : null}{formatCurrency(t.amount)}
                                </TableCell>
                                <TableCell sx={{ color: theme.palette.text.primary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 600 }}>
                                    {t.date ? new Date(t.date).toLocaleDateString() : "-"}
                                </TableCell>
                                <TableCell sx={{ borderBottom: `1px solid ${theme.palette.action.hover}` }}>
                                    <Chip
                                        label={t.type}
                                        size="small"
                                        sx={{
                                            bgcolor: getTypeBgColor(t.type),
                                            color: getTypeColor(t.type),
                                            textTransform: 'capitalize',
                                            fontWeight: 700
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right" sx={{ borderBottom: `1px solid ${theme.palette.action.hover}`, gap: 1 }}>
                                    {t.type !== "Subscription" && (
                                        <>
                                            <IconButton
                                                size="small"
                                                sx={{ color: theme.palette.text.primary, borderColor: "transparent" }}
                                                onClick={() => onEdit(t)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: theme.palette.error.main,
                                                    borderColor: "transparent",
                                                    "&:hover": {
                                                        bgcolor: theme.palette.error.dark,
                                                    }
                                                }}
                                                onClick={() => onDelete(t)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ color: theme.palette.text.primary, py: 5, borderBottom: "none" }}>
                                No transactions found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TransactionsTable;
