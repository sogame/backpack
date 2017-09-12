/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as TOKENS from 'bpk-tokens/tokens/base.es6';

const BpkButton = glamorous.button({
  display: 'inline-block',
  margin: 0,
  padding: `${TOKENS.buttonPaddingY} ${TOKENS.buttonPaddingX}`,
  border: 0,
  borderRadius: TOKENS.buttonBorderRadius,
  fontSize: TOKENS.buttonFontSize,
  fontWeight: TOKENS.buttonFontWeight,
  lineHeight: TOKENS.buttonLineHeight,
  textAlign: TOKENS.buttonTextAlign,
  textDecoration: 'none',
  boxShadow: TOKENS.buttonBoxShadow,
  cursor: 'pointer',
  verticalAlign: 'middle',
  userSelect: 'none',
  ':hover': {
    boxShadow: TOKENS.buttonHoverBoxShadow,
  },
  ':active': {
    boxShadow: TOKENS.buttonActiveBoxShadow,
  },
  ':disabled': {
    backgroundColor: TOKENS.buttonDisabledBackgroundColor,
    backgroundImage: TOKENS.buttonDisabledBackgroundImage,
    color: TOKENS.buttonDisabledColor,
    boxShadow: TOKENS.buttonDisabledBoxShadow,
    cursor: 'not-allowed',
  },
}, (props) => {
  const theme = Object.assign({}, {
    primaryColor: TOKENS.buttonBackgroundColor,
    primaryContrastColor: TOKENS.buttonColor,
    primaryGradientStartColor: TOKENS.colorGreen500,
    primaryGradientEndColor: TOKENS.colorGreen600,
    primaryLightColor: TOKENS.buttonHoverBackgroundColor,
    primaryLightContrastColor: TOKENS.buttonHoverColor,
    primaryDarkColor: TOKENS.buttonActiveBackgroundColor,
    primaryDarkContrastColor: TOKENS.buttonActiveColor,
    secondaryColor: TOKENS.buttonSecondaryBackgroundColor,
    secondaryContrastColor: TOKENS.buttonSecondaryColor,
  }, props.theme);

  const styles = [{
    backgroundColor: theme.primaryColor,
    backgroundImage: `linear-gradient(-180deg, ${theme.primaryGradientStartColor} 0%, ${theme.primaryGradientEndColor} 100%)`,
    color: theme.primaryContrastColor,
    ':hover': {
      backgroundColor: theme.primaryLightColor,
      backgroundImage: 'none',
      color: theme.primaryLightContrastColor,
    },
    ':active': {
      backgroundColor: theme.primaryDarkColor,
      backgroundImage: 'none',
      color: theme.primaryDarkContrastColor,
    },
  }];

  if (props.large) {
    styles.push({
      padding: `${TOKENS.buttonLargePaddingY} ${TOKENS.buttonLargePaddingX}`,
      borderRadius: TOKENS.buttonBorderRadiusLg,
      fontSize: TOKENS.buttonLargeFontSize,
      lineHeight: TOKENS.buttonLargeLineHeight,
    });
  }

  if (props.secondary) {
    styles.push({
      backgroundColor: theme.secondaryColor,
      backgroundImage: 'none',
      color: theme.secondaryContrastColor,
      boxShadow: TOKENS.buttonSecondaryBoxShadow,
      ':hover': {
        backgroundColor: theme.secondaryColor,
        backgroundImage: 'none',
        color: theme.secondaryContrastColor,
        boxShadow: TOKENS.buttonSecondaryHoverBoxShadow,
      },
      ':active': {
        backgroundColor: theme.secondaryColor,
        backgroundImage: 'none',
        color: theme.secondaryContrastColor,
        boxShadow: TOKENS.buttonSecondaryActiveBoxShadow,
      },
    });
  }

  if (props.destructive) {
    styles.push({
      color: TOKENS.buttonDestructiveColor,
      boxShadow: TOKENS.buttonDestructiveBoxShadow,
      ':hover': {
        color: TOKENS.buttonDestructiveHoverColor,
        boxShadow: TOKENS.buttonDestructiveHoverBoxShadow,
      },
      ':active': {
        color: TOKENS.buttonDestructiveActiveColor,
        boxShadow: TOKENS.buttonDestructiveActiveBoxShadow,
      },
    });
  }

  if (props.selected) {
    styles.push({
      backgroundColor: TOKENS.buttonSelectedBackgroundColor,
      backgroundImage: TOKENS.buttonSelectedBackgroundImage,
      color: TOKENS.buttonSelectedColor,
      boxShadow: TOKENS.buttonSelectedBoxShadow,
      ':hover': {
        backgroundColor: TOKENS.buttonSelectedHoverBackgroundColor,
        backgroundImage: TOKENS.buttonSelectedHoverBackgroundImage,
        color: TOKENS.buttonSelectedHoverColor,
        boxShadow: TOKENS.buttonSelectedHoverBoxShadow,
      },
      ':active': {
        backgroundColor: TOKENS.buttonSelectedActiveBackgroundColor,
        backgroundImage: TOKENS.buttonSelectedActiveBackgroundImage,
        color: TOKENS.buttonSelectedActiveColor,
        boxShadow: TOKENS.buttonSelectedActiveBoxShadow,
      },
    });
  }

  return styles;
});

// const BpkButton = (props) => {
//   const {
//     children,
//     href,
//     className,
//     onClick,
//     disabled,
//     submit,
//     secondary,
//     selected,
//     destructive,
//     featured,
//     large,
//     link,
//     iconOnly,
//     ...rest
//   } = props;

//   if (href) {
//     return (
//       <a href={href} onClick={onClick} {...rest}>
//         {children}
//       </a>
//     );
//   }

//   // Due to React bug in Chrome, the onClick event fires even if the button is disabled.
//   // Pull request is being worked on (as of 2016-12-22): https://github.com/facebook/react/pull/8329
//   const onClickWrapper = onClick ? (...args) => {
//     if (!disabled) {
//       onClick(...args);
//     }
//   } : null;

//   const buttonType = submit ? 'submit' : 'button';

//   return (
//     <button type={buttonType} disabled={disabled} onClick={onClickWrapper} {...rest}>
//       {children}
//     </button>
//   );
// };

BpkButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
  secondary: PropTypes.bool,
  selected: PropTypes.bool,
  destructive: PropTypes.bool,
  large: PropTypes.bool,
  link: PropTypes.bool,
  iconOnly: PropTypes.bool,
  featured: PropTypes.bool,
  theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkButton.defaultProps = {
  href: null,
  className: null,
  disabled: false,
  onClick: null,
  submit: false,
  secondary: false,
  selected: false,
  destructive: false,
  large: false,
  link: false,
  iconOnly: false,
  featured: false,
  theme: null,
};

export default BpkButton;
