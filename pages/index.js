import { useState } from 'react';
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

export default function Home({ shop, categories, branchOffice, products, promotions }) {
  const [selectedProducts, setSelectedProducts] = useState(products);

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

  return (
    <>
      <Header />
      <Hero branchOffice={branchOffice} shop={shop} onSearchProducts={handleSearchProducts} />
      <div className={styles.main}>
        {promotions.length > 0 && (
          <div className={`${styles.container} d-lg-block d-none pt-3`}>
            <PromotionList promotions={promotions} />
          </div>
        )}
        <div className={`${styles.container} pt-4 mb-2`}>
          <Menu categories={categories} />

          <div className={`${styles.content} ml-lg-2 flex-lg-grow-1`}>
            {promotions.length > 0 && (
              <div className="d-lg-none">
                <PromotionList promotions={promotions} />
              </div>
            )}
            {map(selectedProducts, (productListData, productCategory) => (
              <ProductList
                key={productCategory}
                productCategory={productCategory}
                productListData={productListData}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const { accessToken } = await loginApi.login();

  const branchName = "D'GARAY";
  const branchOfficeResponse = await branchOfficeApi.searchByName(branchName, accessToken);
  const branchOffice = toOne(branchOfficeResponse);
  const shopResponse = await shopApi.findById(branchOffice.idTienda, accessToken);
  const shop = toOne(shopResponse);
  const categoriesResponse = await categoryApi.findByBranchOfficeId(branchOffice.id, accessToken);
  const categories = toCategories(categoriesResponse);
  const productsResponse = await productApi.findByBranchOfficeId(branchOffice.id, accessToken);
  const productImageParams = toProductsParamsIds(productsResponse);
  const productImages = await productImageApi.findByProductIds(productImageParams, accessToken);
  const products = toProducts(productsResponse, productImages);
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
