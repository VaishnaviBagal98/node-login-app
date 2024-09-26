import { useState } from "react";
import {Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup(){

    const[name,setName] = useState()
    const[email,setEmail] = useState()
    const[password,setPassword] = useState()
     const [error, setError] = useState('');
    const navigate = useNavigate()

    const validatePassword = (pwd) => {
        const minLength = pwd.length >= 8;
        const hasLetter = /[a-zA-Z]/.test(pwd);
        const hasNumber = /\d/.test(pwd);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

        if (!minLength) return 'Password must be at least 8 characters long.';
        if (!hasLetter) return 'Password must contain at least one letter.';
        if (!hasNumber) return 'Password must contain at least one number.';
        if (!hasSpecialChar) return 'Password must contain at least one special character.';

        return '';
    };

    const handleSubmit = (e)=>{
        e.preventDefault()
        const validationError = validatePassword(password);
        if (validationError) {
            setError(validationError);
            return;
        }

        axios.post('http://localhost:3001/register',{name,email,password})
        .then(result => {console.log(result)
            navigate('/login')
        })
        .catch(err=> console.log(err))
    }
      
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email">
                    <strong>Name</strong>
                </label>
                <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
                />
                </div>

                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input 
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                        type = "password"
                        placeholder="Enter Password"
                        name="password"
                        className="form-control rounded-0"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Register
                </button>
                </form>
                <p>Already Have an Account</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
        </div>
    </div>

    );
}

export default Signup;
