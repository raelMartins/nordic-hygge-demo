import {Flex, RadioGroup, HStack, Text, Tooltip, Radio, Grid, Box} from '@chakra-ui/react';
import React from 'react';

const SelectUnit = ({ALLOCATIONS, setAllocationVal, allocationVal}) => {
  const css = {'.chakra-radio__label': {marginLeft: '0px'}};

  return ALLOCATIONS?.length ? (
    <RadioGroup onChange={setAllocationVal} value={allocationVal}>
      <Text
        fontSize="16px"
        fontWeight="500"
        color="matador_form.label"
        letterSpacing={`-0.32px`}
        mb={`24px`}
      >
        Select a Unit
      </Text>
      <Grid gap={`25px`} templateColumns={`1fr 1fr 1fr`}>
        {ALLOCATIONS.map((allocation, idx) => {
          return (
            <Box
              border={`1px solid`}
              borderColor={`text !important`}
              bg={allocationVal == allocation?.name ? '#191919' : 'matador_background.200'}
            >
              <Tooltip
                borderRadius="3px"
                fontSize="12px"
                hasArrow
                isDisabled={!allocation.allocated}
                placement="auto"
                label="This unit has been allocated"
              >
                <Radio
                  key={idx}
                  isDisabled={allocation?.allocated}
                  value={allocation?.name}
                  hidden
                  cursor={allocation.allocated ? 'not-allowed' : 'pointer'}
                  justify="center"
                  p={{base: '9px'}}
                  // w={`100%`}
                  textAlign={`center`}
                >
                  <Text
                    fontSize={{base: '15px'}}
                    color={allocationVal == allocation?.name ? '#fff' : 'text'}
                    fontweight="700"
                    w={`100%`}
                    flex={`1`}
                    mx={`auto`}
                    letterSpacing={`2px`}
                    textAlign={`center`}
                    textTransform={`uppercase`}
                  >
                    {allocation?.name}
                  </Text>
                </Radio>
              </Tooltip>
            </Box>
          );
        })}
      </Grid>
    </RadioGroup>
  ) : null;
};

export default SelectUnit;
