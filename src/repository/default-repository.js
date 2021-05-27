class Repository {
    constructor(Model) {
        this.Model = Model
    }

    /**
     * This is used to create/insert new data into a model.
     * @param {Object} payload 
     * @returns {Promise<Object|null>}
     */
    create = (payload) => {
        return this.Model.create(payload)
    }

    /**
     * This is user to query and find an item within a model.
     * @param {Object} query 
     * @returns {Promise<Object|null>}
     */
    findOne = (query) => {
        return this.Model.findOne(query);
    }
}

export default Repository;