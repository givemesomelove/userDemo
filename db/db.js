const { MongoClient } = require("mongodb");

class Db {
    constructor() {
        this.client = null;
        this.db = null;
        this.isConnected = false;
        this.models = {};
    }

    /// 单例模式
    static getInstance() {
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }

    /// 连接数据库
    async connect() {
        if (this.isConnected) return this.db;

        try {
            console.log("正在连接数据库...");

            const url = `mongodb://localhost:27017`;
            this.client = new MongoClient(url, {});

            await this.client.connect();
            this.db = this.client.db("userDemo");

            /// 验证连接
            await this.db.command({ ping: 1 });
            this.isConnected = true;
            console.log("数据库连接成功");

            /// 初始化模型
            await this.initModels();

            /// 发送数据库连接成功的全局通知
            

            return this.db;
        } catch (err) {
            console.error("数据库连接失败:", err);
            process.exit(1);
        }
    }

    /// 初始化模型
    async initModels() {
        /// 用户表
        const UesrDb = require("./user");
        this.models.User = new UesrDb(this.db);

        console.log("初始化数据库模型完成");
    }

    /// 断开数据库连接
    async close() {
        if (this.client) {
            await this.client.close();
            this.isConnected = false;
            console.log("数据库连接已关闭");
        }
    }
}

module.exports = Db.getInstance();
