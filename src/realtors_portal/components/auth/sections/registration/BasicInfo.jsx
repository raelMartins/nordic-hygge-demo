import {Button, FormInput} from '@/ui-lib';
import {Box, Flex, Text} from '@chakra-ui/react';
import {form_input_style} from '../registerForm';

export const BasicRegistrationInfo = ({formik, setScreen, setCountryCode, ...rest}) => {
  return (
    <>
      <Flex h="full" direction="column" justify={'center'} align="center" gap={`12px`}>
        <Text
          fontSize={'23px'}
          fontWeight={700}
          color="text"
          className="heading-text-regular"
          textAlign={`center`}
          lineHeight={`140%`}
          maxW={`80%`}
          mx={`auto`}
        >
          Input basic details to create an account{' '}
        </Text>
        <FormInput
          {...form_input_style}
          type="text"
          error={formik.errors.first_name && formik.touched.first_name}
          onChange={formik.handleChange('first_name')}
          value={formik.values.first_name}
          placeholder="First Name"
          formik={formik}
        />
        <FormInput
          {...form_input_style}
          type="text"
          error={formik.errors.middle_name && formik.touched.middle_name}
          onChange={formik.handleChange('middle_name')}
          value={formik.values.middle_name}
          placeholder="Middle Name"
        />
        <FormInput
          {...form_input_style}
          type="text"
          error={formik.errors.last_name && formik.touched.last_name}
          onChange={formik.handleChange('last_name')}
          value={formik.values.last_name}
          placeholder="Last Name"
        />

        <Box w="full">
          <Flex h={'44px'} w="full" align={'center'} gap={`12px`}>
            <FormInput
              h={'44px'}
              borderRadius={0}
              _focus={{
                border: '1px solid  !important',
                borderColor: 'matador_text.400 !important',
              }}
              type="phone"
              value={formik.values.phone}
              onChange={formik.handleChange('phone')}
              // getDialCode={el => setCountryCode(el)}
              pattern="[0-9]"
              placeholder={'Phone number'}
              _placeholder={{
                // fontSize,
                opacity: 0.6,
              }}
              border={formik.errors.phone && formik.touched.phone ? '2px solid' : '1px solid'}
              borderColor={
                formik.errors.phone && formik.touched.phone ? 'red' : 'matador_border_color.100'
              }
              error={formik.errors.phone && formik.touched.phone}
            />
          </Flex>
          {/* <Text color={`red`} my={'5px'} fontSize={'14px'}>
            {formik.errors.phone && formik.touched.phone}
          </Text> */}
        </Box>
        <Button
          onClick={() => setScreen('moreInfo')}
          // isLoading={isLoading}
          isDisabled={
            !formik.values.phone ||
            !formik.values.last_name ||
            !formik.values.middle_name ||
            !formik.values.first_name
          }
          variation={`primary`}
          fontSize={`12px`}
          lineHeight={`150%`}
          textTransform={`uppercase`}
          p={`7px 11px`}
          boxStyle={{padding: `6px 11px`, width: `100%`}}
        >
          <Text>Proceed</Text>
        </Button>
      </Flex>
    </>
  );
};
