import React from 'react'
import FieldContext from './FieldContext'

class Field extends React.Component {
    static contextType = FieldContext
    componentDidMount() {
        this.context.registerField(this)
    }
    onStoreChange = () => {
        this.forceUpdate()
    }
    getControlled = (childProps) => {
        const {name} = this.props
        const {getFieldValue, setFieldsValue} = this.context
        return {
            ...childProps,
            value: getFieldValue(name),
            onChange: e => {
                setFieldsValue({[name]: e.target.value})
            }
        }
    }
    render() {
        const {children} = this.props
        const returnChildNode = React.cloneElement(children, this.getControlled(children.props))

        return returnChildNode
    }
}

export default Field