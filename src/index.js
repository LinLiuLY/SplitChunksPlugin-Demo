import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, NavLink as Link, Route } from 'react-router-dom';
import AsyncContactComponent from './AsyncContactComponent';
import AsyncHomeComponent from './AsyncHomeComponent';
import AsyncAboutComponent from './AsyncAboutComponent';
import './styles.scss';

import( './async.js' ).then( ( data ) => {
    console.log( data );
} );

// create sample App component
class App extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <div className="menu">
                        <Link exact to="/" activeClassName="active">Home</Link>
                        <Link to="/about" activeClassName="active">About</Link>
                        <Link to="/contact" activeClassName="active">Contact</Link>
                    </div>
                    
                    <Switch>
                        <Route exact path="/" component={ AsyncHomeComponent } />
                        <Route path="/about" component={ AsyncAboutComponent } />
                        <Route path="/contact" render={ 
                        ( props ) => <AsyncContactComponent { ...props } value="1" />
                        } />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

// render inside `app-root` element
ReactDOM.render( <App />, document.getElementById( 'app-root' ) );