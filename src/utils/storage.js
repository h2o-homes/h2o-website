const LS = {

    age: 1 * 30 * 24 * 60 * 60 * 1000,

    /**
     * @param age
     * @returns { exports }
     */
    setAge(age) {
        this.age = age;

        if (this.key) {
            this.set(this.key, this.value);
        }

        return this;
    },

    /**
     * @param key
     * @param value
     */
    set(key, value) {
        const isObject = value instanceof Object;
        const time = new Date().getTime();
        const age = time + this.age;
        const storage = {
            time,
            age,
            isObject
        };

        this.key = key;
        this.value = value;

        localStorage.removeItem(key);

        storage.value = value;

        localStorage.setItem(key, JSON.stringify(storage));

        return this;
    },

    /**
     * @param key
     * @returns {boolean}
     */
    isExpire(key) {
        let isExpire = true;
        const value = localStorage.getItem(key);
        const now = new Date().getTime();

        if (value) {
            const storage = JSON.parse(value);

            isExpire = now > storage.age;
        }

        return isExpire;
    },

    /**
     * @param key
     * @returns {*}
     */
    get(key) {
        const isExpire = this.isExpire(key);

        if (isExpire) {
            localStorage.removeItem(key);

            return null;
        }

        const value = localStorage.getItem(key);
        const storage = JSON.parse(value);

        return storage.value;
    }
};

export default LS;
