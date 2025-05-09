import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Flex} from '@chakra-ui/react';
import {Spinner} from '../ui-lib';

function LandingWrapper(Component) {
  const AuthCheck = () => {
    const router = useRouter();
    const [checked, setChecked] = useState(true);

    return (
      <div>
        {checked ? (
          <Component />
        ) : (
          <Flex justify="center" align="center" h="100vh" w="100vw">
            <Spinner />
          </Flex>
        )}
      </div>
    );
  };
  return AuthCheck;
}

export default LandingWrapper;
