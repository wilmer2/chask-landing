import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';

export const toOne = (data) => data[0];
export const toCategories = (categories) => orderBy(categories, ['nombreCategoria'], ['asc']);

export const toProductsByCategory = (productsListData) => {
  const products = orderBy(productsListData, ['categoriaProducto'], ['asc']);
  return groupBy(products, (product) => product.categoriaProducto);
};

export const toProducts = (productsListData, images) => {
  const filteredProducts = productsListData.filter((product) => product.idTipo === 1);

  const products = filteredProducts.map((product) => {
    const image = images.find((imageSearched) => imageSearched.idProducto === product.id);

    return {
      ...product,
      urlImagen: image.imagenSugerida.urlImagen,
    };
  });

  return toProductsByCategory(products);
};

export const toPromotions = (productsListData, images) => {
  const filteredProducts = productsListData.filter((product) => product.idTipo === 2);

  const products = filteredProducts.map((product) => {
    const image = images.find((imageSearched) => imageSearched.idProducto === product.id);

    return {
      ...product,
      urlImagen: image.imagenSugerida.urlImagen,
    };
  });

  return products;
};

export const toProductsParamsIds = (products) => {
  const productParamsIds = products.reduce((params, product) => {
    if (!params) {
      return `productIds[]=${product.id}`;
    }
    return `${params}&productIds[]=${product.id}`;
  }, null);

  return productParamsIds;
};
