import axios from "axios"
import { useState } from "react"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"
import { useDispatch } from "react-redux"

const Profile = () => {
    const [profilePhotoInput, setProfilePhotoInput] = useState("")

    const dispatch = useDispatch()

    const handleUpdateProfilePhoto = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit",{photoUrl: profilePhotoInput}, { withCredentials: true })
            if (res.status === 200){
                dispatch(addUser(res?.data?.user))
            }
        }
        catch (e) {
            console.dir(e)
        }

    }

    return (
        <div className="flex flex-col gap-4">
            <input
                type="text"
                value={profilePhotoInput}
                onChange={(e) => setProfilePhotoInput(e.target.value)}
                className="border-1 border-white rounded-md"
            />
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateProfilePhoto}
            >
                Update profile photo</button>
        </div>
    )
}

export default Profile