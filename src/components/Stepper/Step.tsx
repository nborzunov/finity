import { Box } from '@chakra-ui/react';

function Step({
  isActive,
  isLast,
  isFilled,
}: {
  isActive: boolean;
  isLast: boolean;
  isFilled: boolean;
}) {
  function getBackgroundColor() {
    if (isActive) {
      return 'gray.900';
    }
    if (isFilled) {
      return 'brand.500';
    }
    if (!isFilled) {
      return 'gray.500';
    }
  }

  return (
    <>
      <Box
        backgroundColor={isActive ? 'brand.500' : ''}
        borderRadius="full"
        w="24px"
        h="24px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin="-5px"
      >
        <Box
          w="18px"
          h="18px"
          borderRadius="50%"
          backgroundColor={getBackgroundColor()}
          position="relative"
        ></Box>
      </Box>

      {!isLast && (
        <Box w="32px" h="2px" backgroundColor={isFilled ? 'brand.500' : 'gray.500'}></Box>
      )}
    </>
  );
}

export default Step;
