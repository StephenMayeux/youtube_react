// we write { Component } to avoid writing React.Component later on
import React, { Component } from 'react';

// Class Component
// It inherits from React.Component
// Notice how its methods are different from object methods
class SearchBar extends Component {
  // class components can have states
  constructor(props) {
    // calling this method from parent class
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
      // manipulating state outside of constructor, we need to use setState()
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

// make it available to other JS files
export default SearchBar;
