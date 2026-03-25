const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/database.json');

// Initial load
let data = {
    users: [],
    incomes: [],
    expenses: []
};

try {
    if (fs.existsSync(dbPath)) {
        const fileContent = fs.readFileSync(dbPath, 'utf-8');
        data = JSON.parse(fileContent);
        console.log("Database loaded from file.");
    } else {
        console.log("Database file not found, creating new one.");
        saveData();
    }
} catch (error) {
    console.error("Error loading database:", error);
}

// Save function
const saveData = () => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
        // console.log("Database saved."); 
    } catch (error) {
        console.error("Error saving database:", error);
    }
};

module.exports = {
    users: data.users,
    incomes: data.incomes,
    expenses: data.expenses,
    saveData
};
