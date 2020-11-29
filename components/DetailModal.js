import { useEffect, useRef } from 'react';
import capitalize from 'lodash/capitalize';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { X } from 'react-feather';
import styles from 'styles/Detail.module.sass';

const DetailFeature = ({ features, featureName }) => (
  <div className="mt-2">
    <strong>{capitalize(featureName)}</strong>
    <ul>
      {features.map((feature) => (
        <li className="mt-1" key={feature.id}>
          {capitalize(feature.nombreCaracteristica)}
        </li>
      ))}
    </ul>
  </div>
);
const DetailModal = ({ product, onCloseModal }) => {
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
                backgroundImage: `url(${product.urlImagen})`,
              }}
            />

            <div className={styles.infoContainer}>
              <h2 className="h3"> {capitalize(product.nombreProducto)}</h2>
              <p className={styles.description}>{product.descripcionProducto}</p>
              {!isEmpty(product.features) && (
                <div className="mt-3">
                  {map(product.features, (features, featureName) => (
                    <DetailFeature
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
                S/{product.precioProducto.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
