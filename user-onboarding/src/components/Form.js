import React, { useState, useEffect }from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormDetails = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);
    return(
        <div className="form-container">
            <h1>Good 'ol Form</h1>
            <Form>
                <Field type="text" name="name" placeholder="Name"/>
                <Field type="email" name="email" placeholder="Email"/>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="password" name="password" placeholder="Password"/>
                {touched.password && errors.password && <p>{errors.password}</p>}
                Agree to Terms of service
                <Field type="checkbox" name="termsOfService" checked={values.termsOfService}/>
                <button type="submit">Submit</button>
            </Form>
           {users.map(user => (
               <ul key={user.id}>
                   <li>name: {user.name}</li>
                   <li>email: {user.email}</li>
                   <li>password: Confidential hehe</li>
               </ul>
           ))}
        </div>
    );
};
const formikFormDetails = withFormik({
    mapPropsToValues({ name, email, password, termsOfService}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            termsOfService: termsOfService || false
        }
    },
  /////////////////Validation Schema below///////////
    validationSchema: Yup.object().shape({
        email: Yup.string()
                .email("Must have a standard email format. ex: rand@omuser.com")
                .required("This field is required"),
        password: Yup.string()
                    .min(5, "Minimum 5 characters")
                    .required("This field is required"),
    }),
  ////////////////handleSubmit below with POST request/////////////
    handleSubmit(values, {resetForm, setErrors, setSubmitting, setStatus}){
        if (values.email === "waffle@syrup.com"){
            setErrors({email: 'email already taken'});
        } else {
            axios
            .post('https://reqres.in/api/users', values)
            .then(res => {
                console.log(res);
                setStatus(res.data)
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            })
        }
        console.log(values);
        //Form Submition code will go here
    }

})(FormDetails);

export default formikFormDetails