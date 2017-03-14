import React from "react";
import Autosuggest from "react-autosuggest";

const theme = {
	container: "selectable",
	containerOpen: "is-open",
	input: "formControl",
	inputOpen: "react-autosuggest__input--open",
	inputFocused: "react-autosuggest__input--focused",
	suggestionsContainer: "selectable-menu",
	suggestionsContainerOpen: "is-open",
	suggestionsList: "react-autosuggest__suggestions-list",
	suggestion: "selectable-item",
	suggestionFirst: "react-autosuggest__suggestion--first",
	suggestionHighlighted: "is-highlighted",
	sectionContainer: "react-autosuggest__section-container",
	sectionContainerFirst: "react-autosuggest__section-container--first",
	sectionTitle: "react-autosuggest__section-title",
};

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

const Typeahead = (props) => {
	// Autosuggest will pass through all these props to the input element.
	const inputProps = {
		placeholder: props.placeholder,
		value: props.value,
		onChange: props.onChange,
	};

	return (
		<Autosuggest
			{...props}
			inputProps={inputProps}
			theme={theme}
		/>
	);
};

Typeahead.propTypes = {
	suggestions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	value: React.PropTypes.string.isRequired,
	placeholder: React.PropTypes.string,
	getSuggestionValue: React.PropTypes.func,
	renderSuggestion: React.PropTypes.func,
	onChange: React.PropTypes.func.isRequired,
	onSuggestionsFetchRequested: React.PropTypes.func.isRequired,
	onSuggestionsClearRequested: React.PropTypes.func.isRequired,
	getSuggestions: React.PropTypes.func,
};

Typeahead.defaultProps = {
	placeholder: "",
	getSuggestionValue,
	renderSuggestion,
};

export default Typeahead;