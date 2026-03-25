const router = require('express').Router();
const { register, login, logout, getUser } = require('../controllers/auth');
const auth = require('../middleware/auth');

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/forgot-password', require('../controllers/auth').forgotPassword)
router.put('/reset-password/:token', require('../controllers/auth').resetPassword)
router.get('/get-user', auth, getUser)

module.exports = router;
