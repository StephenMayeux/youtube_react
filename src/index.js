import _ from 'lodash';
// how we import modules from node_modules folder
import React, { Component } from 'react';
// to render things to DOM
import ReactDOM from 'react-dom';
// YouTube Search
import YTSearch from 'youtube-api-search';
// how to import components of our own. We need to export it though.
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDNbuXyQTftHuPoxPTihDwa5iOUA9sUjkw';

// Create a new component. Should produce some HTML.
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('dogs');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
      // ES6 makes it videos: videos because key/value name is the same
    });
  }

  render() {
    // for throttling
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
    );
  }
}

// Take generated HTML and put it in the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
