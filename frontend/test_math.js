const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/v1';

async function testMath() {
    console.log("Testing Numeric Math...");
    try {
        // 1. Register & Login
        const email = "math_test_" + Date.now() + "@test.com";
        await axios.post(`${BASE_URL}/register`, { name: "Math User", email, password: "password" });
        await axios.post(`${BASE_URL}/login`, { email, password: "password" });

        // 2. Add Income so we have balance
        await axios.post(`${BASE_URL}/add-income`, {
            title: "Salary", amount: 20000, category: "Salary", description: "Desc", date: new Date()
        });

        // 3. Add Expense 1: 5000
        await axios.post(`${BASE_URL}/add-expense`, {
            title: "Exp 1", amount: 5000, category: "One", description: "Desc", date: new Date()
        });

        // 4. Add Expense 2: 5000
        await axios.post(`${BASE_URL}/add-expense`, {
            title: "Exp 2", amount: 5000, category: "Two", description: "Desc", date: new Date()
        });

        // 5. Verify Total
        const res = await axios.get(`${BASE_URL}/get-expenses`);
        const expenses = res.data;

        let total = 0;
        expenses.forEach(e => {
            total = total + e.amount; // Should be number addition
        });

        console.log("Total Calculated:", total);

        if (total === 10000) {
            console.log("✅ SUCCESS: 5000 + 5000 = 10000");
        } else if (total === "050005000" || total === "50005000") {
            console.error("❌ FAILED: String Concatenation Detected!");
        } else {
            console.error("❌ FAILED: Unexpected Result:", total);
        }

    } catch (error) {
        console.error("Test Script Error:", error.message);
        if (error.response) console.error(error.response.data);
    }
}

testMath();
