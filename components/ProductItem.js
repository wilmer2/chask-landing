import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import styles from 'styles/ProductItem.module.sass';

const ProductItem = ({ product, onSelectProduct }) => {
  const router = useRouter();
  const handleOnClick = () => {
    const match = window.matchMedia('(min-width: 768px)');
    if (match.matches) {
      onSelectProduct(product);
    } else {
      router.push(`/products/${product.id}`);
    }
  };

  return (
    <div className="col-md-6 col-12 mb-2 mb-lg-3">
      <article
        className={styles.container}
        onClick={handleOnClick}
        onKeyDown={handleOnClick}
        role="button"
        tabIndex={0}
      >
        <figure className={styles.imgContainer}>
          <img
            className={styles.img}
            src={product.urlImagen}
            alt={`${product.nombreProducto} Logo`}
          />
        </figure>
        <div className={styles.infoContainer}>
          <h3 className={styles.title}>{capitalize(product.nombreProducto)}</h3>
          <p className={styles.description}>{product.descripcionProducto}</p>
          <span className={styles.price}>
            S/.
            {product.precioProducto.toFixed(2)}
          </span>
        </div>
      </article>
    </div>
  );
};

ProductItem.propTypes = {
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
  }).isRequired,
  onSelectProduct: PropTypes.func.isRequired,
};

export default ProductItem;
