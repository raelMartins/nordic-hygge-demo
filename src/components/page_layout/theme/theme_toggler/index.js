import {Button, Center, Collapse, Flex, Text, useDisclosure} from '@chakra-ui/react';
import {useState} from 'react';

export const ThemeToggle = ({changeTheme}) => {
  const [toggleWidth, setToggleWidth] = useState('15rem');
  const {isOpen, onToggle} = useDisclosure();
  const [activeTheme, setactiveThemeName] = useState('');

  const handleShow = () => {
    if (isOpen) {
      setToggleWidth('15rem');
    } else {
      setToggleWidth('20rem');
    }
    onToggle();
  };

  const selectTheme = theme => {
    setactiveThemeName(theme);
    changeTheme(theme);
    handleShow();
    window.location = `${window.location.origin}/properties`;
  };

  return (
    <>
      <Center
        flexDirection={'column'}
        transition={'.5s'}
        boxShadow={'var(--basic-box-shadow)'}
        borderRadius={'50%'}
        p="1rem"
        w={isOpen ? '37rem' : '18rem'}
        h={isOpen ? '37rem' : '18rem'}
        maxH={'100%'}
        bg="matador_background.200"
      >
        <Button
          onClick={handleShow}
          transition={'.5s'}
          bg="transparent"
          p={isOpen ? '2rem' : '5.5rem 4rem'}
          _hover={{backgroundColor: 'transparent'}}
        >
          <Text
            transition={'.5s'}
            scale={isOpen ? '1.5' : '1'}
            fontSize={'1.6rem'}
            textTransform={'capitalize'}
            color={`matador_text.100`}
          >
            {!activeTheme ? 'Theme' : activeTheme.split('_').join(' ')}
          </Text>
        </Button>
        <Flex
          mt={'1rem'}
          direction={'column'}
          w={toggleWidth}
          minH={isOpen ? '20rem' : '0rem'}
          transition={'.5s'}
        >
          <Collapse
            in={isOpen}
            animateOpacity
            transition={{
              exit: {duration: 0.5},
              enter: {delay: 0.5, duration: 0.5},
            }}
          >
            <Flex direction={'column'} transition={'.5s'} gap={'1rem'}>
              <Button
                p="2rem"
                bg="matador_background.300"
                color="matador_text.200"
                _hover={{backgroundColor: 'inherit'}}
                fontSize={'1.6rem'}
                onClick={() => selectTheme('light')}
              >
                Light
              </Button>
              <Button
                p="2rem"
                bg="matador_background.300"
                color="matador_text.200"
                _hover={{backgroundColor: 'inherit'}}
                fontSize={'1.6rem'}
                onClick={() => selectTheme('dark')}
              >
                Dark
              </Button>
              <Button
                p="2rem"
                bg="matador_background.300"
                color="matador_text.200"
                _hover={{backgroundColor: 'inherit'}}
                fontSize={'1.6rem'}
                onClick={() => selectTheme('darkBlue')}
              >
                Dark Blue
              </Button>
              <Button
                p="2rem"
                bg="matador_background.300"
                color="matador_text.200"
                _hover={{backgroundColor: 'inherit'}}
                fontSize={'1.6rem'}
                onClick={() => selectTheme(`darkGreen`)}
              >
                Dark Green
              </Button>
            </Flex>
          </Collapse>
        </Flex>
      </Center>
    </>
  );
};
