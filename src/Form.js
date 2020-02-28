import React from 'react';
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginForm({ values, errors, touched, isSubmitting }) {
    return (
        <Form>
            <div>
                <Field type="text" name="fname" placeholder="First Name" />
            </div>
            <div>
                <Field type="text" name="lname" placeholder="Last Name" />
            </div>
            <div>
                <Field type="email" name="email" placeholder="Email" />
            </div>
            <div>
                <Field type="password" name="password" placeholder="Password" />
            </div>
            <label>
                <Field type="checkbox" name="tos" checked={values.tos} />
            </label>
            <button disabled={isSubmitting}>Submit!</button>
        </Form>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ fname, lname, email, password, tos }) {
        return {
            fname: fname || "",
            lname: lname || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        fname: Yup.string()
            .required("First name is required"),
        lname: Yup.string()
            .required("Last name is required"),    
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
        .min(8, "Password must be 8 characters or longer")
        .required("Password is required" ),
        tos: Yup.boolean()
        .oneOf([true], "You must accept the terms to use the service")
        .required("This field is required")
    }),
    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if (values.email === "alreadytaken@atb.dev") {
            setErrors({ email: "That email is already taken" });
        } else {
            axios
                .post("https://reqres.in/api/users", values)
                .then(res => {
                    console.log(res); // Data was created successfully and logs to complete
                    resetForm();
                    setSubmitting(false);
                })
                .catch(err => {
                    console.log(err); // There was an error creating the data and logs to console
                    setSubmitting(false);
                });
        }
    }



})(LoginForm);

export defualt FormikLoginForm;