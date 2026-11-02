
import { memo } from "react";
import {
  FaBookOpen,
  FaMoneyBillWave,
  FaLayerGroup,
  FaPercent,
} from "react-icons/fa";
import type { CourseInfoProps } from "../../types/interface/form.interface";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10";

const CourseInfo = memo(
  ({
    course,
    coursePrice,
    quantity,
    discount,
    handleChange,
  }: CourseInfoProps) => {
    console.log("CourseInfo rendered");

    return (
      <section className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-800">
            <FaBookOpen />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Course Information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose a course and configure your order.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="course"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <FaBookOpen className="text-teal-700" />
              Select Course
            </label>
            <select
              id="course"
              name="course"
              value={course}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select a course</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="TypeScript">TypeScript</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="coursePrice"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <FaMoneyBillWave className="text-teal-700" />
              Course Price (₹)
            </label>
            <input
              id="coursePrice"
              type="number"
              name="coursePrice"
              value={coursePrice}
              onChange={handleChange}
              min="0"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <FaLayerGroup className="text-teal-700" />
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              value={quantity}
              onChange={handleChange}
              min="1"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="discount"
              className="flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <FaPercent className="text-teal-700" />
              Discount (%)
            </label>
            <input
              id="discount"
              type="number"
              name="discount"
              value={discount}
              onChange={handleChange}
              min="0"
              max="100"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50/70 px-4 py-3">
          <p className="text-sm leading-6 text-teal-900">
            Select your course, set the quantity, and apply a discount to
            calculate the final price in the order summary.
          </p>
        </div>
      </section>
    );
  },
);

CourseInfo.displayName = "CourseInfo";

export default CourseInfo;
