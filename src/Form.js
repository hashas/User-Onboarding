import React, {useState} from 'react';
// import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

// const [users, setUsers] = useState([]);

function LoginForm(props) {
    console.log(props)
    // const {values, errors, touched} = props;
    return (
        <Form>
            <div>
                {props.touched.fname && props.errors.fname && <p>{props.errors.fname}</p>}
                <Field type="text" name="fname" placeholder="First Name" />
            </div>
            <div>
                {props.touched.lname && props.errors.lname && <p>{props.errors.lname}</p>}
                <Field type="text" name="lname" placeholder="Last Name" />
            </div>
            <div>
                {props.touched.email && props.errors.email && <p>{props.errors.email}</p>}
                <Field type="email" name="email" placeholder="Email" />
            </div>
            <div>
                {props.touched.password && props.errors.password && <p>{props.errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />
            </div>
            <label>
                {props.touched.tos && props.errors.tos && <p>{props.errors.tos}</p>}
                <Field type="checkbox" name="tos" checked={props.values.tos} />
                Accept TOS
            </label>
            <button type="submit" disabled={props.isSubmitting}>Submit!</button>
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
    handleSubmit(values, tools) {
        if (values.email === "waffle@syrup.com") {
            tools.setErrors({ email: "That email is already taken" });
        } else {
            axios
                .post("https://reqres.in/api/users", values)
                .then(res => {
                    console.log('succesful submit')
                    console.log(res); // Data was created successfully and logs to complete
                    tools.props.setUsers([...tools.props.users, res.data])
                    // tools.setStatus(res.data);
                    tools.resetForm();
                    tools.setSubmitting(false);
                })
                .catch(err => {
                    console.log(err); // There was an error creating the data and logs to console
                    tools.setSubmitting(false);
                });
        }
    }
})(LoginForm);

export default FormikLoginForm;