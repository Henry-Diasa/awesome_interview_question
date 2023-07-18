import React from 'react'

const warningFunc = () => {
    console.warn(false, '无法找到FormContext')
}

const context = React.createContext({
    getFieldValue: warningFunc,
    getFieldsValue: warningFunc,
    submit: warningFunc,
    setFieldsValue: warningFunc,
})


export default context