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

class Typeahead extends React.Component {

	constructor(props) {
		super(props);

		// Autosuggest is a controlled component.
		// This means that you need to provide an input value
		// and an onChange handler that updates this value (see below).
		// Suggestions also need to be provided to the Autosuggest,
		// and they are initially empty because the Autosuggest is closed.
		this.state = {
			value: "",
			suggestions: [],
		};
	}

	onChange = (event, { newValue }) => {
		this.setState({ value: newValue });
	};

	// Autosuggest will call this function every time you need to update suggestions.
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: this.getSuggestions(value),
		});
	};

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
		});
	};

	// Teach Autosuggest how to calculate suggestions for any given input value.
	getSuggestions = (value) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return inputLength === 0 ? [] : this.props.data.filter(item =>
			item.name.toLowerCase().slice(0, inputLength) === inputValue
		);
	};

	render() {
		const suggestions = this.props.suggestions || this.state.suggestions;
		const value = this.props.value || this.state.value;
		const onChange = this.props.onChange || this.onChange;
		const onSuggestionsFetchRequested = this.props.onSuggestionsFetchRequested || this.onSuggestionsFetchRequested;
		const onSuggestionsClearRequested = this.props.onSuggestionsClearRequested || this.onSuggestionsClearRequested;

		// Autosuggest will pass through all these props to the input element.
		const inputProps = {
			placeholder: this.props.placeholder,
			value,
			onChange,
		};

		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={onSuggestionsFetchRequested}
				onSuggestionsClearRequested={onSuggestionsClearRequested}
				getSuggestionValue={this.props.getSuggestionValue}
				renderSuggestion={this.props.renderSuggestion}
				inputProps={inputProps}
				theme={theme}
			/>
		);
	}
}

Typeahead.propTypes = {
	data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	suggestions: React.PropTypes.arrayOf(React.PropTypes.object),
	value: React.PropTypes.string,
	placeholder: React.PropTypes.string,
	getSuggestionValue: React.PropTypes.func,
	renderSuggestion: React.PropTypes.func,
	onChange: React.PropTypes.func,
	onSuggestionsFetchRequested: React.PropTypes.func,
	onSuggestionsClearRequested: React.PropTypes.func,
};

Typeahead.defaultProps = {
	placeholder: "",
	getSuggestionValue,
	renderSuggestion,
};

export default Typeahead;