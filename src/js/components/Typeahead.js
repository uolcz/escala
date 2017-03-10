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
		this.setState({
			value: newValue,
		});
	};

	// Autosuggest will call this function every time you need to update suggestions.
	// You already implemented this logic above, so just use it.
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

	// When suggestion is clicked, Autosuggest needs to populate the input element
	// based on the clicked suggestion. Teach Autosuggest how to calculate the
	// input value for every given suggestion.
	getSuggestionValue = suggestion => suggestion.name;

	// Use your imagination to render suggestions.
	renderSuggestion = suggestion => (
		<div>
			{suggestion.name}
		</div>
	);

	render() {
		const { value, suggestions } = this.state;

		// Autosuggest will pass through all these props to the input element.
		const inputProps = {
			placeholder: this.props.placeholder,
			value,
			onChange: this.onChange,
		};

		// Finally, render it!
		return (
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={this.renderSuggestion}
				inputProps={inputProps}
				theme={theme}
			/>
		);
	}
}

Typeahead.propTypes = {
	data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	placeholder: React.PropTypes.string,
};

Typeahead.defaultProps = {
	placeholder: "",
};

export default Typeahead;