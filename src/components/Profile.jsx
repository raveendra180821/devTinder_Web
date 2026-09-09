import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"
import { useDispatch, useSelector } from "react-redux"
import FeedUserCard from "./FeedUserCard"

const Profile = () => {

    const user = useSelector((state) => state.user)


    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [about, setAbout] = useState(user.description)
    const [gender, setGender] = useState(user.gender)
    const [errMsg, setErrMsg] = useState(" ")
    const [errField, setErrField] = useState("")
    const [showNotification, setShowNotification] = useState(false)

    const validInputClassName = "input w-full mb-2 outline-none focus:bg-[#e6e2df] focus:text-gray-900"
    const errInputClassName = "input w-full mb-2 outline-none focus:bg-[#e6e2df] focus:text-gray-900 border-red-400"

    const dispatch = useDispatch()

    const handleSaveProfileUpdates = async () => {
        try {
            setErrMsg("")
            setErrField("")

            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, email, photoUrl, description: about },
                { withCredentials: true }
            )
            if (res.status === 200) {
                dispatch(addUser(res?.data?.user))
                setShowNotification(true)
                setTimeout(() => {
                    setShowNotification(false)
                }, 3000)
                
            }
        }
        catch (e) {
            if (e.response.data.message === "ValidationError") {
                const errors = e.response.data.errors
                setErrMsg(errors[0].message)
                setErrField(errors[0].field)
                return
            }
            setErrMsg(e.message)
        }

    }



    return (
        <div className="flex gap-20">
            <div className="flex flex-col items-center">
                <fieldset className="fieldset bg-base-200 border-[#b3afaa] rounded-box w-lg border p-4">
                    <legend className="fieldset-legend text-xl px-2">Update your profile</legend>

                    <label className="label text-sm">First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onFocus={() => setErrField("")}
                        className={errField === "firstName" ? errInputClassName : validInputClassName} placeholder="first name" />

                    <label className="label text-sm">Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onFocus={() => errField === "lastName" && setErrField("")}
                        className={errField === "lastName" ? errInputClassName : validInputClassName} placeholder="last name" />

                    <label className="label text-sm">Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setErrField("")}
                        className={errField === "email" ? errInputClassName : validInputClassName} placeholder="email address" />

                    <label className="label text-sm">Photo Url</label>
                    <input
                        type="text"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        onFocus={() => setErrField("")}
                        className={errField === "photoUrl" ? errInputClassName : validInputClassName} placeholder="photo url" />

                    <label htmlFor="gender" className="label text-sm">Gender</label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="input w-full rounded-lg px-2 py-2 focus:bg-[#e6e2df] focus:text-gray-900 focus:outline-none">
                        <option value="" disabled hidden>Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <label className="label text-sm mt-3">About</label>
                    <textarea
                        name="about"
                        rows="4"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="p-3 rounded-sm bg-base-100 w-full mb-5 outline-none focus:bg-[#e6e2df] focus:text-gray-900" placeholder="Write about you . . ." />
                </fieldset>
                <p className="font-bold text-sm text-red-600 mt-5">{errMsg}</p>
                <button
                    type="button"
                    onClick={handleSaveProfileUpdates}
                    disabled={firstName === "" || lastName === "" || email === "" }
                    className="btn btn-wide btn-primary mt-5 ">Save Updates
                </button>
            </div>
            <div className="mt-[20px]">
                <FeedUserCard data={{ firstName, lastName, gender, photoUrl, description: about, disableButton: true }} />
            </div>
            {showNotification && (
                <div className="toast toast-top toast-center mt-6">
                    <div className="alert alert-success">
                        <span>Profile updated successfully</span>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Profile