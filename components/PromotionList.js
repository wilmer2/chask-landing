import Slider from 'react-slick';
import PromotionItem from 'components/PromotionItem';
import styles from 'styles/PromotionList.module.sass';

const PromotionList = ({ promotions }) => {
  const responsive = [
    {
      breakpoint: 2000,
      settings: {
        infinite: true,
        slidesToShow: promotions.length > 1 ? 2 : 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} h4`}>Promociones</h2>
      <Slider responsive={responsive} mobileFirst speed={500} autoplay autoplaySpeed={2000}>
        {promotions.map((promotion) => (
          <PromotionItem key={promotion.id} promotion={promotion} />
        ))}
      </Slider>
    </div>
  );
};

export default PromotionList;
