import { forwardRef } from "react";
import { Input, InputProps, Text, Box } from "@chakra-ui/react";

interface TextFieldProps extends InputProps {
  error?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ error, ...rest }, ref) => {
  return (
    <Box width="full">
      <Input {...rest} isInvalid={!!error} ref={ref} />
      <Text mt={1} fontSize="sm" color="red.500">
        {error}
      </Text>
    </Box>
  );
});

export default TextField;
