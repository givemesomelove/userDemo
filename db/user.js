class User {
    constructor(db) {
        this.collection = db.collection("users");
        this.init();
    }

    /// 初始化
    async init() {
        try {
            /// 创建用户表姓名索引
            await this.collection.createIndex(
                { username: 1 },
                { unique: true }
            );
            console.log("用户表索引创建成功");
        } catch (error) {
            console.error("用户表索引创建失败:", error);
        }
    }

    /// 新增用户
    async addUser(userData) {
        /// 检查用户名是否已存在
        const existingUser = await this.collection.findOne({
            username: userData.username,
        });
        if (existingUser) throw new Error("用户名已存在");

        /// 插入新用户
        const now = new Date();
        const user = {
            username: userData.username,
            password: userData.password,
            createAt: now,
            updateAt: now,
        };
        const res = await this.collection.insertOne(user);
        /// 返回用户id字符串
        return dbObjectId2Str(res.insertedId);
    }

    /// 更新用户信息
    async updateUser(userId, userData) {
        /// 检查用户是否存在
        const user = await this.collection.findOne({
            _id: dbObjectStr2Id(userId),
        });
        if (!user) throw new Error("用户不存在");

        /// 如果修改用户名，检查是否已存在用户名
        if (userData.username) {
            const existingUser = await this.collection.findOne({
                username: userData.username,
            });
            if (existingUser) throw new Error("用户名已存在");
        }

        /// 更新用户信息
        const updateData = {
            ...userData,
            updateAt: new Date(),
        };
        await this.collection.updateOne(
            { _id: dbObjectStr2Id(userId) },
            { $set: updateData }
        );
        return true;
    }

    /// 删除用户
    async deleteUser(userId) {
        /// 检查用户是否存在
        const user = await this.collection.findOne({
            _id: dbObjectStr2Id(userId),
        });
        if (!user) throw new Error("用户不存在");

        /// 删除用户
        await this.collection.deleteOne({ _id: dbObjectStr2Id(userId) });
        return true;
    }

    /// 根据用户id查询用户信息
    async getUserByUserId(userId) {
        /// 检查用户是否存在
        const user = this.collection.findOne({ _id: dbObjectStr2Id(userId) });
        if (!user) throw new Error("用户不存在");

        // 转换 _id 为字符串
        user._id = userId;
        return user;
    }

    /// 根据用户名查询用户信息
    async getUserByUsername(username) {
        /// 检查用户名是否存在
        const user = await this.collection.findOne({ username: username });
        if (!user) throw new Error("用户名不存在");

        // 转换 _id 为字符串
        user._id = dbObjectId2Str(user._id);
        return user;
    }
}

module.exports = User;
