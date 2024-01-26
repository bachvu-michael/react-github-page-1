
const convertKeysToLowerCase: any = (obj: any) => {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToLowerCase(item));
    }

    return Object.keys(obj).reduce((acc: any, key) => {
        const newKey = key.toLowerCase();
        acc[newKey] = convertKeysToLowerCase(obj[key]);
        return acc;
    }, {});
}

export {
    convertKeysToLowerCase
}