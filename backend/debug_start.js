try {
    require('dotenv').config();
    console.log("Dotenv loaded");
    require('./db/db');
    console.log("DB loaded");
    require('./models/UserModel');
    console.log("User Model loaded");
    require('./models/ExpenseModel');
    console.log("Expense Model loaded");
    require('./models/IncomeModel');
    console.log("Income Model loaded");
    require('./controllers/auth');
    console.log("Auth Controller loaded");
    require('./controllers/expense');
    console.log("Expense Controller loaded");
    require('./controllers/income');
    console.log("Income Controller loaded");
    require('./routes/auth');
    console.log("Auth Routes loaded");
    require('./routes/transactions');
    console.log("Transactions Routes loaded");
    console.log("All good");
} catch (e) {
    console.error("DIAGNOSTIC ERROR:");
    console.error(e);
}
