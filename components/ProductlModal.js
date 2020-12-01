import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { X } from 'react-feather';
import styles from 'styles/ProductModal.module.sass';

const ProductModalFeature = ({ features, featureName }) => (
  <div className="mt-2">
    <strong>{capitalize(featureName)}</strong>
    <ul>
      {features.map((feature) => (
        <li className="mb-1" key={feature.id}>
          {capitalize(feature.nombreCaracteristica)}
        </li>
      ))}
    </ul>
  </div>
);
const ProductModal = ({ product, onCloseModal }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onCloseModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.modalContainer} ref={wrapperRef}>
          <div
            className={`${styles.header} d-flex d-md-none justify-content-between align-items-center`}
          >
            <h2 className="h5">{capitalize(product.nombreProducto)}</h2>
            <X size={20} color="red" onClick={onCloseModal} />
          </div>
          <div className="d-md-flex">
            <figure
              className={styles.imageContainer}
              style={{
                backgroundImage: `url(${product.urlImagen}), url(/assets/images/chaski_splash.png)`,
              }}
            />

            <div className={styles.infoContainer}>
              <h2 className={`h3 ${styles.title}`}>{capitalize(product.nombreProducto)}</h2>
              <p className={styles.description}>{product.descripcionProducto}</p>
              {!isEmpty(product.features) && (
                <div className="mt-1">
                  {map(product.features, (features, featureName) => (
                    <ProductModalFeature
                      key={featureName}
                      featureName={featureName}
                      features={features}
                    />
                  ))}
                </div>
              )}
              <div
                className={`${styles.price} ${
                  isEmpty(product.features) ? 'mt-1' : 'mt-2'
                } mb-1 ml-1`}
              >
                S/
                {product.precioProducto.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductModalFeature.propTypes = {
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

ProductModal.propTypes = {
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
  onCloseModal: PropTypes.func.isRequired,
};

export default ProductModal;
