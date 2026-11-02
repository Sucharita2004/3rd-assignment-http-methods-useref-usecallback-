
import { memo } from "react";
import {
  FaReceipt,
  FaBookOpen,
  FaMoneyBillWave,
  FaLayerGroup,
  FaPercent,
  FaWallet,
} from "react-icons/fa";
import type { OrderSummaryProps } from "../../types/interface/form.interface";

const OrderSummary = memo(
  ({
    course,
    coursePrice,
    quantity,
    discount,
    totalCost,
  }: OrderSummaryProps) => {
    console.log("OrderSummary rendered");

    return (
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50 px-5 py-5 sm:px-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-800 text-xl text-white shadow-sm">
            <FaReceipt />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Order Summary
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review your course order and total amount.
            </p>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-7">
          <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-slate-600">
              <FaBookOpen className="text-teal-700" />
              Course
            </span>
            <span className="text-right text-sm font-semibold text-slate-800">
              {course || "Not selected"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-slate-600">
              <FaMoneyBillWave className="text-teal-700" />
              Price per course
            </span>
            <span className="text-right text-sm font-semibold text-slate-800">
              ₹{coursePrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-slate-600">
              <FaLayerGroup className="text-teal-700" />
              Quantity
            </span>
            <span className="text-sm font-semibold text-slate-800">
              {quantity}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-slate-600">
              <FaPercent className="text-teal-700" />
              Discount
            </span>
            <span className="text-sm font-semibold text-emerald-700">
              {discount}%
            </span>
          </div>

          <div className="border-t border-dashed border-slate-200 pt-5">
            <div className="rounded-2xl bg-gradient-to-r from-teal-800 to-emerald-700 p-5 text-white shadow-md sm:p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-teal-100">
                <FaWallet />
                Total Amount
              </div>

              <p className="mt-2 break-words text-3xl font-extrabold tracking-tight sm:text-4xl">
                ₹{totalCost.toFixed(2)}
              </p>

              <p className="mt-2 text-xs text-teal-100">
                Discount applied where applicable.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

OrderSummary.displayName = "OrderSummary";

export default OrderSummary;
