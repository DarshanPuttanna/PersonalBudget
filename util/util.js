const Budget = require('../models/Budget');
const jwt = require('jsonwebtoken');
const Expense = require('../models/Expense');
const expressJwt = require('express-jwt');
const User = require('../models/User');

// Get Budget By Id - Middleware
exports.getBudgetById = (req, res, next, id) => {
  Budget.findById(id).exec((err, budget) => {
    if (err) {
      return res.status(400).json({
        error: 'Budget not found',
      });
    }
    req.budget = budget;
    next();
  });
};

// Get a Budget
exports.getBudget = (req, res) => {
  Budget.findOne({ user: req.profile._id, _id: req.budget._id }).then(
    (budget) => {
      if (!budget) {
        return res.status(400).json({
          errors: 'Budget Not Found',
        });
      } else {
        return res.json(budget);
      }
    }
  );
};

// Create a Budget
exports.createBudget = (req, res) => {
  const today = new Date();
  Budget.findOne({
    user: req.params.id,
    name: req.body.name,
    month: req.body.month,
  }).then((budget) => {
    if (budget) {
      return res.status(400).json({
        errors: 'Budget Already Exists',
      });
    } else {
      const budget = new Budget({
        name: req.body.name,
        budget: req.body.budget,
        user: req.params.id,
        month: req.body.month,
      });
      budget
        .save()
        .then((budget) => {
          if (!budget) {
            return res.status(400).json({
              errors: 'Budget not created',
            });
          } else {
            return res.json(budget);
          }
        })
        .catch((err) => console.log(err));
    }
  });
};

// Update Budget
exports.updateBudget = (req, res) => {
  Budget.findOne({ name: req.body.name }).then((budget) => {
    if (budget) {
      return res.status(400).json({
        errors: 'Budget Already Exists',
      });
    } else {
      Budget.updateOne({ _id: req.budget._id }, req.body, (err, budget) => {
        if (err) {
          return res.status(400).json({
            errors: 'Budget not updated',
          });
        }
        return res.json(budget);
      });
    }
  });
};

// // Delete Budget
exports.deleteBudget = (req, res) => {
  const budget = req.budget;
  budget.deleteOne((err, budget) => {
    if (err) {
      return res.status(400).json({
        errors: 'Budget not deleted',
      });
    }
    return res.json({
      message: 'Budget Deleted',
    });
  });
};

// // Get all Budgets
exports.getAllBudgets = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let limit = req.query.limit && parseInt(req.query.limit);
  let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
  Budget.find({ user: req.params.id })
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, budgets) => {
      if (err) {
        return res.status(400).json({
          errors: err,
        });
      }
      return res.json(budgets);
    });
};
// get budgetchart to print data in chart form
exports.getBudgetChart = (req, res) => {
  const month = parseInt(req.query.month);
  const year = parseInt(req.query.year);
  Budget.aggregate(
    [
      {
        $match: { user: req.profile._id },
      },
      {
        $project: {
          doc: '$$ROOT',
          year: { $year: '$month' },
          month: { $month: '$month' },
        },
      },
      { $match: { month: month, year: year } },
    ],
    (err, budgets) => {
      if (err) {
        return res.status(400).json({
          errors: err,
        });
      }
      return res.json(budgets);
    }
  );
};

// Get Expense Total
exports.getTotal = (req, res) => {
  Budget.aggregate(
    [
      {
        $match: { user: req.profile._id },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: '$budget',
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(data);
    }
  );
};

// get budget based on Month
exports.getMonthBudget = (req, res) => {
  Budget.aggregate(
    [
      {
        $match: { user: req.profile._id },
      },
      {
        $group: {
          _id: { $month: '$month' },
          total: {
            $sum: '$budget',
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(data);
    }
  );
};

exports.protect = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
  algorithms: ['HS256'],
});

// to provide user Authentication
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!user) {
    return res.status(403).json({
      errors: 'Access Denied! Unauthorized User',
    });
  }
  next();
};

// to provide token authentication
exports.authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      errors: 'Token expired',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        errors: err,
      });
    }
    req.user = user;
    next();
  });
};

// get Expense By Id
exports.getExpenseById = (req, res, next, id) => {
  Expense.findById(id).exec((err, expense) => {
    if (err) {
      return res.status(400).json({
        error: 'Expense not found',
      });
    }
    req.expense = expense;
    next();
  });
};

//Get an Expense (single expense value)
exports.getExpense = (req, res) => {
  Expense.findOne({ user: req.params.id, _id: req.expense._id }).then(
    (expense) => {
      if (!expense) {
        return res.status(400).json({
          errors: 'Expense Not Found',
        });
      } else {
        return res.json(expense);
      }
    }
  );
};

// Create an Expense
exports.createExpense = (req, res) => {
  Expense.findOne({ user: req.params.id, name: req.body.name }).then(
    (expense) => {
      if (expense) {
        return res.status(400).json({
          errors: 'Expense Already Exists',
        });
      } else {
        const expense = new Expense({
          name: req.body.name,
          expense: req.body.expense,
          budget: req.body.budget,
          user: req.params.id,
          datetime: req.body.datetime,
        });
        expense
          .save()
          .then(async function updateBudgetCapacity(expense) {
            if (!expense) {
              return res.status(400).json({
                errors: 'Expense not created',
              });
            } else {
              console.log('here inside create');
              console.log(expense.budget._id, expense.expense);
              budget = await Budget.findByIdAndUpdate(
                { _id: expense.budget._id },
                { $inc: { capacity: expense.expense } }
              );
              if (budget) {
                console.log('inside budget update successfully');
                return res.json(expense);
              } else {
                this.deleteExpense(expense);
                throw err;
              }
            }
          })
          .catch((err) => {
            console.log('inside catch error');
            return res.status(400).json({
              errors: err,
            });
          });
      }
    }
  );
};

// Update an Expense
exports.updateExpense = (req, res) => {
  Expense.findOne({ user: req.params.id, name: req.body.name }).then(
    (expense) => {
      if (expense) {
        return res.status(400).json({
          errors: 'Expense Already Exists',
        });
      } else {
        Expense.updateOne(
          { _id: req.expense._id },
          req.body,
          (err, expense) => {
            if (err) {
              return res.status(400).json({
                errors: 'Expense not updated',
              });
            }
            return res.json(expense);
          }
        );
      }
    }
  );
};

// // Delete an Expense
exports.deleteExpense = (req, res) => {
  const expense = req.expense;
  expense.deleteOne((err, expense) => {
    if (err) {
      return res.status(400).json({
        errors: 'Expense not deleted',
      });
    }
    return res.json({
      message: 'Expense Deleted',
    });
  });
};

// Get all Expenses
exports.getAllExpenses = (req, res) => {
  console.log('inside get all expenses');
  let errors = {};
  let order = req.query.order ? req.query.order : 'asc';
  let limit = req.query.limit && parseInt(req.query.limit);
  let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
  Expense.find({ user: req.params.id })
    .populate('budget')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, expenses) => {
      if (err) {
        errors.expense = 'Expense not found';
        return res.status(400).json(errors);
      }
      return res.json(expenses);
    });
};

// Get all Expenses based on budget type
exports.getExpenseBudget = (req, res) => {
  let errors = {};
  let order = req.query.order ? req.query.order : 'asc';
  Expense.find({ user: req.params.id, budget: req.params.budgetId })
    .populate('budget')
    .sort([[order]])
    .exec((err, expenses) => {
      if (err) {
        errors.expense = 'Expense not found';
        return res.status(400).json(errors);
      }
      return res.json(expenses);
    });
};

// Get total value of expense
exports.getTotal = (req, res) => {
  Expense.aggregate(
    [
      {
        $match: { user: req.profile._id },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: '$expense',
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(data);
    }
  );
};

// get expense based on month
exports.MonthlyExpense = (req, res) => {
  Expense.aggregate(
    [
      {
        $match: { user: req.profile._id },
      },
      {
        $group: {
          _id: { $month: '$datetime' },
          total: {
            $sum: '$expense',
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(data);
    }
  );
};

//get the daily expense
exports.DailyExpense = (req, res) => {
  Expense.aggregate(
    [
      {
        $match: { user: req.profile._id },
      },
      {
        $group: {
          _id: { $dayOfMonth: '$datetime' },
          total: {
            $sum: '$expense',
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(data);
    }
  );
};

// get expense based on budget type
exports.ExpenseByBudgetType = (req, res) => {
  Expense.aggregate(
    [
      {
        $match: { user: req.profile._id },
      },
      {
        $group: {
          _id: '$budget',
          total: {
            $sum: '$expense',
          },
        },
      },
      {
        $lookup: {
          from: Budget.collection.name,
          localField: '_id',
          foreignField: '_id',
          as: 'budgetname',
        },
      },
    ],
    (err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      console.log('budgetexpense', data);
      return res.json(data);
    }
  );
};
// Get User By Id
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        errors: 'User not found',
      });
    }
    req.profile = user;
    next();
  });
};
