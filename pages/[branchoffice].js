import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Head from 'next/head';
import assign from 'lodash/assign';
import flatten from 'lodash/flatten';
import map from 'lodash/map';
import values from 'lodash/values';
import Header from 'components/Header';
import Hero from 'components/Hero';
import Menu from 'components/Menu';
import ProductList from 'components/ProductList';
import PromotionList from 'components/PromotionList';
import ProductModal from 'components/ProductlModal';
import styles from 'styles/Home.module.sass';
import {
  toOne,
  toProducts,
  toProductsParamsIds,
  toProductsByCategory,
  toPromotions,
  toCategories,
} from 'transformers';
import loginApi from 'shared/utils/api/login_api';
import branchOfficeApi from 'shared/utils/api/branch_office_api';
import shopApi from 'shared/utils/api/shop_api';
import categoryApi from 'shared/utils/api/category_api';
import productApi from 'shared/utils/api/product_api';
import productImageApi from 'shared/utils/api/product_image_api';
import productFeatureApi from 'shared/utils/api/product_feature_api';

export default function Home({ shop, categories, branchOffice, products, promotions }) {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  const handleSearchProducts = (search) => {
    const productsListData = assign(products, {});
    const productsValues = values(productsListData);
    const productsValueOneLevel = flatten(productsValues);
    const filteredProducts = productsValueOneLevel.filter((product) => {
      const categoria = product.categoriaProducto.toLowerCase();
      const nombre = product.nombreProducto.toLowerCase();

      return categoria.includes(search) || nombre.includes(search);
    });

    setSelectedProducts(toProductsByCategory(filteredProducts));
  };

  useEffect(() => {
    setSelectedProducts(products);
  }, [products]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/assets/images/cabeza.png" />
        <title>{branchOffice.nombreSucursal}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Hero branchOffice={branchOffice} shop={shop} onSearchProducts={handleSearchProducts} />

      <div className={styles.main}>
        {promotions.length > 0 && (
          <>
            {/*<div className={`${styles.container} d-lg-block d-none pt-3`}>
            <PromotionList promotions={promotions} />
        </div>*/}
          </>
        )}
        <div className={`${styles.container} pt-4 mb-2`}>
          <Menu categories={categories} />

          <div className={`${styles.content} ml-lg-2 flex-lg-grow-1`}>
            {/*promotions.length > 0 && (
              <div className="d-lg-none">
                <PromotionList promotions={promotions} />
              </div>
            )*/}
            {map(selectedProducts, (productListData, productCategory) => (
              <ProductList
                key={productCategory}
                onSelectProduct={handleSelectProduct}
                productCategory={productCategory}
                productListData={productListData}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onCloseModal={handleCloseModal} />
      )}
    </>
  );
}

Home.defaultProps = {
  categories: [],
  shop: null,
  branchOffice: null,
  products: null,
  promotions: [],
};

Home.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      idSucursal: PropTypes.number,
      nombreCategoria: PropTypes.string,
      descripcionCategoria: PropTypes.string,
    })
  ),
  shop: PropTypes.shape({
    id: PropTypes.number,
    idUser: PropTypes.number,
    confirmarTienda: PropTypes.number,
    estadoTienda: PropTypes.number,
    emailTienda: PropTypes.string,
    emailUsuario: PropTypes.string,
    encargadoTienda: PropTypes.string,
    imagenTienda: PropTypes.string,
    nombreTienda: PropTypes.string,
    nombreUsuario: PropTypes.string,
    rucTienda: PropTypes.string,
    tipoTienda: PropTypes.string,
    razonSocialTienda: PropTypes.string,
  }),
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

  products: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
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
      })
    )
  ),
  promotions: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { accessToken } = await loginApi.login();
  const branchName = params.branchoffice.toUpperCase().replace('-', ' ');
  const branchOfficeResponse = await branchOfficeApi.searchByName(branchName, accessToken);
  const branchOffice = toOne(branchOfficeResponse);
  const shopResponse = await shopApi.findById(branchOffice.idTienda, accessToken);
  const shop = toOne(shopResponse);
  const categoriesResponse = await categoryApi.findByBranchOfficeId(branchOffice.id, accessToken);
  const categories = toCategories(categoriesResponse);
  const productsResponse = await productApi.findByBranchOfficeId(branchOffice.id, accessToken);
  const productParamsIds = toProductsParamsIds(productsResponse);
  const productImages = await productImageApi.findByProductIds(productParamsIds, accessToken);
  const featuresPurchased = await productFeatureApi.findAllPurchased(productParamsIds, accessToken);
  const featuresFree = await productFeatureApi.findAllFree(productParamsIds, accessToken);
  const products = toProducts(productsResponse, productImages, featuresPurchased, featuresFree);
  const promotions = toPromotions(productsResponse, productImages);

  return {
    props: {
      shop,
      categories,
      branchOffice,
      products,
      promotions,
    },
  };
}
