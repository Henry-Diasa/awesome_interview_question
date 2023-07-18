import React from 'react';
import ReactDOM from 'react-dom/client';
import Form, {Field} from './rc-field-form'

const root = ReactDOM.createRoot(document.getElementById('root'));
let uniqueValidator = (rule, value, callback, form) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(value === 'xxyy') {
        resolve('名字被占用')
      }else{
        resolve('')
      }
    }, 3000)
  })
}
root.render(
  <React.StrictMode>
    <Form
      initialValuse={{username: '', password: ''}}
      onFinish={values => {
        console.log('完成', values)
      }}
      onFinishFailed={(errorInfo) => {
        console.log('失败', errorInfo)
      }}
    >
      <Field name="username" rules={[{required: true}, {min: 3}, {validator: uniqueValidator}]}>
        <input placeholder='用户名'></input>
      </Field>
      <Field name="password" rules={[{required: true}]}>
        <input placeholder='密码'></input>
      </Field>
      <button>提交</button>
    </Form>
  </React.StrictMode>
);


