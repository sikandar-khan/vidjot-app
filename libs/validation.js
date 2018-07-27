const validator = require('validator');

const excludeFn = (excludes) => {
    return (prop) => {
        let index = -1;
        if (excludes.length > 0) {
            index = excludes.indexOf(prop);
            if (index > -1) {
                excludes.splice(index, 1);
            }
        }
        return index;
    }
}
const validateFields = (obj) => {
    return new Promise((resolve, reject) => {
        const errors = [];
        let excludes;
        if (obj.exFields) {
            excludes = excludeFn(obj.exFields);
        }
        for (const prop in obj.data) {
            if (validator.isEmpty(obj.data[prop])) {
                if (excludes) {
                    const ex = excludes(prop);
                    if (ex > -1) {
                        continue;
                    }
                }
                errors.push({
                    text: `field ${prop} is required!`
                });
            }
        }
        if (obj.matchPassword) {
            if (!validator.equals(obj.matchPassword[0], obj.matchPassword[1])) {
                errors.push({
                    text: 'password doest match with confirm password'
                });
            }
        }
        if (errors.length > 0) {
            reject(errors);
        } else {
            resolve('resolved');
        }
    });
}

module.exports = {
    validateFields
}