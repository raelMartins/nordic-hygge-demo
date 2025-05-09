import { useColorModeValue, useToken } from '@chakra-ui/react'

export const useSharedInputStyles = (isAuth) => {
  // makes the return value shareable across non chakra UIs
  const [gray400, whiteAlpha400] = useToken('colors', [
    'gray.400',
    'whiteAlpha.400',
  ])

  // const borderColor = useColorModeValue(gray400, whiteAlpha400)
  const color = useColorModeValue('#3F3D56', 'rgb(201, 209, 217)')
  const placeholderColor = useColorModeValue(gray400, whiteAlpha400)

  return {
		// borderColor,
		color: `${isAuth ? '#FFFFFF' : '#191919'}`,
		px: 4,
		py: 6,
		outline: 'none',
		borderRadius: 'lg',
		_placeholder: {
			fontSize: '14px',
			color: placeholderColor,
		},
		_active: {
			borderColor: 'grey',
		},
		_visited: {
			borderColor: 'grey',
		},
	};
}