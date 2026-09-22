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
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const [designation, setDesignation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errField, setErrField] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const inputClass = (field) =>
    `input w-full min-h-[40px] text-[14px] text-left ${errField === field ? "border-red-400" : ""
    }`;

  const dispatch = useDispatch();

  const formData = {
    firstName: (firstName ?? "").trim(),
    lastName: (lastName ?? "").trim(),
    email: (email ?? "").trim(),
    age: Number(age),
    photoUrl: (photoUrl ?? "").trim(),
    about: (about ?? "").trim(),
    gender: (gender ?? "").trim(),
    designation: (designation ?? "").trim(),
    companyName: (companyName ?? "").trim(),
    skills: (skills ?? "").split(",").map((s) => s.trim()).filter(Boolean),
  };

  const savedData = {
    firstName: (user?.firstName ?? "").trim(),
    lastName: (user?.lastName ?? "").trim(),
    email: (user?.email ?? "").trim(),
    age: Number(user?.age),
    photoUrl: (user?.photoUrl ?? "").trim(),
    about: (user?.about ?? "").trim(),
    gender: (user?.gender ?? "").trim(),
    designation: (user?.designation ?? "").trim(),
    companyName: (user?.companyName ?? "").trim(),
    skills: (user?.skills ?? []).map((s) => s.trim()).filter(Boolean),
  };

  const isProfileUnchanged =
    JSON.stringify(formData) === JSON.stringify(savedData);

  const handleSaveProfileUpdates = async () => {
    if (isProfileUnchanged) return;

    try {
      setErrMsg("");
      setErrField("");

      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
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
      setSkills(user.skills?.join(", ") || "");
      setAbout(user.about);
      setGender(user.gender);
      setDesignation(user.designation);
      setCompanyName(user.companyName);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="py-[24px] text-[16px] text-center">Loading profile...</div>
    );
  }

  return (
    <div className="flex flex-col min-[768px]:flex-row min-[768px]:flex-wrap items-center min-[768px]:items-start w-full max-w-[1100px] mx-auto px-[16px] py-[16px] gap-[24px] text-left">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full min-[768px]:w-[calc(50%-12px)] border p-[16px]">
        <legend className="fieldset-legend text-[18px] px-[8px]">
          Update your profile
        </legend>

        <div className="flex flex-col min-[640px]:flex-row gap-[12px] w-full">
          <div className="flex-1 min-w-0">
            <label className="label text-[14px] mb-[6px]" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={() => setErrField("")}
              className={inputClass("firstName")}
              placeholder="First name"
            />
          </div>
          <div className="flex-1 min-w-0">
            <label className="label text-[14px] mb-[6px]" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onFocus={() => setErrField("")}
              className={inputClass("lastName")}
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="flex flex-col min-[640px]:flex-row gap-[12px] w-full mt-[12px]">
          <div className="flex-1 min-w-0">
            <label className="label text-[14px] mb-[6px]" htmlFor="designation">
              Designation
            </label>
            <input
              id="designation"
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              onFocus={() => setErrField("")}
              className={inputClass("designation")}
              placeholder="What is your role?"
            />
          </div>
          <div className="flex-1 min-w-0">
            <label className="label text-[14px] mb-[6px]" htmlFor="companyName">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onFocus={() => setErrField("")}
              className={inputClass("companyName")}
              placeholder="Where are you working?"
            />
          </div>
        </div>

        <div className="flex flex-col min-[640px]:flex-row gap-[12px] w-full mt-[12px]">
          <div className="flex-[3] min-w-0">
            <label className="label text-[14px] mb-[6px]" htmlFor="skills">
              Skills
            </label>
            <input
              id="skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              onFocus={() => setErrField("")}
              className={inputClass("skills")}
              placeholder="Ex: JavaScript, React, Node.js"
            />
          </div>
          <div className="flex-1 min-w-0">
            <label className="label text-[14px] mb-[6px]" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onFocus={() => setErrField("")}
              className={inputClass("age")}
              placeholder="Age"
            />
          </div>
        </div>

        <div className="flex flex-col min-[640px]:flex-row gap-[12px] w-full mt-[12px]">
          <div className="flex-[3] min-w-0">
            <label className="label text-[14px] mb-[6px]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setErrField("")}
              className={inputClass("email")}
              placeholder="Email address"
            />
          </div>
          <div className="flex-1 min-w-0">
            <label className="label text-[14px] mb-[6px]" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select w-full min-h-[40px] text-[14px] text-left"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <label className="label text-[14px] mt-[12px] mb-[6px]" htmlFor="photoUrl">
          Photo URL
        </label>
        <input
          id="photoUrl"
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          onFocus={() => setErrField("")}
          className={inputClass("photoUrl")}
          placeholder="Photo URL"
        />

        <label className="label text-[14px] mt-[12px] mb-[6px]" htmlFor="about">
          About
        </label>
        <textarea
          id="about"
          name="about"
          rows="4"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="textarea w-full min-h-[96px] p-[12px] text-[14px] text-left"
          placeholder="Write about you..."
        />
      </fieldset>

      <div className="w-full min-[768px]:w-[calc(50%-12px)] flex justify-center min-[768px]:justify-start">
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

      <div className="flex flex-col items-center w-full min-[768px]:w-[calc(50%-12px)]">
        {errMsg && (
          <p className="font-bold text-[14px] text-red-600 mb-[8px]">{errMsg}</p>
        )}
        <button
          type="button"
          onClick={handleSaveProfileUpdates}
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            isProfileUnchanged
          }
          className="btn btn-wide btn-primary min-h-[40px]"
        >
          Save Updates
        </button>
      </div>

      {showNotification && (
        <div className="toast toast-top toast-center mt-[24px]">
          <div className="alert alert-success">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
