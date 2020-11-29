import styles from 'styles/ProductItem.module.sass';

const ProductItem = ({ product, onSelectProduct }) => {
  const handleOnClick = () => onSelectProduct(product);
  return (
    <div className="col-md-6 col-12 mb-2 mb-lg-3">
      <div
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
          <h3 className={styles.title}>{product.nombreProducto}</h3>
          <p className={styles.description}>{product.descripcionProducto}</p>
          <span className={styles.price}>S/.{product.precioProducto.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
