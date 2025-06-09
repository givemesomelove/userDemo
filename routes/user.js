const router = require('express').Router();

const userService = require('../service/user');
const { httpAuth } = require('./router');

/// 用户注册
router.post('/register', async(req, res) => {
    try {
        /// 判空
        const { username, password } = req.body;
        const userId = await userService.registerUser(username, password);
        res.status(201).json({ userId: userId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

/// 用户登录
router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        /// 登录
        const token = userService.loginUser(username, password);
        res.status(201).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

/// 获取用户信息
router.get('/userInfo', httpAuth, async (req, res) => {
    try {
        res.status(201).json(req.user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

module.exports = router;


