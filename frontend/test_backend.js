const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/v1';

async function testAuth() {
    console.log("Testing Backend connection...");
    try {
        // 1. Register
        console.log("1. Attempting Registration...");
        const regRes = await axios.post(`${BASE_URL}/register`, {
            name: "Test User",
            email: "debug_" + Date.now() + "@test.com",
            password: "password123"
        });
        console.log("Registration Success:", regRes.data);

        // 2. Login
        console.log("2. Attempting Login...");
        const loginRes = await axios.post(`${BASE_URL}/login`, {
            email: regRes.config.data ? JSON.parse(regRes.config.data).email : "test@test.com",
            password: "password123"
        });
        console.log("Login Success:", loginRes.data);
        console.log("Backend Auth is WORKING!");

    } catch (error) {
        console.error("Test Failed:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testAuth();
