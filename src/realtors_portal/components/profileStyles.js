import {Image} from '@chakra-ui/react';
import dropDownImage from '/src/realtors_portal/images/icons/dropDown_settings.svg';
import dropDownImageForBankDetails from '/src/realtors_portal/images/icons/arrow_down_agents_bank_details_icon.svg';
import editPen from '/src/realtors_portal/images/icons/Editpen.svg';

export const buttonStyle = {
  w: '100%',
  border: '1px solid #747474',
  fontWeight: '500',
  fontSize: '20px',
  lineHeight: '25px',
  color: 'black',
  padding: '1.5rem',
};

export const groupStyle = (active, opt) => ({
  w: '100%',
  border: active === opt ? '1px solid black' : '.5px solid #747474',
  padding: '.2rem 1rem',
  fontWeight: '500',
  fontSize: '20px',
  lineHeight: '25px',
  color: 'black',
  borderRadius: '0.375rem',
});

export const inputStyle = (active, opt) => ({
  sx: {
    '::placeholder': {
      color: active === opt ? 'black' : '#9C9C9C',
    },
  },
  focusBorderColor: 'transparent',
  px: '0',
  border: 'none',
  fontSize: 18,
});

export const DropDown = ({forBank, name, handleEdit}) => {
  return (
    <Image
      src={forBank ? dropDownImageForBankDetails.src : dropDownImage.src}
      zIndex="1"
      alt="dropdown icon"
      position="relative"
      cursor="pointer"
      onClick={handleEdit ? () => handleEdit(name) : null}
    />
  );
};

export const EditPen = ({name, handleEdit}) => {
  return (
    <Image
      src={editPen.src}
      zIndex="1"
      position="relative"
      cursor="pointer"
      alt="dropdown icon"
      boxSize="18px"
      onClick={handleEdit ? () => handleEdit(name) : null}
    />
  );
};
