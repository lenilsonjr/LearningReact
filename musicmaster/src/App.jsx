import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import './App.css';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: [],
      token: '',
      featured_artist: '',
      featured_artist_id: 0      
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;  
  }

  componentDidMount() {
    this.trending()
  }

  trending() {
    let accessToken = this.state.token;

    const RELEASES_URL = 'https://api.spotify.com/v1/browse/new-releases';

    fetch(RELEASES_URL, {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(response => response.json())
    .then(json => {
      const items = json.albums.items;
      setInterval(() => this.setState({ featured_artist_id: this.getRandomInt(0, items.length) }), 3000);      
      setInterval(() => this.setState({ featured_artist: items[this.state.featured_artist_id].artists[0].name }), 3000);
    });

  }

  search() {
    let accessToken = this.state.token;

    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists'
    
    fetch(FETCH_URL, {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=BR&`;
      fetch(FETCH_URL, {
        method: 'GET',
        headers:  {
          'Authorization': 'Bearer ' + accessToken
        }
      })
      .then(response => response.json())
      .then(json => {
        console.log('tracks', json);
        const { tracks } = json;
        this.setState({tracks});
      })
    });
  }

  render(){
    return(
      <div className="app">
        <div className="app-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder={ this.state.featured_artist == '' ? 'search for an artist' : `try searching for ${this.state.featured_artist}` }
              query={this.state.query}
              onChange={event => { this.setState({ query: event.target.value }) }}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }

}

export default App;