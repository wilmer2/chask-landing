import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
import capitalize from 'lodash/capitalize';
import { primaryColor } from 'shared/constants';
import styles from 'styles/Menu.module.sass';

const Menu = ({ categories }) => {
  const sectionIds = categories.map((category) => category.nombreCategoria);

  const handleOnUpdate = (el) => {
    const match = window.matchMedia('(max-width: 1024px)');

    if (el && match.matches) {
      const item = document.querySelector(`#menu ul #li-${el.id}`);

      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  };

  return (
    <div className={styles.container} stickyoffset={{ top: 10 }} id="menu">
      <h2 className="h5 mb-3 d-none d-xl-block ml-1" style={{ color: primaryColor }}>
        Categorías
      </h2>

      <Scrollspy
        className={styles.tabs}
        onUpdate={handleOnUpdate}
        items={sectionIds}
        currentClassName={styles.itemActive}
      >
        {categories.map((category) => (
          <li className={styles.item} key={category.id} id={`li-${category.nombreCategoria}`}>
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
