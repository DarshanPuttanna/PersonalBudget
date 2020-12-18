import axios from 'axios';

// Add Budget
export const addBudget = (id, data, token) => {
  return axios
    .post(`/pb/budget/create/${id}`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then(() => {
      return {
        success: true,
      };
    })
    .catch((err) => console.log(err));
};

// Get All Budgets
export const getBudgets = (id, token) => {
  return axios
    .get(`/pb/budget/all/budget/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getSomeBudgets = (id, token) => {
  return axios
    .get(`/pb/budget/all/budget/${id}?limit=3`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getChartBudgets = (id, token, month) => {
  ('inside getChartBudgets');
  return axios
    .get(`/pb/budget/month/chart/${id}?month=${month}&year=2020`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log('res ', res);
      return res.data;
    })
    .catch((err) => err);
};

export const getBudgetChart = (id, token) => {
  return (
    axios
      // .get(`/pb/budget/all/budget/${id}?order=desc&limit=5`, {
      .get(`/pb/budget/all/budget/${id}?limit=10&sortBy=expense&order=desc`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err))
  );
};

export const getChartExpenses = (id, token) => {
  return axios
    .get(`/pb/expense/all/expense/${id}?limit=5&sortBy=expense&order=desc`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// Add Expense
export const addExpense = (id, data, token) => {
  // ('id' , id)
  // ('data' , id)
  // ('token' , id)
  return axios
    .post(`/pb/expense/create/${id}`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return {
        success: true,
      };
    })
    .catch((err) => {
      if (err.response) {
        return err.response.data;
      }
    });
};

// Get All Expenses
export const getAllExpenses = (id, token) => {
  return axios
    .get(`/pb/expense/all/expense/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// Get some Expenses
export const getSomeExpenses = (id, token) => {
  return axios
    .get(`/pb/expense/all/expense/${id}?limit=3`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// Delete Expense
export const deleteExpense = (id, expenseId, token) => {
  return axios
    .delete(`/pb/expense/${expenseId}/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return {
        success: true,
      };
    })
    .catch((err) => console.log(err));
};

// Get Budget Total
export const budgetTotal = (id, token) => {
  return axios
    .get(`/pb/budget/sum/budget/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data[0].total;
    })
    .catch((err) => console.log(err));
};

// Get Expense Total
export const expenseTotal = (id, token) => {
  return axios
    .get(`/pb/expense/sum/expense/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data[0].total;
    })
    .catch((err) => console.log(err));
};

// Get Budget Based on Month
export const monthlyBudget = (id, token) => {
  return axios
    .get(`/pb/budget/month/budget/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const monthlyExpense = (id, token) => {
  return axios
    .get(`/pb/expense/month/expense/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const dailyExpense = (id, token) => {
  return axios
    .get(`/pb/expense/daily/expense/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getExpenseByBudgetTypeChart = (id, token) => {
  return (
    axios
      // .get(`/pb/expense/budget/expense/${id}?order=desc&limit=5`, {
      .get(`/pb/expense/budget/expense/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        'inside getExpenseByBudgetType', res.data;
        return res.data;
      })
      .catch((err) => console.log(err))
  );
};
