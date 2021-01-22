import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import Home from './Components/Home/Home'
import Genres from './Components/Genres/Genres'
import Artists from './Components/Artists/Artists'
import Albums from './Components/Albums/Albums'

import SingleGenre from './Components/Genres/SingleGenre';
import SingleArtist from './Components/Artists/SingleArtist';
import SingleAlbum from './Components/Albums/SingleAlbum';

function App() {
  return (
    <div className="App">
      <Nav>
      <Link to="/">Home</Link><br/>

      </Nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route /*exact*/ path="/genres/:id" render={routerProps => {
          return <SingleGenre {...routerProps} />
        }}/>
        <Route path="/genres" component={Genres} />
        <Route path="/artists/:id" render={routerProps => {
          return <SingleArtist {...routerProps} />
        }}/>
        <Route path="/artists" component={Artists} />
        <Route path="/albums/:id" render={routerProps => {
          return <SingleAlbum {...routerProps} />
        }}/>
        <Route path="/albums" component={Albums} />
      </Switch>
    </div>
  );
}

export default App;
