export interface LzhCollection {
    /**
     * 将数据库 ID 转换为字符串。
     *
     * @param objId - 数据库中的 ID。
     * @returns 转换后的字符串形式的 ID。
     */
    objId2Str(objId: any): String;

    /**
     * 将字符串形式的 ID 转换为数据库 ID。
     *
     * @param id - 字符串形式的 ID。
     * @returns 转换后的数据库 ID。
     */
    str2ObjId(id: String): any;

    /**
     * 添加一个对象到数据库。
     *
     * @param obj - 要添加的对象。
     * @returns 一个 Promise，解析为添加成功后的对象 ID（字符串形式）。
     */
    addObj(obj: Object): Promise<String>;

    /**
     * 根据 ID 删除数据库中的对象。
     *
     * @param id - 要删除的对象的 ID（字符串形式）。
     * @returns 一个 Promise，解析为删除成功后的对象 ID（字符串形式）。
     */
    removeObj(id: String): Promise<String>;

    /**
     * 根据 ID 更新数据库中的对象。
     *
     * @param id - 要更新的对象的 ID（字符串形式）。
     * @param obj - 更新后的对象数据。
     * @returns 一个 Promise，解析为更新成功后的对象 ID（字符串形式）。
     */
    updateObj(id: String, obj: Object): Promise<String>;

    /**
     * 根据 ID 获取数据库中的对象。
     *
     * @param id - 要获取的对象的 ID（字符串形式）。
     * @returns 一个 Promise，解析为获取到的对象。
     */
    getObjById(id: String): Promise<Object>;
}
