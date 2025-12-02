"use client";

import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import BudgetsList from "@/components/budgets/BudgetsList";
import BudgetDetails from "@/components/budgets/BudgetDetails";
import { getExpenditurePerCategory } from "@/services/expenses";
import { getMonthDates } from "@/utils/dateUtils";

export default function Budget() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const now = new Date();
      const { start, end } = getMonthDates(now.getFullYear(), now.getMonth());

      const response = await getExpenditurePerCategory(start, end);
      const data = response.data || [];
      setCategories(data);
      
      // Select the first category by default if none selected
      if (!selectedCategory && data.length > 0) {
        setSelectedCategory(data[0]);
      } else if (selectedCategory) {
        // Update selected category data if it exists in new data
        const updated = data.find(c => (c._id || c.categoryName) === (selectedCategory._id || selectedCategory.categoryName));
        if (updated) setSelectedCategory(updated);
      }
    } catch (error) {
      console.error("Failed to fetch budget data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ProtectedLayout>
      <Box sx={{ p: 3, height: "calc(100vh - 80px)", display: "flex", gap: 4 }}>
        <Box sx={{ width: 400, flexShrink: 0, height: "100%" }}>
          <BudgetsList 
            categories={categories}
            isLoading={isLoading}
            onSelectCategory={setSelectedCategory}
            selectedCategoryId={selectedCategory?._id || selectedCategory?.categoryName}
            onRefresh={fetchData}
          />
        </Box>
        <Box sx={{ flex: 1, height: "100%", overflow: "auto" }}>
          <BudgetDetails category={selectedCategory} />
        </Box>
      </Box>
    </ProtectedLayout>
  );
}