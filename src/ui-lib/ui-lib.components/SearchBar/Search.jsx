import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { themeStyles } from "../../../theme";
import Autocomplete from "react-google-autocomplete";

export const SearchBar = ({ label, placeholder, maxW, onSearch, value }) => {
  return (
    <Box w={"100%"} mx={"10px"} cursor={"pointer"} maxW={maxW}>
      <Text {...themeStyles.textStyles.sl6}>{label}</Text>

      <Autocomplete
        apiKey={"AIzaSyBwzi2F8Wo6lQHLtfqNM855fjopnnVAGcY"}
        style={{
          width: "100%",
          padding: "5px",
          paddingLeft: "10px",
          marginTop: "5px",
          fontSize: "20px",
          border: '1px solid lightgray',
          borderRadius: '10px',
          fontWeight: "bold",
          background: "transparent",
        }}
        onPlaceSelected={(place) => {
          onSearch(place);
        }}
        value={value}
        options={{
          types: ["(regions)"],
          componentRestrictions: { country: "ng" },
        }}
        placeholder={placeholder}
      />
    </Box>
  );
};
