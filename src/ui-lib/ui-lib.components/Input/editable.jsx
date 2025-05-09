import React from "react";
import {
  InputGroup,
  Input,
  FormControl,
  FormLabel,
  Text,
  SlideFade,
  Editable,
  EditableInput as ChakraEditableInput,
  EditablePreview,
  InputRightElement,
  useEditableControls,
  IconButton,
} from "@chakra-ui/react";
import { themeStyles } from "../../../theme";
import { CheckIcon } from "@chakra-ui/icons";
import { HiPencil } from "react-icons/hi";
import { motion } from "framer-motion";

export const EditableInput = ({
  lable,
  error,
  color = "black",
  isEditable,
  ...rest
}) => {
  return (
    <FormControl {...themeStyles.textStyles.sl5}>
      <FormLabel color={color}>{lable}</FormLabel>
      <Editable
        border={
          error ? "1px solid red !important" : `1px solid #747474 !important`
        }
        borderRadius={"5px"}
      >
        <InputGroup h={"50px"} display={"flex"} alignItems={"center"}>
          <EditablePreview ml={"18px"} fontSize={"20px"} />
          <Input
            h={"50px"}
            mx={"0px"}
            as={ChakraEditableInput}
            isInvalid={error}
            fontSize={"20px"}
            {...rest}
          />
          <InputRightElement>
            <EditableControls />
          </InputRightElement>
        </InputGroup>
      </Editable>

      <SlideFade in={error} offsetY="10px">
        <Text
          color={themeStyles.color.matador__red}
          my={"5px"}
          fontSize={"14px"}
        >
          {error}
        </Text>
      </SlideFade>
    </FormControl>
  );
};

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <IconButton
      as={motion.button}
      whileHover={{ scale: 1.1 }}
      icon={<CheckIcon size={"22px"} />}
      bg={"transparent !important"}
      {...getSubmitButtonProps()}
      mt={"10px"}
    />
  ) : (
    <IconButton
      as={motion.button}
      whileHover={{ scale: 1.1 }}
      icon={<HiPencil size={"22px"} />}
      bg={"transparent !important"}
      {...getEditButtonProps()}
      mt={"10px"}
    />
  );
}
