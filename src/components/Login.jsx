import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import images from '../utils/images';

const Login = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("")
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [isSwitching, setIsSwitching] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setErrMsg("");
        try {
            const url = isLoginForm ? "/login" : "/signup";
            const body = isLoginForm
                ? { email: userName, password }
                : { firstName, lastName, email: userName, password };

            const res = await axios.post(BASE_URL + url, body, { withCredentials: true });
            dispatch(addUser(res.data.data));
            navigate(isLoginForm ? "/" : "/profile");
        } catch (e) {
            const errMessage = e.response?.data?.message;
            if (errMessage === "ValidationError") {
                setErrMsg(e.response.data.errors[0].message);
                return;
            }
            setErrMsg(errMessage || "Something went wrong");
        }
    };

    const displayLoader = () => {
        setIsSwitching(true)
        setTimeout(() => {
            setIsSwitching(false)
        }, 600)
    }

    return (
        <div style={{ backgroundImage: `url(${images.login})` }} className='w-full min-h-[calc(100dvh-128px)] bg-center bg-cover flex items-center gap-[40px] p-3'>
            <div className='max-[768px]:hidden ml-[45%] border border-white/60 h-[calc(100dvh-300px)]'></div>
            {isSwitching
                ? <span className="loading loading-ring loading-md ml-[225px]"></span>
                : (
                    <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                    className="card bg-[#082a61]/90  text-primary-content w-full max-w-[450px] max-[768px]:mx-auto">
                        <div className="card-body">
                            <h2 className="card-title mx-auto text-[20px] justify-center w-full">
                                {isLoginForm ? "LOGIN" : "SIGN UP"}
                            </h2>
                            {!isLoginForm && (<>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-[13px]">First Name</legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input font-bold placeholder:font-medium w-full min-h-[40px] bg-white/10 outline-none"
                                        placeholder="Enter First Name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend text-[13px]">Last Name</legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input font-bold placeholder:font-medium w-full min-h-[40px] bg-white/10 outline-none"
                                        placeholder="Enter Last Name"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                            </>)}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-[13px]">Username</legend>
                                <input
                                    type="text"
                                    value={userName}
                                    className="input font-bold placeholder:font-medium w-full min-h-[40px] bg-white/10 outline-none required:border-red-700"
                                    placeholder="Enter Email ID"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-[13px]">Password</legend>
                                <input
                                    type="password"
                                    value={password}
                                    className="input font-bold placeholder:font-medium w-full min-h-[40px] bg-white/10 outline-none"
                                    placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </fieldset>
                            <p className="min-h-[20px] text-[14px] font-bold text-red-400">{errMsg}</p>
                            <div className="card-actions justify-center mt-2">
                                <button
                                    className="btn btn-primary w-full min-h-[40px]"
                                    onClick={handleSubmit}
                                    disabled={isLoginForm ? (!userName || !password) : (!firstName || !lastName || !userName || !password)}
                                >
                                    {isLoginForm ? "Login" : "Sign up"}
                                </button>
                            </div>
                            <p
                                className='mx-auto mt-3 cursor-pointer'
                                onClick={() => {
                                    setErrMsg("")
                                    displayLoader()
                                    setIsLoginForm(!isLoginForm)
                                }}
                            >
                                {isLoginForm ? "New User? Sign up here" : "Existing User? Login here"}
                            </p>
                        </div>
                    </form>
                )}
        </div>
    )
}

export default Login


