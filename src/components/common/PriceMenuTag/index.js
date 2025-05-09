import { ChevronDownIcon } from "@chakra-ui/icons";
import { Divider, HStack, Image, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { TbCurrencyDollar, TbCurrencyEuro } from "react-icons/tb";
import nairaImage from '/src/images/icons/price-icon.svg';


export const PriceMenu = () => {
	return (
		<Menu borderRadius={'2px'}>
			<MenuButton type='button' transition='all 0.2s'>
				<HStack spacing='5px' mx={3}>
					<Image h='28px' w='28px' src={nairaImage.src} alt='naira_image' /> <ChevronDownIcon color='gray' fontSize={'14px'} />
					<Divider borderColor='#E4E4E4' orientation='vertical' />
				</HStack>
			</MenuButton>
			<MenuList px={2}>
				<MenuItem cursor={'not-allowed'} mb='16px' bg='gray.100' color='gray.400'>
					<TbCurrencyDollar style={{fontSize: '24px', color: 'gray'}} /> USD (contact support)
				</MenuItem>
				<MenuItem cursor={'not-allowed'} bg='gray.100' color='gray.400'>
					<TbCurrencyEuro style={{fontSize: '24px', color: 'gray'}} /> EUR (contact support)
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export const PriceInputWrapperStyle = {borderRadius: '8px', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', paddingLeft: '.9em', marginTop: '0', fontSize: '18px', fontWeight: '500', border: '0.5px solid #E4E4E4'};
