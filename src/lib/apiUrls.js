export const API_URLS = {
    AUTH: {
        LOGIN: `/users/login`,
        SIGNUP: `/users/register`,
        LOGOUT: `/users/logout`,
        REFRESH_TOKEN: `/users/refresh-access-token`
    },
    USER:{
        CURRENT_USER: `/users/current-user`, //returns _id, first_name, last_name, email, phone_no, avatar, monthly_budget, balance and categories
        UPDATE_ACCOUNT_DETAILS: `/users/account-details`, //returns updated user object
        UPDATE_AVATAR: `/users/avatar`, //returns updated user object
        UPDATE_PASSWORD: `/users/change-password` // returns nothing, only success or error
    },
    CATEGORIES: {
        ADD_CATEGORY: `/users/categories`, //returns _id, user id, title, budget, icon and colour
        GET_ALL_CATEGORIES: `/users/categories`, //returns all categories in an array
        UPDATE_CATEGORY: `/users/categories/`, //returns updated category object, need to give id as a parameterin the url  
        UPDATE_CATEGORY_ICON: `/users/categories-icon/`, //returns updated category object, need to give id as a parameterin the url
        DELETE_CATEGORY: `/users/categories/` //returns nothing, only success or error, need to give id as a parameterin the url
    },
    EXPENSES: {
        ADD_EXPENSE: `/expenses/`, //returns user id, title, amount, date and category
        GET_ALL_EXPENSES: `/expenses/`, //returns all expense object in an array 
        GET_EXPENSE_FOR_DATES: `/expenses/`, //returns all expense object in an array in between the given dates, need to give start date and end date as parameter in the url
        UPDATE_EXPENSE: `/expenses/`, //returns updated expense object, need to give id as a parameter in the url
        DELETE_EXPENSE: `/expenses/`, //returns nothing, only success or error, need to give id as a parameter in the url
        EXPENDITURE_PER_CATEGORY: `/expenses/per-category/`, //returns all expense objects in an array in between the given dates grouped by category, need to give start date and end date as parameter in the url
        CATEGORY_EXPENDITURE: `/expenses/` //returns an object containing the categoryId, categoryName, expenditure , need to give category id, start date and end date as parameter in the url
    },
    INCOME: {
        ADD_INCOME: `/income/`, //returns user id, title, amount, date 
        GET_ALL_INCOME: `/income/`, //returns all income object in an array 
        GET_INCOME_FOR_DATES: `/income/`, //returns all income object in an array in between the given dates, need to give start date and end date as parameter in the url
        UPDATE_INCOME: `/income/`, //returns updated income object, need to give id as a parameter in the url
        DELETE_INCOME: `/income/`, //returns nothing, only success or error, need to give id as a parameter in the url
    },
    SUBSCRIPTIONS: {
        ADD_SUBSCRIPTION: `/subscriptions/`,//returns user id, title, amount, frequency, start date, end date, next payment date, active
        GET_ALL_SUBSCRIPTIONS: `/subscriptions/`,//returns all subscription object in an array
        PAYMENTS_THIS_MONTH: `/subscriptions/`,//returns all subscription object in an array in between the given dates, need to give start date and end date as a parameter in the url
        UPDATE_SUBSCRIPTION: `/subscriptions/`,//returns updated subscription object, need to give id as a parameter in the url
        DELETE_SUBSCRIPTION: `/subscriptions/`//returns nothing, only success or error, need to give id as a parameter in the url
    },
    TRANSACTIONS: {
        GET_ALL_TRANSACTIONS: `/transactions/`,//returns all transaction object in an array
    }
}