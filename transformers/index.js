import groupBy from 'lodash/groupBy';

export const toOne = (data) => data[0];

export const toProductsByCategory = (productsListData) =>
  groupBy(productsListData, (product) => product.categoriaProducto);

export const toProducts = (productsListData, images) => {
  const products = productsListData.map((product) => {
    const image = images.find((imageSearched) => imageSearched.idProducto === product.id);

    return {
      ...product,
      urlImagen: image.imagenSugerida.urlImagen,
    };
  });

  return toProductsByCategory(products);
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
