import { useState } from 'react';
import { primaryColor } from 'shared/constants';
import styles from 'styles/Menu.module.sass';

const Menu = ({ categories }) => {
  const [selectedCategery, setSelectedCategory] = useState(categories[0]);
  return (
    <div className={styles.container}>
      <h2 className="h5 mb-3 d-none d-xl-block ml-1" style={{ color: primaryColor }}>
        Categorías
      </h2>

      <ul className={styles.tabs}>
        {categories.map((category) => {
          const isActive = selectedCategery.id === category.id;

          const handleSelectedCategory = (e) => {
            e.preventDefault();
            setSelectedCategory(category);
          };

          return (
            <li className={isActive ? styles.itemActive : styles.item} key={category.id}>
              <a
                onClick={handleSelectedCategory}
                className={isActive ? styles.tabActive : styles.tabItem}
                href="/"
              >
                {category.nombreCategoria}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
