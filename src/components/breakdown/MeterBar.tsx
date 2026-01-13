interface MeterBarProps {
  value: number;
}

const MeterBar = ({ value }: MeterBarProps) => {
  return (
    <div className="relative">
      {/* Labels */}
      <div className="flex justify-between text-sm text-gray-600 mb-5">
        <span>Low</span>
        <span>Neutral</span>
        <span>High</span>
      </div>

      <div className="relative rounded-2xl h-20 bg-linear-to-r from-red-300/20 via-50% via-orange-300/20 to-green-300/20">
        
        <div className="absolute left-1/2 -top-5 h-30 w-0.5 bg-gray-300 -translate-x-1/2" />

        <div
          className="absolute h-20 rounded-2xl overflow-hidden transition-all duration-300"
          style={{ width: `${value}%` }}
        >
          <div
            className="absolute h-20 rounded-2xl bg-linear-to-r from-red-500/10 via-50% via-orange-500/10 to-green-500/10"
            style={{ width: "100vw" }}
          />
        </div>

        <div
          className="absolute h-20 flex items-center justify-end pr-4 transition-all duration-300 pointer-events-none"
          style={{ width: `${value}%` }}
        >
          <p className="text-gray-700 text-5xl font-serif relative z-10">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeterBar;
