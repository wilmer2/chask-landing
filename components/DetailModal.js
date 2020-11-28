import { useEffect, useRef } from 'react';
import { X } from 'react-feather';
import styles from 'styles/Detail.module.sass';

const DetailModal = ({ product, onCloseModal }) => {
  console.log(product);
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

  console.log('products', product);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.modalContainer} ref={wrapperRef}>
          <div
            className={`${styles.header} d-flex d-md-none justify-content-between align-items-center`}
          >
            <h2 className="h5">La Estancia</h2>
            <X size={20} color="red" />
          </div>
          <div className="d-md-flex">
            <figure
              className={styles.imageContainer}
              style={{
                backgroundImage: `url(${product.urlImagen})`,
              }}
            />

            <div className={styles.infoContainer}>
              <h2 className="h4"> La Estancia</h2>
              <p className={styles.description}>Lomito al juego servido con papas fritas y pan</p>
              {/*<div className="mt-3">
                <strong>Elige un sabor</strong>
                <ul>
                  <li className="mt-1"> Salsa de tomate</li>
                  <li className="mt-1"> Salsa de tomate</li>
                  <li className="mt-1"> Salsa de tomate</li>
                  <li className="mt-1"> Salsa de tomate</li>
                  <li className="mt-1"> Salsa de tomate</li>
                </ul>
              </div>*/}
              <div className={`${styles.price} mt-3 ml-1`}>S/25.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
