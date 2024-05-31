export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export function isPassword(value) {
    return value.length >= 6
}

export function isNumber(value) {
    const reg = /^[0-9]*$/
    return reg.test(value)
}

export function isName(value) {
    const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
    return reg.test(value)
}

export function isIP(ip) {
    const reg =
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip)
}

export function isUrl(url) {
    const reg =
        /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}

export function isLowerCase(value) {
    const reg = /^[a-z]+$/
    return reg.test(value)
}

export function isUpperCase(value) {
    const reg = /^[A-Z]+$/
    return reg.test(value)
}

export function isAlphabets(value) {
    const reg = /^[A-Za-z]+$/
    return reg.test(value)
}

export function isString(value) {
    return typeof value === 'string' || value instanceof String
}

export function isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
}

export function isPort(value) {
    const reg =
        /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    return reg.test(value)
}

export function isPhone(value) {
    const reg = /^1\d{10}$/
    return reg.test(value)
}

export function isIdCard(value) {
    const reg =
        /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    return reg.test(value)
}

export function isEmail(value) {
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return reg.test(value)
}

export function isChina(value) {
    const reg = /^[\u4E00-\u9FA5]{2,4}$/
    return reg.test(value)
}

export function isBlank(value) {
    return (
        value == null ||
        false ||
        value === '' ||
        value.trim() === '' ||
        value.toLocaleLowerCase().trim() === 'null'
    )
}

export function isNum(value) {
    const reg = /^\d+(\.\d{1,2})?$/
    return reg.test(value)
}

export function isLongitude(value) {
    const reg = /^[-|+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/
    return reg.test(value)
}

export function isLatitude(value) {
    const reg = /^[-|+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/
    return reg.test(value)
}

export function isRTSP(value) {
    const reg =
        /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    const reg1 =
        /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):[0-9]{1,5}/
    const reg2 =
        /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\//
    return reg.test(value) || reg1.test(value) || reg2.test(value)
}

export function isJson(value) {
    if (typeof value == 'string') {
        try {
            var obj = JSON.parse(value)
            if (typeof obj == 'object' && obj) {
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }
}
