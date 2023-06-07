import { Box, Button, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        mr={2}
      >
        <ChevronLeftIcon />
      </Button>
      <Text fontWeight="bold" mx={2}>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        ml={2}
      >
        <ChevronRightIcon />
      </Button>
    </Box>
  );
};

export default Pagination;
