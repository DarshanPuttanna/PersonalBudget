const express = require('express');
const router = express.Router();

const {
  getExpenseById,
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
  getExpenseBudget,
  getTotal,
  MonthlyExpense,
  DailyExpense,
  ExpenseByBudgetType,
} = require('../../util/util');
const { protect, isAuth, authToken } = require('../../util/util');
const { userById } = require('../../util/util');

// @route GET /pb/expense/:expenseId
router.get('/:expenseId/:id', protect, isAuth, authToken, getExpense);

// @route POST /pb/expense/create
router.post('/create/:id', protect, isAuth, authToken, createExpense);

// @route PUT /pb/expense/:expenseId/:id
router.put('/:expenseId/:id', protect, isAuth, authToken, updateExpense);

// @route DELETE /pb/expense/:expenseId/:id
router.delete('/:expenseId/:id', protect, isAuth, authToken, deleteExpense);

// @route GET /pb/expense/all/expense
router.get('/all/expense/:id', protect, isAuth, authToken, getAllExpenses);

// @route GET /pb/expense/all/expense/:id/:budgetId
router.get(
  '/all/expense/:id/:budgetId',
  protect,
  isAuth,
  authToken,
  getExpenseBudget
);

// @route GET /pb/expense/sum/expense/:id
router.get('/sum/expense/:id', protect, isAuth, authToken, getTotal);

// @route GET /pb/month/month/:id
router.get('/month/expense/:id', protect, isAuth, authToken, MonthlyExpense);

// @route GET /pb/expense/sum/expense/:id
router.get('/daily/expense/:id', protect, isAuth, authToken, DailyExpense);

// @route GET /pb/expense/budget/expense/:id
router.get(
  '/budget/expense/:id',
  protect,
  isAuth,
  authToken,
  ExpenseByBudgetType
);

// @route PARAM id
router.param('id', userById);

// @route PARAM budgetId
router.param('expenseId', getExpenseById);

module.exports = router;
