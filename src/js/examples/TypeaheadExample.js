import React from "react";
import Typeahead from "../components/Typeahead";

class TypeaheadExample extends React.Component {

	state = {
		value: "",
		suggestions: [],
	}

	onChange = (event, { newValue }) => this.setState({ value: newValue })

	// Autosuggest will call this function every time you need to update suggestions.
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({ suggestions: this.getSuggestions(value) });
	}

	// Autosuggest will call this function every time you need to clear suggestions.
	onSuggestionsClearRequested = () => this.setState({ suggestions: [] })

	// Teach Autosuggest how to calculate suggestions for any given input value.
	getSuggestions = (value) => {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;

		return inputLength === 0 ? [] : this.props.data.filter(item => (
			item.name.toLowerCase().slice(0, inputLength) === inputValue
		));
	}

	render() {
		return (
			<Typeahead
				placeholder="U.S. states"
				value={this.state.value}
				suggestions={this.state.suggestions}
				onChange={this.onChange}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
			/>
		);
	}
}

export default TypeaheadExample;

TypeaheadExample.propTypes = {
	data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};