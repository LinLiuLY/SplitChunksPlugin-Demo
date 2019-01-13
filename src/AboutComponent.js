import React from 'react';
import HelloComponent from './HelloComponent';

const AboutComponent = ( props ) => {
    return (
        <h1>About Component!<HelloComponent /></h1>
    );
}
export default AboutComponent;