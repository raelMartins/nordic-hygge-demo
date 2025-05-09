import star from '/src/realtors_portal/images/icons/star.png';
import emptyStar from '/src/realtors_portal/images/icons/empty_star.png';
import {Image} from '@chakra-ui/react';

export const Stars = ({num}) => {
  const stars = Array.from({length: 5}, (_, index) => {
    const digit = index + 0.5;
    return num >= index + 1 ? (
      //   <ImStarFull key={index} />
      <Image src={star.src} key={index} boxSize="24px" alt="star rating" />
    ) : num >= digit ? undefined : ( //half star image
      <Image src={emptyStar.src} key={index} boxSize="24px" alt="star rating" />
    );
  });

  return <> {stars}</>;
};
