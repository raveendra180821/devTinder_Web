import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import FeedUserCard from "./FeedUserCard";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  let [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [designation, setDesignation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errField, setErrField] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const validInputClassName =
    "input w-full  outline-none focus:bg-[#e6e2df] focus:text-gray-900";
  const errInputClassName =
    "input w-full  outline-none focus:bg-[#e6e2df] focus:text-gray-900 border-red-400";

  const dispatch = useDispatch();

  const handleSaveProfileUpdates = async () => {
    try {
      setErrMsg("");
      setErrField("");

      if (skills.length > 0) {
        skills = skills.split(",").map((v) => v.trim());
      } else {
        skills = [];
      }

      const payLoad = {
        firstName,
        lastName,
        email,
        age: Number(age),
        gender,
        about,
        skills,
        photoUrl,
        companyName,
        designation,
      };

      const res = await axios.patch(BASE_URL + "/profile/edit", payLoad, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addUser(res?.data?.user));
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      }
    } catch (e) {
      if (e.response?.data?.message === "ValidationError") {
        const errors = e.response.data.errors;
        setErrMsg(errors[0].message);
        setErrField(errors[0].field);
        return;
      }
      setErrMsg(e.response?.data?.message);
      console.dir(e);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAge(user.age);
      setPhotoUrl(user.photoUrl);
      setSkills(user.skills.join(", "));
      setAbout(user.about);
      setGender(user.gender);
      setDesignation(user.designation);
      setCompanyName(setCompanyName);
    }
  }, [user]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="flex gap-20">
      <div className="flex flex-col items-center w-xl">
        <fieldset className="fieldset bg-base-200 border-[#b3afaa] rounded-box w-full border p-4 max-h-[540px] overflow-y-auto [scrollbar-width:none]">
          <legend className="fieldset-legend text-xl px-2">
            Update your profile
          </legend>
          <div className="flex gap-3">
            <div>
              <label className="label text-sm mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => setErrField("")}
                className={
                  errField === "firstName"
                    ? errInputClassName
                    : validInputClassName
                }
                placeholder="first name"
              />
            </div>
            <div>
              <label className="label text-sm mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => setErrField("")}
                className={
                  errField === "lastName"
                    ? errInputClassName
                    : validInputClassName
                }
                placeholder="last name"
              />
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <div className="flex-1">
              <label className="label text-sm my-2">Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                onFocus={() => setErrField("")}
                className={
                  errField === "designation"
                    ? errInputClassName
                    : validInputClassName
                }
                placeholder="What is your role ?"
              />
            </div>
            <div className="flex-1">
              <label className="label text-sm my-2">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onFocus={() => setErrField("")}
                className={
                  errField === "companyName"
                    ? errInputClassName
                    : validInputClassName
                }
                placeholder="Where are you working ?"
              />
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <div className="flex-3">
              <label className="label text-sm my-2">skills</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                onFocus={() => setErrField("")}
                className={
                  errField === "skills"
                    ? errInputClassName
                    : validInputClassName
                }
                placeholder="Ex: Java Script, React, Node.js"
              />
            </div>
            <div className="flex-1">
              <label className="label text-sm my-2">Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onFocus={() => setErrField("")}
                className={
                  errField === "age" ? errInputClassName : validInputClassName
                }
                placeholder="Age"
              />
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <div className="flex-3">
              <label className="label text-sm my-2">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setErrField("")}
                className={
                  errField === "email" ? errInputClassName : validInputClassName
                }
                placeholder="email address"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="gender" className="label text-sm my-2">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input rounded-lg px-2 py-2 focus:bg-[#e6e2df] focus:text-gray-900 focus:outline-none"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="female">Other</option>
              </select>
            </div>
          </div>

          <label className="label text-sm mt-2">Photo Url</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            onFocus={() => setErrField("")}
            className={
              errField === "photoUrl" ? errInputClassName : validInputClassName
            }
            placeholder="photo url"
          />

          <label className="label text-sm mt-3">About</label>
          <textarea
            name="about"
            rows="4"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            onFocus={(e) => {
              e.target.scrollIntoView({ behavior: "smooth" });
            }}
            className="p-3 rounded-sm bg-base-100 w-full mb-5 outline-none focus:bg-[#e6e2df] focus:text-gray-900"
            placeholder="Write about you . . ."
          />
        </fieldset>
        <p className="font-bold text-sm text-red-600 mt-5">{errMsg}</p>
        <button
          type="button"
          onClick={handleSaveProfileUpdates}
          disabled={firstName === "" || lastName === "" || email === ""}
          className="btn btn-wide btn-primary my-5 "
        >
          Save Updates
        </button>
      </div>
      <div className="mt-5">
        <FeedUserCard
          data={{
            firstName,
            lastName,
            gender,
            age,
            photoUrl,
            about,
            designation,
            companyName,
            selfCard: true,
          }}
        />
      </div>
      {showNotification && (
        <div className="toast toast-top toast-center mt-6">
          <div className="alert alert-success">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
