import {HStack, Image} from '@chakra-ui/react';
import EmptyStarIcon from '/src/images/icons/emptyStarForFeedback.svg';
import starIcon from '/src/images/icons/starForFeedBack.svg';

export const Ratings = ({rating, setRating, forHistory, starStyle, ...rest}) => {
  const handleStarSelection = idx => {
    if (idx === ~~rating) {
      return setRating(idx - 1);
    }
    return setRating(idx);
  };

  return (
    <HStack mb="20.72px" spacing="4px" {...rest}>
      {[1, 2, 3, 4, 5].map((item, idx) => {
        return (
          <HStack key={idx} h="31.8px" align="center" justify="center" w="31.88px" {...starStyle}>
            {item <= rating ? (
              <Image
                w="31.88px"
                h="31.8px"
                src={starIcon.src}
                onClick={() => (forHistory ? null : handleStarSelection(item))}
                alt="selected star icon"
                fontSize="3px"
                cursor={forHistory ? 'default' : 'pointer'}
                {...starStyle}
              />
            ) : (
              <Image
                w="31.88px"
                h="31.8px"
                src={EmptyStarIcon.src}
                cursor={forHistory ? 'default' : 'pointer'}
                onClick={() => (forHistory ? null : handleStarSelection(item))}
                alt="selected star icon"
                fontSize="3px"
                {...starStyle}
              />
            )}
          </HStack>
        );
      })}
    </HStack>
  );
};
