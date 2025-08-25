import { useSelector, useDispatch } from "react-redux";
import { setPrincipal, setRate, setTime, calculateEMI } from "./redux/emiSlice";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export default function EMICalculator() {
  const dispatch = useDispatch();
  // access redux state
  const { principal, rate, time, emi, totalInterest, totalPayment } =
    useSelector((state) => state.emi);

  const chartData = [
    { name: "Principal", value: Number(principal) },
    { name: "Interest", value: Number(totalInterest) },
  ];

  const COLORS = ["#0c2858", "#22c55e"];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: "#0c2858" }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-6 text-center">EMI Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {/* Left: Inputs */}
          <div className="md:col-span-3">
            <div className="mb-4">
              <label className="block font-medium">Loan Amount (₹)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  const clamped = Math.min(2000000, Math.max(50000, next || 0));
                  dispatch(setPrincipal(clamped));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    dispatch(calculateEMI());
                  }
                }}
                className="w-full p-2 border rounded-md"
              />
              {/* Range Slider Below Input */}
              <input
                type="range"
                min="50000"
                max="2000000"
                step="10000"
                value={principal}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  const clamped = Math.min(2000000, Math.max(50000, next || 0));
                  dispatch(setPrincipal(clamped));
                }}
                className="w-full mt-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Interest Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  const clamped = Math.min(30, Math.max(1, next || 0));
                  dispatch(setRate(clamped));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    dispatch(calculateEMI());
                  }
                }}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="range"
                min="1"
                max="30"
                step="0.1"
                value={rate}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  const clamped = Math.min(30, Math.max(1, next || 0));
                  dispatch(setRate(clamped));
                }}
                className="w-full mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Time (Months)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  const clamped = Math.min(360, Math.max(6, next || 0));
                  dispatch(setTime(clamped));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    dispatch(calculateEMI());
                  }
                }}
                className="w-full p-2 border rounded-md"
              />
              <input
                type="range"
                min="6"
                max="360"
                step="6"
                value={time}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  const clamped = Math.min(360, Math.max(6, next || 0));
                  dispatch(setTime(clamped));
                }}
                className="w-full mt-2"
              />
            </div>
            <button
              onClick={() => dispatch(calculateEMI())}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Calculate
            </button>            
          </div>

          {/* Right: Pie Chart */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            {emi > 0 && (
              <div className="mt-6 p-4 bg-green-100 rounded-lg text-center space-y-2">
                <h2 className="text-lg font-semibold">Your EMI:</h2>
                <p className="text-2xl font-bold text-green-700">₹ {emi}</p>

                <p className="text-gray-700">
                  <strong>Total Interest:</strong> ₹ {totalInterest}
                </p>
                <p className="text-gray-700">
                  <strong>Total Payment (Principal + Interest):</strong> ₹{" "}
                  {totalPayment}
                </p>
              </div>
            )}
            {emi > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center border-dashed border-2 border-gray-300 p-4 rounded-lg h-full flex items-center justify-center text-gray-600">
                Enter values and calculate EMI to see breakdown.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
