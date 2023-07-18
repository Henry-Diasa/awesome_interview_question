import React from 'react'
import userForm from './userForm'
import FieldContext from './FieldContext'


const Form = ({initialValues, onFinish, onFinishFailed, children}) => {
    const [formInstance] = userForm()
    formInstance.setCallbacks({
        onFinish,
        onFinishFailed
    })
    // 只有第一次设置初始值
    const mountRef = React.useRef(null)
    formInstance.setInitialValues(initialValues, !mountRef.current)
    if(!mountRef.current) {
        mountRef.current = true
    }
    return (
        <form
            onSubmit={event => {
                event.preventDefault()
                event.stopPropagation()
                formInstance.submit()
            }}
        >
            <FieldContext.Provider value={formInstance}>
                {children}
            </FieldContext.Provider>
        </form>
    )
    
}


export default Form 