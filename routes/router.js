
const initRouters = (app) => {
    app.use('/user', require('./user.js'));

    console.log('路由加载完毕');
}

const httpAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]?.trim();
        if (!token) throw new Error("token为空");

        const decoded = jwtVerify(token);
        
        const UserDb = require('../db/db.js').models.User;
        const user = await UserDb.findOne({ _id: dbObjectStr2Id(decoded.userId) });
        if (!user) throw new Error("token用户不存在");
        
        /// 将用户信息
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

module.exports = { initRouters, httpAuth };
