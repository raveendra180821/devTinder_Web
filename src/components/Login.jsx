import React, { use, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [userName, setUserName] = useState("raveendra@gmail.com");
    const [password, setPassword] = useState("Raveendra@123");
    const [errMsg, setErrMsg] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    email: userName,
                    password
                },
                { withCredentials: true }
            )

            dispatch(addUser(res.data.user))
            return navigate("/")

        } catch (e) {
            if (e.status === 400) {
                setErrMsg("* " + e?.response?.data?.message)
            }
            else {
                setErrMsg("Something went wrong, unable to login")
            }

        }
    }

    return (
        <div className="card bg-accent-content text-primary-content w-96">
            <div className="card-body">
                <h2 className="card-title">LOGIN</h2>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Username</legend>
                    <input
                        type="text"
                        value={userName}
                        className="input"
                        placeholder="Enter Email ID"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input
                        type="text"
                        value={password}
                        className="input"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                <span className='text-red-400 font-bold'>{errMsg}</span>
                <div className="card-actions justify-center mt-5">
                    <button
                        className="btn w-40"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login