import React from 'react'
import AsyncValidator from './async-validator'
class FormStore {
    store = {}
    fieldEntities = []
    initialValues = {}
    callbacks = {}
    constructor(forceRootUpdate) {
        this.forceRootUpdate = forceRootUpdate
    }
    getForm = () => ({
        getFieldValue: this.getFieldValue,
        getFieldsValue: this.getFieldsValue,
        setFieldsValue: this.setFieldsValue,
        setInitialValues: this.setInitialValues,
        setCallbacks: this.setCallbacks,
        registerField: this.registerField,
        submit: this.submit
    })
    setInitialValues = (initialValues) =>  {
        this.store = {...initialValues}
    }
    setCallbacks = (callbacks) => {
        this.callbacks = callbacks
    }
    getFieldValue = (name) => {
        return this.store[name]
    }
    getFieldsValue = () => {
        return this.store
    }
    registerField = (entity) => {
        this.fieldEntities.push(entity)
    }
    setFieldsValue = (store) => {
        this.store = {...this.store, ...store}
        // this.fieldEntities.forEach(({onStoreChange}) => {
        //     onStoreChange()
        // })
    }
    submit = () => {
        this.validateFields().then(values => {
            const { onFinish } = this.callbacks
            if(onFinish) {
                onFinish(values) 
            }
        }).catch(errorInfo => {
            const { onFinishFailed } = this.callbacks
            if(onFinishFailed) {
                onFinishFailed(errorInfo) 
            }
        })
    }
    validateFields = () => {
        let values = this.getFieldsValue()
        let descriptor = this.fieldEntities.reduce((descriptor, entity) => {
            let rules = entity.props.rules;
            if(rules && rules.length) {
                let config = rules.reduce((config, rule) => {
                    config = {...config, ...rule}
                    return config
                }, {})
                descriptor[entity.props.name] = config
            }
            return descriptor
        }, {})

        return new AsyncValidator(descriptor).validate(values)
    }
}

export default function useForm(form) {
    const formRef = React.useRef()
    const [, forceUpdate] = React.useState({})

    if(!formRef.current) {
        if (form) {
            formRef.current = form
        } else {
            const forceReRender = () => {
                forceUpdate({})
            }
            const formStore = new FormStore(forceReRender)
            formRef.current = formStore.getForm()
        }
    }

    return [formRef.current]
}