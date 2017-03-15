import React from "react";
import ReactDOM from "react-dom";

// Framework components
import Typeahead from "./components/Typeahead";
import LineChart from "./components/LineChart";

// Docs examples
import TypeaheadExample from "./examples/TypeaheadExample";

export default {
	Typeahead,
};

if (process.env.NODE_ENV !== "production") {
	if (document.getElementById("react-typeahead")) {
		ReactDOM.render(
			<TypeaheadExample />,
			document.getElementById("react-typeahead")
		);
	}

	if (document.getElementById("react-lineChart")) {
		ReactDOM.render(
			<LineChart />,
			document.getElementById("react-lineChart")
		);
	}
}
