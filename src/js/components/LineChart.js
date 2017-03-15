import React from "react";
import {
	ResponsiveContainer,
	LineChart as ReactLineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Legend,
} from "recharts";

const data = [
      { name: "Leden", výnos: 2400 },
      { name: "Únor", výnos: 1398 },
      { name: "Březen", výnos: 9800 },
      { name: "Duben", výnos: 3908 },
      { name: "Květen", výnos: 4800 },
      { name: "Červen", výnos: 3800 },
      { name: "Červenec", výnos: 4300 },
];

const LineChart = () => (
	<ResponsiveContainer width="100%" height={300}>
		<ReactLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
			<XAxis dataKey="name" stroke="#8e8e8e" tick={{ transform: "translate(0, 10)" }} />
			<YAxis stroke="#8e8e8e" tick={{ transform: "translate(-10, 0)" }} />
			<CartesianGrid strokeDasharray="3 3" stroke="#f2f2f2" />
			<Tooltip cursor={false} />
			<Legend wrapperStyle={{ color: "#8e8e8e", padding: 10 }} />
			<Line type="monotone" dataKey="výnos" stroke="#f80" activeDot={{ r: 8 }} strokeWidth={2} />
		</ReactLineChart>
	</ResponsiveContainer>
);

export default LineChart;