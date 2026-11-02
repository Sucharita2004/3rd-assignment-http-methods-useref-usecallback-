import { useCallback, useMemo, useState } from "react";
import type {
  FormDataType,
  InputChangeEvent,
} from "../../types/interface/form.interface";
import PersonalInfo from "../../components/LargeFormOtimizer/PersonalInfo";
import CourseInfo from "../../components/LargeFormOtimizer/CourseInfo";
import OrderSummary from "../../components/LargeFormOtimizer/OrderSummary";

const initialFormData: FormDataType = {
  fullName: "",
  email: "",
  phone: "",
  age: 0,
  gender: "",

  course: "",
  coursePrice: 1000,
  quantity: 1,
  discount: 0,

  address: "",
  city: "",
  state: "",
  pinCode: "",
};

const LargeFormOptimizer = () => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  // Handle all input changes
  const handleChange = useCallback((e: InputChangeEvent) => {
    const { name, value } = e.target;

    const numericFields = ["age", "coursePrice", "quantity", "discount"];

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  }, []);

  // Calculate total cost only when calculation inputs change
  const totalCost = useMemo(() => {
    const price = formData.coursePrice * formData.quantity;

    const discountAmount = (price * formData.discount) / 100;

    return Math.max(0, price - discountAmount);
  }, [formData.coursePrice, formData.quantity, formData.discount]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log("Form Data:", formData);
      console.log("Total Cost:", totalCost);

      alert("Form submitted successfully!");
    },
    [formData, totalCost],
  );

  // Reset form
  const handleReset = useCallback(() => {
    setFormData({ ...initialFormData });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Registration Portal
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Large Form{" "}
            <span className="bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
              Optimizer
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Manage personal details, course selection, and order information in
            one place.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <PersonalInfo
            fullName={formData.fullName}
            email={formData.email}
            phone={formData.phone}
            age={formData.age}
            gender={formData.gender}
            handleChange={handleChange}
          />

          {/* Course Information */}
          <CourseInfo
            course={formData.course}
            coursePrice={formData.coursePrice}
            quantity={formData.quantity}
            discount={formData.discount}
            handleChange={handleChange}
          />

          {/* Address Information */}
          <section className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Address Information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter your address and location details.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="text-sm font-semibold text-slate-700"
                >
                  Street Address
                </label>

                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  autoComplete="street-address"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="text-sm font-semibold text-slate-700"
                >
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  autoComplete="address-level2"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="text-sm font-semibold text-slate-700"
                >
                  State
                </label>

                <input
                  id="state"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  autoComplete="address-level1"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="pinCode"
                  className="text-sm font-semibold text-slate-700"
                >
                  PIN Code
                </label>

                <input
                  id="pinCode"
                  type="text"
                  name="pinCode"
                  inputMode="numeric"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit PIN code"
                  autoComplete="postal-code"
                  pattern="[0-9]{6}"
                  title="Enter a valid 6-digit PIN code"
                  required
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Enter a valid 6-digit postal PIN code.
                </p>
              </div>
            </div>
          </section>

          {/* Calculated Summary */}
          <OrderSummary
            course={formData.course}
            coursePrice={formData.coursePrice}
            quantity={formData.quantity}
            discount={formData.discount}
            totalCost={totalCost}
          />

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:justify-end sm:p-5">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-600/10 active:scale-[0.98]"
            >
              Reset Form
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-800 to-emerald-700 px-7 py-3 text-sm font-semibold text-white shadow-md shadow-teal-900/15 transition-all duration-200 hover:-translate-y-0.5 hover:from-teal-900 hover:to-emerald-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-600/20 active:translate-y-0"
            >
              Submit Form
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LargeFormOptimizer;
