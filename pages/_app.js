/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import '../styles/globals.sass';

function ChaskiApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

ChaskiApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default ChaskiApp;
