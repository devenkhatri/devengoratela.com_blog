import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import { IonGrid, IonText } from '@ionic/react';
import { Heading } from 'gatsby-theme-landing-page';

const NotFound = () => {
    return (
        <Layout>
            <Heading center><h1>404: Page Not Found</h1>
                <p>
                    <Link to="/">Check our latest articles on Homepage</Link>
                </p>
            </Heading>
        </Layout>
    );
};

export default NotFound;