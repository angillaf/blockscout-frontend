import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';
import { runIfFn } from '@chakra-ui/utils';

const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props;

  const bg = `${ c }.600`;
  const color = 'white';
  const hoverBg = `${ c }.400`;
  const activeBg = hoverBg;

  return {
    bg,
    color,
    _hover: {
      bg: hoverBg,
      _disabled: {
        bg,
      },
    },
    _disabled: {
      opacity: 0.2,
    },
    // According to design there is no "active" or "pressed" state
    // It is simply should be the same as the "hover" state
    _active: { bg: activeBg },
    fontWeight: 600,
  };
});

const variantOutline = defineStyle((props) => {
  const { colorScheme: c } = props;

  const isGrayTheme = c === 'gray';

  const bg = 'transparent';

  const color = isGrayTheme ? mode('blackAlpha.800', 'whiteAlpha.800')(props) : mode(`${ c }.600`, `${ c }.300`)(props);
  const borderColor = isGrayTheme ? mode('gray.200', 'gray.600')(props) : mode(`${ c }.600`, `${ c }.300`)(props);

  const selectedBg = isGrayTheme ? mode('#aaf2ff', 'gray.600')(props) : mode(`${ c }.50`, 'gray.600')(props);
  const selectedColor = mode('#4361ee', 'gray.50')(props);

  return {
    color,
    fontWeight: props.fontWeight || 600,
    borderWidth: props.borderWidth || '2px',
    borderStyle: 'solid',
    borderColor,
    bg,
    _hover: {
      color: 'link_hovered',
      borderColor: 'link_hovered',
      bg,
      span: {
        color: 'link_hovered',
      },
      _disabled: {
        color,
        borderColor,
      },
    },
    _disabled: {
      opacity: 0.2,
    },
    // According to design there is no "active" or "pressed" state
    // It is simply should be the same as the "hover" state
    _active: {
      color: 'link_hovered',
      borderColor: 'link_hovered',
      bg,
      span: {
        color: 'link_hovered',
      },
      _disabled: {
        color: 'link_hovered',
        borderColor: 'link_hovered',
      },
    },
    // We have a special state for this button variant that serves as a popover trigger.
    // When any items (filters) are selected in the popover, the button should change its background and text color.
    // The last CSS selector is for redefining styles for the TabList component.
    [`
      &[data-selected=true],
      &[data-selected=true][aria-selected=true]
    `]: {
      bg: selectedBg,
      color: selectedColor,
      borderColor: selectedBg,
    },
  };
});

const variantSimple = defineStyle((props) => {
  const outline = runIfFn(variantOutline, props);

  return {
    color: outline.color,
    _hover: {
      color: outline._hover.color,
    },
  };
});

const variantGhost = defineStyle((props) => {
  const { colorScheme: c } = props;
  const activeBg = mode(`${ c }.50`, 'gray.800')(props);

  return {
    bg: 'transparent',
    color: mode(`${ c }.700`, 'gray.400')(props),
    _active: {
      color: mode(`${ c }.700`, 'gray.50')(props),
      bg: mode(`${ c }.50`, 'gray.800')(props),
    },
    _hover: {
      color: `${ c }.400`,
      _active: {
        bg: props.isActive ? activeBg : 'transparent',
        color: mode(`${ c }.700`, 'gray.50')(props),
      },
    },
  };
});

const variantSubtle = defineStyle((props) => {
  const { colorScheme: c } = props;

  if (c === 'gray') {
    return {
      bg: mode('blackAlpha.200', 'whiteAlpha.200')(props),
      color: mode('blackAlpha.800', 'whiteAlpha.800')(props),
      _hover: {
        color: 'link_hovered',
        _disabled: {
          color: mode('blackAlpha.800', 'whiteAlpha.800')(props),
          bg: mode('blackAlpha.200', 'whiteAlpha.200')(props),
        },
      },
    };
  }

  return {
    bg: `${ c }.100`,
    color: `${ c }.600`,
    _hover: {
      color: 'link_hovered',
    },
  };
});

const variants = {
  solid: variantSolid,
  outline: variantOutline,
  simple: variantSimple,
  ghost: variantGhost,
  subtle: variantSubtle,
};

const baseStyle = defineStyle({
  fontWeight: 600,
  borderRadius: 'base',
  overflow: 'hidden',
  _focusVisible: {
    boxShadow: { base: 'none', lg: 'outline' },
  },
});

const sizes = {
  lg: defineStyle({
    h: 12,
    minW: 'unset',
    fontSize: 'lg',
    px: 6,
  }),
  md: defineStyle({
    h: 10,
    minW: 'unset',
    fontSize: 'md',
    px: 4,
  }),
  sm: defineStyle({
    h: 8,
    minW: 'unset',
    fontSize: 'sm',
    px: 3,
  }),
  xs: defineStyle({
    h: 6,
    minW: 'unset',
    fontSize: 'xs',
    px: 2,
  }),
};

const Button = defineStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'solid',
    size: 'md',
    colorScheme: 'blue',
  },
});

export default Button;
