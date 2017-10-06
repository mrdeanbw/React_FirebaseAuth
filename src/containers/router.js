import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import Home from './home';
import Lovemap from './lovemap/lovemap';
import Story from './ourstory/story';
import Contact from './contact/contact';
import Location from './lovemap/sidebarcontent/location';
import Customise from './lovemap/sidebarcontent/customise';
import Layout from './lovemap/sidebarcontent/layout';
import Checkout from './lovemap/sidebarcontent/checkout';
import Service from './service/service';
import Police from './service/police';

export default class extends React.Component {
  render() {
    return(
      <Router history={browserHistory}>
          <Route path="/" component={Home} />
            <Route path="/service" component={Service} /> 
            <Route path="/police" component={Police} /> 
          <Route path="lovemap" component={Lovemap} >
            <IndexRoute component={Location} />
            <Route path="/lovemap/location" component={Location} />     
            <Route path="/lovemap/customise" component={Customise} /> 
            <Route path="/lovemap/layout" component={Layout} /> 
            <Route path="/lovemap/checkout" component={Checkout} /> 
          </Route>        
          <Route path="story" component={Story} />     
          <Route path="contact" component={Contact} />    
      </Router>
    )
  }
}
