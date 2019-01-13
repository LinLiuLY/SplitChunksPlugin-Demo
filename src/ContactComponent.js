import React from 'react';
import HelloComponent from './HelloComponent';

const ContactComponent = ( props ) => {
    return (
        <h1>Contact Component!<HelloComponent /></h1>
    );
}
export default ContactComponent;