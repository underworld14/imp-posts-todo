import { forwardRef } from "react";
import { Textarea, Text, TextareaProps, Box } from "@chakra-ui/react";

interface TextareaFieldProps extends TextareaProps {
  error?: string;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(({ error, ...rest }, ref) => {
  return (
    <Box width="full">
      <Textarea {...rest} isInvalid={!!error} ref={ref} />
      <Text mt={1} fontSize="sm" color="red.500">
        {error}
      </Text>
    </Box>
  );
});

export default TextareaField;
