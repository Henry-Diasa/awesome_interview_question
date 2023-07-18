class Schema {
    constructor(descriptor) {
        this.descriptor = descriptor
    }
    validate(values) {
        return new Promise(async (resolve, reject) => {
            let errorFields = []
            for(let name in this.descriptor) {
                let rules = this.descriptor[name]
                if(rules) {
                    let ruleKeys = Object.keys(rules)
                    let errors = []
                    for(let i = 0; i < ruleKeys.length; i++) {
                        let ruleKey = ruleKeys[i]
                        // 具体校验规则
                        if(ruleKey === 'required') {
                            if(rules[ruleKey] && !values[name]) {
                                errors.push(`${name} is required`)
                            }
                        }else if(ruleKey === 'type') {
                            if(typeof values[name] !== rules[ruleKey]) {
                                errors.push(`${name} is not ${rules[ruleKey]}`)
                            }
                        }else if(ruleKey === 'min') {
                            if(values[name].length < rules[ruleKey]) {
                                errors.push(`${name} must be at least ${rules[ruleKey]} characters`)
                            }
                        }else if(ruleKey === 'validator') {
                            let validator = rules[ruleKey];
                            let result = await validator(rules[ruleKey], values[name])
                            if(result.length > 0) {
                                errors.push(`${name}不符合自定义验证器的需求`)
                            }
                        }
                        // and so on
                    }
                    if(errors && errors.length) {
                        errorFields.push({name, errors})
                    }
                }
            }
            if(errorFields && errorFields.length > 0) {
                reject({errorFields, values})
            }else{
                resolve(values)
            }
        })
    }
}

export default Schema