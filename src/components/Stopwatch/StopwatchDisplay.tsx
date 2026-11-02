interface StopwatchDisplayProps {
  seconds: number;
}

const StopwatchDisplay = ({ seconds }: StopwatchDisplayProps) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formatTime = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="rounded-2xl bg-[#123B3A] py-10 px-4 text-center shadow-lg">
      <h1 className="text-5xl md:text-7xl font-bold text-[#A7F3D0]">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(remainingSeconds)}
      </h1>

      <p className="text-[#D1FAE5] mt-4 text-sm font-medium tracking-widest">
        HOURS : MINUTES : SECONDS
      </p>
    </div>
  );
};

export default StopwatchDisplay;
