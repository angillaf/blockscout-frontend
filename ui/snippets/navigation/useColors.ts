import { useColorModeValue } from '@chakra-ui/react';

export default function useColors() {
  return {
    text: {
      'default': useColorModeValue('gray.600', 'gray.400'),
      active: useColorModeValue('#3f37c9', 'gray.50'),
      hover: 'link_hovered',
    },
    bg: {
      'default': 'transparent',
      active: useColorModeValue('#aaf2ff', 'gray.800'),
    },
    border: {
      'default': 'divider',
      active: useColorModeValue('#aaf2ff', 'gray.800'),
    },
  };
}
