import { useState, useRef, useEffect } from "react";
import StopwatchDisplay from "../../components/Stopwatch/StopwatchDisplay";

import { FaPlay, FaPause, FaRotateLeft, FaStopwatch } from "react-icons/fa6";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  // Start Stopwatch
  const handleStart = () => {
    if (isRunning) 
      return;
    setIsRunning(true);

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // Pause Stopwatch
  const handlePause = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRunning(false);
  };

  // Reset Stopwatch
  const handleReset = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setSeconds(0);
    setIsRunning(false);
  };

 
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
   <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#D1FAE5] via-[#F0FDFA] to-[#CCFBF1] flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-[#123B3A]/15 border border-[#A7F3D0]">
   
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#123B3A] via-[#A7F3D0] to-[#123B3A]"></div>

        <div className="p-6 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#E0F7EF] text-[#123B3A] px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <FaStopwatch className="text-lg" />
              TIME TRACKER
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-[#123B3A] tracking-tight">
              Stopwatch App
            </h1>

            <p className="text-[#64817B] mt-3 text-sm md:text-base">
              Track every second. Make every moment count.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#123B3A] to-[#205B54] rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-[#123B3A]/20">
            <p className="text-[#A7F3D0] uppercase tracking-[0.3em] text-xs font-bold mb-6">
              Elapsed Time
            </p>

            <div className="text-white">
              <StopwatchDisplay seconds={seconds} />
            </div>

            <p className="text-[#A7F3D0] text-xs uppercase tracking-widest mt-6">
              Hours : Minutes : Seconds
            </p>
          </div>

          <div className="flex justify-center mt-7">
            <div className="flex items-center gap-2 bg-[#F0FDFA] px-5 py-2 rounded-full border border-[#D1FAE5]">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isRunning ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              ></span>

              <span className="text-sm font-semibold text-[#123B3A]">
                {isRunning
                  ? "Stopwatch Running"
                  : seconds > 0
                    ? "Stopwatch Paused"
                    : "Ready to Start"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={handleStart}
              disabled={isRunning}
              className="flex flex-1 min-w-24 items-center justify-center gap-2 bg-[#123B3A] hover:bg-[#205B54] disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <FaPlay />
              Start
            </button>

            <button
              onClick={handlePause}
              disabled={!isRunning}
              className="flex flex-1 min-w-24 items-center justify-center gap-2 bg-[#D8B65C] hover:bg-[#C6A13D] disabled:opacity-40 disabled:cursor-not-allowed text-[#123B3A] px-6 py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <FaPause />
              Pause
            </button>

            <button
              onClick={handleReset}
              className="flex flex-1 min-w-24 items-center justify-center gap-2 bg-[#FEE2E2] hover:bg-[#FECACA] text-[#B42318] px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1"
            >
              <FaRotateLeft />
              Reset
            </button>
          </div>

          <div className="mt-10 pt-6 border-t border-[#E0F2ED] text-center">
            <p className="text-[#64817B] text-sm">
              Every second matters. Stay focused!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
