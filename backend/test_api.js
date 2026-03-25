const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/v1';

const testAuth = async () => {
    try {
        const email = `test${Date.now()}@example.com`;
        const password = 'password123';

        console.log('1. Testing Register...');
        const registerRes = await axios.post(`${BASE_URL}/register`, {
            name: 'Test Agent',
            email,
            password
        });
        console.log('Register Success:', registerRes.data);

        console.log('2. Testing Login...');
        const loginRes = await axios.post(`${BASE_URL}/login`, {
            email,
            password
        });
        console.log('Login Success:', loginRes.data);

    } catch (error) {
        console.error('API Test Failed:', error.response ? error.response.data : error.message);
    }
};

testAuth();
