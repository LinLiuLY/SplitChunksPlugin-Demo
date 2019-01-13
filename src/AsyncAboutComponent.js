import React from 'react';
import loadable from 'react-loadable';
// About route component
const LoadingComponent = () => <h3>please wait...</h3>;
const AboutComponentPromise = () => {
    return import('./AboutComponent');
}
const AsyncAboutComponent = loadable( {
    loader: AboutComponentPromise,
    loading: LoadingComponent
} );

export default AsyncAboutComponent;