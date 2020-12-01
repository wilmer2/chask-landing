import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <>
    <Head>
      <link rel="shortcut icon" href="/assets/images/cabeza.png" />
      <title>Chaski delivery</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
