const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/v1';

async function testValidation() {
    console.log("Testing Expense Validation...");
    try {
        // 1. Register & Login
        const email = "val_test_" + Date.now() + "@test.com";
        await axios.post(`${BASE_URL}/register`, { name: "Val User", email, password: "password" });
        const loginRes = await axios.post(`${BASE_URL}/login`, { email, password: "password" });
        // Note: Token is not used in this simple mock controller, but good practice.
        console.log("Logged in.");

        // 2. Add Income: 50,000
        await axios.post(`${BASE_URL}/add-income`, {
            title: "Salary", amount: 50000, category: "Salary", description: "Desc", date: new Date()
        });
        console.log("Added Income: 50,000");

        // 3. Attempt Expense: 55,000 (Should Fail)
        try {
            await axios.post(`${BASE_URL}/add-expense`, {
                title: "Car", amount: 55000, category: "Car", description: "Desc", date: new Date()
            });
            console.error("❌ TEST FAILED: Overdraft expense was allowed!");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("✅ SUCCESS: 55,000 expense rejected (Insufficient Balance).");
            } else {
                console.error("❌ TEST FAILED: Unexpected error", error.message);
            }
        }

        // 4. Attempt Expense: 5,000 (Should Pass)
        await axios.post(`${BASE_URL}/add-expense`, {
            title: "Rent", amount: 5000, category: "Rent", description: "Desc", date: new Date()
        });
        console.log("✅ SUCCESS: 5,000 expense added.");

        // Balance is now 45,000

        // 5. Attempt Expense: 46,000 (Should Fail)
        try {
            await axios.post(`${BASE_URL}/add-expense`, {
                title: "Laptop", amount: 46000, category: "Tech", description: "Desc", date: new Date()
            });
            console.error("❌ TEST FAILED: Overdraft expense was allowed!");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("✅ SUCCESS: 46,000 expense rejected (Insufficient Balance).");
            } else {
                console.error("❌ TEST FAILED: Unexpected error", error.message);
            }
        }

    } catch (error) {
        console.error("Test Script Error:", error.message);
    }
}

testValidation();
