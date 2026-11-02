
import { memo } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaVenusMars,
} from "react-icons/fa";
import type { PersonalInfoProps } from "../../types/interface/form.interface";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10";

const PersonalInfo = memo(
  ({
    fullName,
    email,
    phone,
    age,
    gender,
    handleChange,
  }: PersonalInfoProps) => {
    console.log("PersonalInfo rendered");

    return (
      <section className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-800">
            <FaUser />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Personal Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter your personal details below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="fullName"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <FaUser className="text-teal-700" />
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <FaEnvelope className="text-teal-700" />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter email address"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <FaPhone className="text-teal-700" />
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              autoComplete="tel"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <FaBirthdayCake className="text-teal-700" />
              Age
            </label>
            <input
              id="age"
              type="number"
              name="age"
              value={age || ""}
              onChange={handleChange}
              placeholder="Enter your age"
              min="1"
              max="120"
              required
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="gender"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <FaVenusMars className="text-teal-700" />
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </section>
    );
  },
);

PersonalInfo.displayName = "PersonalInfo";

export default PersonalInfo;
