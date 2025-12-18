"use client";

import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,  
    TableBody,
    IconButton,
    useTheme,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { formatCurrency } from "@/utils/formatUtils";

const SubscriptionsTable = ({
    subscriptions,
    onEdit,
    onDelete,
}) => {
    const theme = useTheme();
    return (
        <TableContainer
            component={Paper}
            sx={{ bgcolor: theme.palette.background.paper, borderRadius: 4, mb: 2, p:3 }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 900 }}
                        >
                            Title
                        </TableCell>
                        <TableCell
                            sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 900 }}
                        >
                            Amount
                        </TableCell>
                        <TableCell
                            sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 900 }}
                        >
                            Frequency
                        </TableCell>
                        <TableCell
                            sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 900 }}
                        >
                            Next Payment
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{ color: theme.palette.text.secondary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 900 }}
                        >
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscriptions.length > 0 ? (
                        subscriptions.map((sub, index) => (
                            <TableRow
                                key={sub._id || index}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 },
                                    transition: "background-color 0.4s ease",
                                    "&:hover": {
                                        bgcolor: theme.palette.action.hover,
                                    } }}
                            >
                                <TableCell
                                    sx={{
                                        color: theme.palette.text.primary,
                                        borderBottom: `1px solid ${theme.palette.action.hover}`,
                                        fontWeight: 600,
                                    }}
                                >
                                    {sub.title}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: theme.palette.primary.brightText,
                                        borderBottom: `1px solid ${theme.palette.action.hover}`,
                                        fontWeight: 600,
                                    }}
                                >
                                    {formatCurrency(sub.amount)}
                                </TableCell>
                                <TableCell
                                    sx={{ color: theme.palette.text.primary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 600 }}
                                >
                                    {sub.frequency || "-"}
                                </TableCell>
                                <TableCell
                                    sx={{ color: theme.palette.text.primary, borderBottom: `1px solid ${theme.palette.action.hover}`, fontWeight: 600 }}
                                >
                                    {sub.nextPaymentDate
                                        ? new Date(sub.nextPaymentDate).toLocaleDateString()
                                        : "-"}
                                </TableCell>
                                <TableCell
                                    align="right"
                                    sx={{ borderBottom: `1px solid ${theme.palette.action.hover}` , gap: 1}}
                                >
                                    <IconButton
                                        size="small"
                                        sx={{ color: theme.palette.text.primary, borderColor: "transparent" }}
                                        onClick={() => onEdit(sub)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        sx={{ color: theme.palette.error.main, borderColor: "transparent",
                                            "&:hover": {
                                                bgcolor: theme.palette.error.dark,
                                            }
                                         }}
                                        onClick={() => onDelete(sub._id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                align="center"
                                sx={{ color: theme.palette.text.primary, py: 5, borderBottom: "none" }}
                            >
                                No subscriptions found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SubscriptionsTable;
