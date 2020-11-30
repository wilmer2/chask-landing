import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
import capitalize from 'lodash/capitalize';
import { primaryColor } from 'shared/constants';
import styles from 'styles/Menu.module.sass';

const Menu = ({ categories }) => {
  const sectionIds = categories.map((category) => category.nombreCategoria);

  return (
    <div className={styles.container}>
      <h2 className="h5 mb-3 d-none d-xl-block ml-1" style={{ color: primaryColor }}>
        Categorías
      </h2>

      <Scrollspy className={styles.tabs} items={sectionIds} currentClassName={styles.itemActive}>
        {categories.map((category) => (
          <li className={styles.item} key={category.id}>
            <a className={styles.tabItem} href={`#${category.nombreCategoria}`}>
              {capitalize(category.nombreCategoria)}
            </a>
          </li>
        ))}
      </Scrollspy>
    </div>
  );
};

Menu.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      idSucursal: PropTypes.number,
      nombreCategoria: PropTypes.string,
      descripcionCategoria: PropTypes.string,
    })
  ).isRequired,
};

export default Menu;
