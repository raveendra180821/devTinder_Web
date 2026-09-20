import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("")
    const [isLoginForm, setIsLoginForm] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!userName & !password) return setErrMsg("Please enter Username & password")
        if (!userName) return setErrMsg("Please enter Username")
        if (!password) return setErrMsg("Please enter Password")
        setErrMsg("")
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    email: userName,
                    password
                },
                { withCredentials: true }
            )

            dispatch(addUser(res.data.data))
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

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, email: userName, password },
                { withCredentials: true }
            )

            dispatch(addUser(res.data.data))
            return navigate("/profile")
        }
        catch (e) {
            if (e.response.data.message === "ValidationError") {
                const err = e.response.data.errors[0]
                setErrMsg(err.message)
                return
            }
            setErrMsg(e.response.data.message)
        }
    }

    return (
        <div className="mx-auto card bg-accent-content text-primary-content w-96">
            <div className="card-body">
                <h2 className="card-title mx-auto">{isLoginForm ? "LOGIN" : "SIGN UP"}</h2>
                {!isLoginForm && (<>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input
                            type="text"
                            value={firstName}
                            className="input"
                            placeholder="Enter First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input
                            type="text"
                            value={lastName}
                            className="input"
                            placeholder="Enter Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </fieldset>
                </>)}
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
                        onClick={isLoginForm ? handleLogin : handleSignUp}
                        disabled={!isLoginForm && (!firstName || !lastName || !userName || !password)}
                    >
                        {isLoginForm ? "Login" : "Sign up"}
                    </button>
                </div>
                <p
                    className='mx-auto mt-3 cursor-pointer'
                    onClick={() => {
                        setErrMsg("")
                        setIsLoginForm(!isLoginForm)
                    }}
                >
                    {isLoginForm ? "New User? Sign up here" : "Existing User? Login here"}
                </p>
            </div>
        </div>
    )
}

export default Login