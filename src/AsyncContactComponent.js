import React from 'react';
import loadable from 'react-loadable';
// contact route component
const LoadingComponent = () => <h3>please wait...</h3>;
const ContactComponentPromise = () => {
    return import('./ContactComponent');
}
const AsyncContactComponent = loadable( {
    loader: ContactComponentPromise,
    loading: LoadingComponent
} );

export default AsyncContactComponent;