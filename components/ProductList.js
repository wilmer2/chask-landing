import PropTypes from 'prop-types';
import styles from 'styles/ProductList.module.sass';
import ProductItem from 'components/ProductItem';

const ProductList = ({ productCategory, productListData, onSelectProduct }) => (
  <div className={`${styles.container}`} id={productCategory}>
    <h2 className={styles.title}>{productCategory}</h2>
    <div className="row">
      {productListData.map((product) => (
        <ProductItem key={product.id} product={product} onSelectProduct={onSelectProduct} />
      ))}
    </div>
  </div>
);

ProductList.propTypes = {
  productCategory: PropTypes.string.isRequired,
  productListData: PropTypes.arrayOf(
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
          }),
        ),
      ),
    }),
  ).isRequired,
  onSelectProduct: PropTypes.func.isRequired,
};

export default ProductList;
