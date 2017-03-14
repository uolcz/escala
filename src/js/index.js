import React from "react";
import ReactDOM from "react-dom";

// Framework components
import Typeahead from "./components/Typeahead";

// Docs examples
import TypeaheadExample from "./examples/TypeaheadExample";

export default {
	Typeahead,
};

if (process.env.NODE_ENV !== "production") {
	ReactDOM.render(
		<TypeaheadExample />,
		document.getElementById("react-typeahead")
	);
}
