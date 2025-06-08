const db = require('../db/db');
const bcrypt = require('bcryptjs');

class User {
    constructor() {
        this.userDb = db.models.User;
    }

    /// 注册用户
    async registerUser(username, password) {
        /// 检查用户名、密码是否为空
        if (isStrValid(username) || isStrValid(password)) throw new Error('用户名不能为空');

        /// 密码转成哈希密码
        password = await hashPassword(password);

        /// 添加用户
        const userId = await this.userDb.addUser({
            username,
            password,
        });
        return userId;
    }

    /// 用户登录
    async loginUser(username, password) {
        /// 检查用户名、密码是否为空
        if (isStrValid(username) || isStrValid(password)) throw new Error('用户名或密码不能为空');

        /// 查询用户密码
        const user = this.userDb.getUserByUsername(username);
        
        /// 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('密码错误');
        
        /// 生成jwt
        const token = createToken(user._id);
        return token;
    }


}

module.exports = new User();