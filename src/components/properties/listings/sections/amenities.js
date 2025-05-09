import {Box, Center, Flex, Grid, HStack, Image, Text, useTheme} from '@chakra-ui/react';
import {AMENITIES} from '@/constants/icon_images';
import {appCurrentTheme} from '@/utils/localStorage';
import {LIGHT} from '@/constants/names';
import {BiCheck} from 'react-icons/bi';
import {useState} from 'react';
import {IoArrowBack, IoArrowForward} from 'react-icons/io5';
import {Button} from '@/ui-lib';

const Amenities = ({info, ...rest}) => {
  function chunkArrayLoop(array, size) {
    let result = [];
    for (let i = 0; i < array?.length; i += size) {
      let chunk = [];
      for (let j = i; j < i + size && j < array?.length; j++) {
        chunk.push(array[j]);
      }
      result.push(chunk);
    }
    return result;
  }

  const theme = useTheme();
  const [slide, setSlide] = useState(1);
  const limit = 6;

  const amenities = info?.amenities;
  const amen_arrays = chunkArrayLoop(info?.amenities, limit);

  const getIcon = name => {
    const amenName = name
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll('/', '_')
      .replaceAll('  ', '_');
    const amenity = AMENITIES[amenName];
    return amenity?.src;
  };

  console.log(chunkArrayLoop(info?.amenities, limit));

  const navigate_slider = (direction = `forward`) => {
    const slider = document.getElementById(`amenities_slider`);
    if (amen_arrays?.length === 1) return;

    if (direction === `forward`) {
      if (slide == amen_arrays?.length) {
        return;
      } else {
        slider.scrollBy(slider.clientWidth || 550, 0);
        setSlide(slide + 1);
      }
    } else if (direction === `backward`) {
      if (slide == 1) {
        return;
      } else {
        setSlide(slide - 1);
        slider.scrollBy(-slider.clientWidth || -550, 0);
      }
    }
  };

  return amenities && amenities?.length > 0 ? (
    <Box maxW={{base: `360px`, md: `600px`, lg: `550px`}} mx={{base: `auto`, lg: `none`}} {...rest}>
      <Text
        fontSize={{base: '14px', lg: '20px'}}
        color="matador_text.100"
        className="heading-text-bold"
        textAlign={`center`}
        fontWeight={`600`}
        lineHeight={`220%`}
        letterSpacing={`5px`}
        textTransform={`uppercase`}
      >
        State-of-the-art{' '}
      </Text>
      <Text
        fontSize={{base: '24px', lg: '32px'}}
        color="matador_text.100"
        className="heading-text-bold"
        textAlign={`center`}
        fontWeight={`700`}
        lineHeight={`56px`}
        letterSpacing={`6px`}
        textTransform={`uppercase`}
      >
        Amenities
      </Text>
      <Box
        mt={`32px`}
        w={`100%`}
        overflowX={`auto`}
        scrollBehavior={`smooth`}
        scrollSnapType={`x mandatory`}
        position={'relative'}
        css={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        id={`amenities_slider`}
      >
        <Flex w={`${amen_arrays.length}00%`}>
          {[...amen_arrays]?.map((items, i) => (
            <Grid
              flex={`1`}
              key={i}
              templateColumns={`1fr 1fr 1fr`}
              // templateRows={`1fr 1fr`}
              gap={{base: `16px`, md: `32px`}}
              scrollSnapAlign={`start`}
            >
              {items?.map(amen => (
                <Flex
                  key={amen.name}
                  gap={{base: '10px', lg: '8px'}}
                  direction={{base: 'column'}}
                  alignItems={'center'}
                  px={{base: '18px', lg: '32px'}}
                  py={{base: '12px', lg: '16px'}}
                  justify={'flex-start'}
                  userSelect={`none`}
                >
                  <Center
                    boxSize={{base: '60px', lg: '90px'}}
                    borderRadius={`50%`}
                    border={`1px solid`}
                    p={{base: '10px', lg: `30px`}}
                    color={
                      !appCurrentTheme || appCurrentTheme === LIGHT
                        ? `custom_color.color`
                        : `custom_color.color`
                    }
                    // color={`matador_form.label`}
                  >
                    {getIcon(amen.name) ? (
                      <Image
                        boxSize={{base: '20px', lg: '32px'}}
                        alt="next_image"
                        src={getIcon(amen.name)}
                        // background={`custom_color.color`}
                        // filter={appCurrentTheme !== LIGHT ? `invert(1)` : ``}
                        // filter={`invert(1)`}
                        // filter={`invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%)`}
                        filter={`opacity(0.5) drop-shadow(0 0 0 ${theme?.colors?.custom_color.color}) drop-shadow(0 0 0 ${theme?.colors?.custom_color.color})  drop-shadow(0 0 0 ${theme?.colors?.custom_color.color})`}
                        // filter={`opacity(0.25) drop-shadow(0 0 0 ${theme?.colors?.matador_form.label}) drop-shadow(0 0 0 ${theme?.colors?.matador_form.label})  drop-shadow(0 0 0 ${theme?.colors?.matador_form.label})`}
                      />
                    ) : (
                      <Center>
                        <BiCheck fontSize={`40px`} />
                      </Center>
                    )}
                  </Center>

                  <Text
                    fontWeight={500}
                    color="matador_form.label"
                    className="sub-text-regular"
                    fontSize={{base: '12px', lg: '14px'}}
                    textAlign={'center'}
                    textTransform={'capitalize'}
                    lineHeight={`120%`}
                    letterSpacing={`.28px`}
                  >
                    {amen.name}
                  </Text>
                </Flex>
              ))}
            </Grid>
          ))}
        </Flex>
      </Box>

      {amen_arrays?.length > 1 && (
        <HStack justify={`center`} gap={{base: `16px`}}>
          <Center
            as={Button}
            boxSize={{base: `40px`}}
            bg={`custom_color.color`}
            color={`custom_color.contrast`}
            borderRadius={`50%`}
            cursor={`pointer`}
            onClick={() => navigate_slider(`backward`)}
            p={`0px`}
          >
            <IoArrowBack />
          </Center>
          <Center
            as={Button}
            boxSize={{base: `40px`}}
            bg={`custom_color.color`}
            color={`custom_color.contrast`}
            borderRadius={`50%`}
            cursor={`pointer`}
            onClick={() => navigate_slider(`forward`)}
            p={`0px`}
          >
            <IoArrowForward />
          </Center>
        </HStack>
      )}
    </Box>
  ) : null;
};

export default Amenities;
