import { useRouter } from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ArrowLeft } from 'react-feather';
import capitalize from 'lodash/capitalize';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { primaryColor } from 'shared/constants';
import loginApi from 'shared/utils/api/login_api';
import productApi from 'shared/utils/api/product_api';
import productImageApi from 'shared/utils/api/product_image_api';
import productFeatureApi from 'shared/utils/api/product_feature_api';
import { toProduct } from 'transformers';
import styles from 'styles/Product.module.sass';

const ProductExtra = ({ features, featureName }) => (
  <div className="mt-1 mb-3">
    <div className={styles.listTitle}>
      <h3 className="h6">{featureName}</h3>
    </div>
    <ul className={styles.listContainer}>
      {features.map((feature) => (
        <li key={feature.id} className="mt-1">
          {capitalize(feature.nombreCaracteristica)}
        </li>
      ))}
    </ul>
  </div>
);

export default function Product({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/assets/images/cabeza.png" />
        <title>{product.nombreProducto}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className={styles.header}>
        <ArrowLeft size={30} color={primaryColor} />
        <h2 className="h4 ml-2">{capitalize(product.nombreProducto)}</h2>
      </header>
      <figure className={`${styles.imgContainer} mt-1`}>
        <img className={styles.img} src={product.urlImagen} alt={product.nombreProducto} />
      </figure>
      <div className={styles.infoContainer}>
        <h1 className="h4">{capitalize(product.nombreProducto)}</h1>
        <div>
          <p className={styles.description}>{product.descripcionProducto}</p>
          <span>
            S/.
            {product.precioProducto.toFixed(2)}
          </span>
        </div>
      </div>
      {!isEmpty(product.features) && (
        <>
          {map(product.features, (features, featureName) => (
            <ProductExtra key={featureName} featureName={featureName} features={features} />
          ))}
        </>
      )}
    </>
  );
}

Product.defaultProps = {
  product: null,
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    idCategoria: PropTypes.number,
    idSucursal: PropTypes.number,
    idTipo: PropTypes.number,
    categoriaProducto: PropTypes.string,
    colorProducto: PropTypes.string,
    descripcionExtendidaProducto: PropTypes.string,
    descripcionProducto: PropTypes.string,
    descuentoProducto: PropTypes.number,
    diasProducto: PropTypes.string,
    estadoProducto: PropTypes.string,
    fechaProducto: PropTypes.string,
    horaFinalProducto: PropTypes.string,
    horaInicialProducto: PropTypes.string,
    nombreProducto: PropTypes.string,
    pesoProducto: PropTypes.number,
    precioProducto: PropTypes.number,
    sucursal: PropTypes.string,
    tipoProducto: PropTypes.string,
    urlImagen: PropTypes.string,
    volumenProducto: PropTypes.number,
    features: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          idProducto: PropTypes.number,
          nombreCaracteristica: PropTypes.string,
          categoriaCaracteristica: PropTypes.string,
          limiteCaracteristica: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          tipoCaracteristica: PropTypes.string,
        })
      )
    ),
  }),
};

ProductExtra.propTypes = {
  featureName: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      idProducto: PropTypes.number,
      nombreCaracteristica: PropTypes.string,
      categoriaCaracteristica: PropTypes.string,
      limiteCaracteristica: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      tipoCaracteristica: PropTypes.string,
    })
  ).isRequired,
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const { accessToken } = await loginApi.login();
  const productsResponse = await productApi.findById(id, accessToken);
  const image = await productImageApi.findOne(id, accessToken);
  const featuresPurchased = await productFeatureApi.findByProductIdPurchased(id, accessToken);
  const featuresFree = await productFeatureApi.findByProductIdFree(id, accessToken);
  const product = toProduct(productsResponse, image, featuresPurchased, featuresFree);

  return {
    props: {
      product,
    },
  };
}
