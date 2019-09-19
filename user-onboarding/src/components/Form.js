import React from 'react';
import { withFormik, Form, Field } from "formik";


const FormDetails = () => {

    return(
        <div className="form-container">
            <Form>
                <Field type="text" name="name" placeholder="Name"/>
                <Field type="text" name="email" placeholder="Email"/>
                <Field type="text" name="password" placeholder="Password"/>
                <Field type="checkbox" name="termsOfService"/>
                <button type="submit">Submit</button>
            </Form>

        </div>

    )
    
}
const formikFormDetails = withFormik({
    mapPropsToValues({ name, email, password, termsOfService}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            termsOfService: termsOfService || ''
        }
    }
})(FormDetails)

export default formikFormDetails