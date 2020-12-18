const express = require('express');
const router = express.Router();

const {
  getBudgetById,
  createBudget,
  getBudget,
  updateBudget,
  deleteBudget,
  getAllBudgets,
  getTotal,
  getMonthBudget,
  getBudgetChart,
} = require('../../util/util');
const { protect, isAuth, authToken } = require('../../util/util');
const { userById } = require('../../util/util');

// @route GET /pb/budget/:budgetId
router.get('/:budgetId/:id', protect, isAuth, authToken, getBudget);

// @route POST /pb/budget/create
router.post('/create/:id', protect, isAuth, authToken, createBudget);

// @route PUT /pb/budget/:budgetId/:id
router.put('/:budgetId/:id', protect, isAuth, authToken, updateBudget);

// @route DELETE /pb/budget/:budgetId/:id
router.delete('/:budgetId/:id', protect, isAuth, authToken, deleteBudget);

// @route GET /pb/budget/all/budget
router.get('/all/budget/:id', protect, isAuth, authToken, getAllBudgets);

// @route GET /pb/budget/sum/:id
router.get('/sum/budget/:id', protect, isAuth, authToken, getTotal);

// @route GET /pb/budget/month/:id
router.get('/month/budget/:id', protect, isAuth, authToken, getMonthBudget);

// @route GET /pb/budget/month/chart/:id
router.get('/month/chart/:id', protect, isAuth, authToken, getBudgetChart);

// @route PARAM id
router.param('id', userById);

// @route PARAM budgetId
router.param('budgetId', getBudgetById);

module.exports = router;
