import React, { useState } from 'react'
import { connectToAPI } from '../Pages/apihandler';
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
    const [userCred, setUserCred] = useState({ name: "", email: "", password: "", cnpassword: "" });
    const [formErrors, setFormErrors] = useState({})
    const navigate = useNavigate();
    const hadleVlues = (e) => {
        setUserCred({ ...userCred, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const errors = validateFields();
        setFormErrors(errors);

        if (Object.keys(errors).length !== 0) return;
        const{cnpassword,...uData}=userCred

        try {
            const response = await connectToAPI("api/auth/register","POST",uData);
            if(response.status===200){
                navigate("/login");
            }
        } catch (error) {
            
        }
    };

    const validateFields = () => {
        let errors = {};

        if (userCred.email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(userCred.email)) errors.email = "Please Enter Email"
        if (userCred.password === "" || userCred.password.length < 8) errors.password = "Please Enter Password"
        if (userCred.name === "") errors.name = "Please Enter name"
        if (userCred.password === "" || userCred.password !== userCred.cnpassword) errors.cnpassword = "Please Enter Password"

        return errors
    }
    return (
        <>
            <div className="formCon">
                <form action="" className='form-login' onSubmit={handleSubmit}>
                    <h1>Blog <span>Box</span></h1>
                    <div className={`form-email ${formErrors?.name ? 'loginError' : ''}`}>
                        <input type="text" name="name" placeholder='name' onChange={hadleVlues} />

                    </div>
                    <div className={`form-email ${formErrors?.email ? 'loginError' : ''}`}>
                        <input type="text" name="email" placeholder='Email' onChange={hadleVlues} />

                    </div>
                    <div className={`form-password ${formErrors?.password ? 'loginError' : ''}`}>
                        <input type="password" name="password" placeholder='Password' onChange={hadleVlues} />

                    </div>
                    <div className={`form-password ${formErrors?.cnpassword ? 'loginError' : ''}`}>
                        <input type="password" name="cnpassword" placeholder='Confirm Password' onChange={hadleVlues} />

                    </div>
                    <div className="form-submit">
                        <button type='submit'>Sign Up</button>
                    </div>
                    <NavLink to={"/login"}>Already have an Account?</NavLink>
                </form>
            </div>
        </>
    )
}

export default Register