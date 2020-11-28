import Scrollspy from 'react-scrollspy';
import { primaryColor } from 'shared/constants';
import styles from 'styles/Menu.module.sass';

const Menu = ({ categories }) => {
  const sectionIds = categories.map((category) => category.nombreCategoria);

  return (
    <div className={styles.container} id="menu">
      <h2 className="h5 mb-3 d-none d-xl-block ml-1" style={{ color: primaryColor }}>
        Categorías
      </h2>

      <Scrollspy className={styles.tabs} items={sectionIds} currentClassName={styles.itemActive}>
        {categories.map((category) => (
          <li className={styles.item} key={category.id} id={`li-${category.nombreCategoria}`}>
            <a className={styles.tabItem} href={`#${category.nombreCategoria}`}>
              {category.nombreCategoria}
            </a>
          </li>
        ))}
      </Scrollspy>
    </div>
  );
};

export default Menu;
