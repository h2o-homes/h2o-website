class EventBus {
    constructor() {
        this.key = 0
        this._eventList = {}
    }

    static Instance() {
        if (!EventBus._instance) {
            Object.defineProperty(EventBus, '_instance', {
                value: new EventBus()
            })
        }
        return EventBus._instance
    }
    onEvent(type, fn) {
        if (!this._eventList[type]) {
            this._eventList[type] = {}
        }

        this._eventList[type][++this.key] = fn
        return this.key
    }
    emitEvent(type, data) {
        const map = this._eventList[type]
        if (map) {
            Object.keys(map).forEach((key) => {
                map[key] && map[key](data)
            })
        }
    }
    offEvent(type, key) {
        if (this._eventList[type] && key) delete this._eventList[type][key]
    }
}

export default EventBus.Instance()
