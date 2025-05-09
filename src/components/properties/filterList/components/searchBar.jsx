import React, {useEffect, useRef, useState} from 'react';
import Autocomplete from 'react-google-autocomplete';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Button,
  Stack,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';

export const SearchBar = ({label, updateSearch, value, placeholder}) => {
  const [suggestions, setSuggestions] = useState([]);
  const {isOpen, onClose, onOpen} = useDisclosure();
  const inputRef = useRef(null);
  const menuRef = useRef(null);

  useOutsideClick({
    ref: menuRef,
    handler: onClose,
  });
  const handleInputChange = e => {
    const value = e.target.value;
    updateSearch(prev => ({...prev, searchString: value}));

    if (value === '') {
      setSuggestions([]);
      onClose();
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({input: value}, predictions => {
      setSuggestions(predictions || []);
      if (!predictions) {
        onClose();
      } else if (predictions) {
        onOpen();
      }
      focusInput();
    });
  };
  const placeSuggestions = suggestion => () => {
    updateSearch(prev => ({...prev, searchString: suggestion.description}));
    setSuggestions([]);
    onClose();
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    if (isOpen) {
      focusInput();
    }
  };
  return (
    <Stack pos="relative" spacing="6px" justify="start">
      <Text fontSize="14px" fontWeight="400" color="matador_text.200">
        {label}
      </Text>
      <Menu isOpen={isOpen} onOpen={focusInput} isFocusable={false}>
        <MenuButton
          tabIndex={-1}
          pos="absolute"
          bottom="0"
          pointerEvents="none"
          aria-label="Options"
        />

        <Input
          ref={inputRef}
          placeholder={placeholder}
          width="100%"
          maxWidth="236px"
          padding="0px"
          fontSize="16px"
          color="matador_form.label"
          border="transparent"
          borderRadius="10px"
          fontWeight="600"
          background="transparent"
          outline="none"
          _placeholder={{
            color: 'matador_form.label',
          }}
          onBlur={handleBlur}
          value={value}
          onChange={handleInputChange}
        />

        <MenuList
          bg="matador_background.200"
          border="1px solid"
          borderColor="matador_border_color.100"
          maxW="350px"
          minH="150px"
          mt="-5px"
          py="17px"
          px="0px"
          tabIndex={-1}
        >
          <Stack spacing="25px">
            {suggestions.map((suggestion, index) => (
              <MenuItem
                bg="matador_background.200"
                key={index}
                isFocusable={false}
                color="text"
                wordBreak="break-word"
                overflowWrap="break-word"
                whiteSpace="normal"
                onClick={placeSuggestions(suggestion)}
                p="0px"
                px="26px"
              >
                {suggestion.description}
              </MenuItem>
            ))}
          </Stack>
        </MenuList>
      </Menu>
    </Stack>
  );
};
