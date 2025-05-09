import star from '/src/realtors_portal/images/icons/star.png';
import emptyStar from '/src/realtors_portal/images/icons/empty_star.png';
import {Center, HStack, Image} from '@chakra-ui/react';
import {HiStar} from 'react-icons/hi';
import {useState} from 'react';

export const Stars = ({rating, selectRating = () => {}}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = Array.from({length: 5}, (_, index) => {
    return (
      //   <ImStarFull key={index} />
      <Center
        key={index}
        color={
          !rating && hoverRating >= index + 1
            ? `#FDBD11`
            : rating >= index + 1
            ? `#FDBD11`
            : `#DADADA`
        }
        fontSize={`32px`}
        onClick={() => selectRating(index + 1)}
        cursor={`pointer`}
        onMouseOver={() => setHoverRating(index + 1)}
        onMouseOut={() => setHoverRating(0)}
      >
        <HiStar />
      </Center>
    );
  });

  return <HStack gap={`4px`}>{stars} </HStack>;
};
