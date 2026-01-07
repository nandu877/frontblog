import React, { useContext, useEffect, useState } from 'react'
import { connectToAPI } from '../Pages/apihandler';
import { AuthContext } from './AuthContext';
import { NavLink, useNavigate } from 'react-router-dom'
import Loading from './Loading';
import toast from 'react-hot-toast';


function Login() {
    const{login,isLogin, role}=useContext(AuthContext)
    const [userCred,setUserCred]=useState({email:"",password:""});
    const [formErrors,setFormErrors]=useState({})
    const[isLoading,setIsLoading]=useState(false);
    const navigate=useNavigate()
    const hadleVlues=(e)=>{
        setUserCred({...userCred,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(userCred)
        const errors=validateFields();

        if(Object.keys(errors).length > 0){
            setFormErrors(errors);
            return;
        }

        console.log(userCred)
       try {
        setIsLoading(true);
         const response = await connectToAPI("api/auth/login","POST",userCred);

        if(response.status === 200){
            toast.success("Login Success...!")
           login(response.data.token,response.data.user)
        }
       } catch (error) {
         toast.error(error.response.data.message)
       }
       setTimeout(()=>{
        setIsLoading(false)
       },100)
    }
    const validateFields=()=>{
        let errors={};

        if(userCred.email==="") errors.email="Please Enter Email"
        if(userCred.password==="") errors.password="Please Enter Password"

        return errors
    }

    useEffect(() => {
  if (isLogin) {
    navigate(role === "ADMIN" ? "/admin" : "/author", { replace: true });
  }
}, [isLogin, role]);
  return (
    <>
    <div className="formCon">
        <form action="" className='form-login' onSubmit={handleSubmit}>
            <h1>Blog <span>Box</span></h1>
            <div className={`form-email ${formErrors?.email ? 'loginError' : ''}`}>
                <input type="text" name="email" placeholder='Email' onChange={hadleVlues}/>
                
            </div>
            <div  className={`form-password ${formErrors?.password ? 'loginError' : ''}`}>
                <input type="password" name="password" placeholder='Password' onChange={hadleVlues}/>
               
            </div>
            <div className="form-submit">
                <button type='submit'>Login</button>
            </div>
            <NavLink to={"/signup"}>Dont have an Account?</NavLink>
        </form>
    </div>
    {
        isLoading && <Loading/>
    }
    </>
  )
}

export default Login