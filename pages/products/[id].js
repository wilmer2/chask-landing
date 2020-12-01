import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ArrowLeft } from 'react-feather';
import capitalize from 'lodash/capitalize';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { primaryColor } from 'shared/constants';
import Layout from 'components/Layout';
import loginApi from 'shared/utils/api/login_api';
import productApi from 'shared/utils/api/product_api';
import productImageApi from 'shared/utils/api/product_image_api';
import productFeatureApi from 'shared/utils/api/product_feature_api';
import branchOfficeApi from 'shared/utils/api/branch_office_api';
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

export default function Product({ product, branchOffice }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="pt pl-4">Cargando...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/assets/images/cabeza.png" />
        <title>{product.nombreProducto}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className={styles.header}>
        <Link href={`/${branchOffice.nombreSucursal.toLowerCase().replace(/ /g, '-')}`}>
          <ArrowLeft size={25} color={primaryColor} />
        </Link>
        <div className="ml-2">
          <h2 className="h5">{capitalize(product.nombreProducto)}</h2>
        </div>
      </header>
      <figure className={`${styles.imgContainer} mt-1`}>
        <img className={styles.img} src={product.urlImagen} alt={product.nombreProducto} />
      </figure>
      <div className={styles.infoContainer}>
        <h1 className="h5">{capitalize(product.nombreProducto)}</h1>
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
    </Layout>
  );
}

Product.defaultProps = {
  product: null,
  branchOffice: null,
};

Product.propTypes = {
  branchOffice: PropTypes.shape({
    id: PropTypes.number,
    idTienda: PropTypes.number,
    colorSucursal: PropTypes.string,
    comisionSucursal: PropTypes.string,
    direccionSucursal: PropTypes.string,
    emailSucursal: PropTypes.string,
    encargadoSucursal: PropTypes.string,
    envioSucursal: PropTypes.number,
    estadoSucursal: PropTypes.string,
    latitud: PropTypes.number,
    longitud: PropTypes.number,
    nombreSucursal: PropTypes.string,
    nombreTienda: PropTypes.string,
    razonSocialSucursal: PropTypes.string,
    recepcionistaSucursal: PropTypes.string,
    recomendadoSucursal: PropTypes.string,
    restriccionSucursal: PropTypes.string,
    rucSucursal: PropTypes.string,
    telefonoSucursal: PropTypes.string,
    tiempoSucursal: PropTypes.number,
    tipoSucursal: PropTypes.string,
    whatsappSucursal: PropTypes.string,
    zonaSucursal: PropTypes.string,
  }),
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
  const branchOffice = await branchOfficeApi.findById(product.idSucursal, accessToken);

  return {
    props: {
      product,
      branchOffice,
    },
  };
}
