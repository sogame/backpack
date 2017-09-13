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

import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withTheme } from 'theming';

import {
  buttonPaddingY,
  buttonPaddingX,
  buttonPaddingXIconOnly,
  buttonBorderRadius,
  buttonBorderRadiusLg,
  buttonBackgroundColor,
  buttonBackgroundImage,
  buttonHoverBackgroundColor,
  buttonHoverBackgroundImage,
  buttonActiveBackgroundColor,
  buttonActiveBackgroundImage,
  buttonDisabledBackgroundColor,
  buttonDisabledBackgroundImage,
  buttonColor,
  buttonHoverColor,
  buttonActiveColor,
  buttonBoxShadow,
  buttonHoverBoxShadow,
  buttonActiveBoxShadow,
  buttonDisabledBoxShadow,
  buttonDisabledColor,
  buttonFontSize,
  buttonFontWeight,
  buttonLineHeight,
  buttonTextAlign,
  buttonLargePaddingY,
  buttonLargePaddingX,
  buttonLargePaddingXIconOnly,
  buttonLargeFontSize,
  buttonLargeLineHeight,
  buttonSecondaryBackgroundColor,
  buttonSecondaryBackgroundImage,
  buttonSecondaryHoverBackgroundColor,
  buttonSecondaryHoverBackgroundImage,
  buttonSecondaryActiveBackgroundColor,
  buttonSecondaryActiveBackgroundImage,
  buttonSecondaryDisabledBackgroundColor,
  buttonSecondaryDisabledBackgroundImage,
  buttonSecondaryColor,
  buttonSecondaryHoverColor,
  buttonSecondaryActiveColor,
  buttonSecondaryDisabledColor,
  buttonSecondaryBoxShadow,
  buttonSecondaryHoverBoxShadow,
  buttonSecondaryActiveBoxShadow,
  buttonSecondaryDisabledBoxShadow,
  buttonDestructiveColor,
  buttonDestructiveBoxShadow,
  buttonDestructiveHoverColor,
  buttonDestructiveHoverBoxShadow,
  buttonDestructiveActiveColor,
  buttonDestructiveActiveBoxShadow,
  buttonDestructiveDisabledBackgroundColor,
  buttonDestructiveDisabledBackgroundImage,
  buttonDestructiveDisabledColor,
  buttonDestructiveDisabledBoxShadow,
  buttonSelectedBackgroundColor,
  buttonSelectedBackgroundImage,
  buttonSelectedHoverBackgroundColor,
  buttonSelectedHoverBackgroundImage,
  buttonSelectedActiveBackgroundColor,
  buttonSelectedActiveBackgroundImage,
  buttonSelectedColor,
  buttonSelectedHoverColor,
  buttonSelectedActiveColor,
  buttonSelectedBoxShadow,
  buttonSelectedHoverBoxShadow,
  buttonSelectedActiveBoxShadow,
  buttonSelectedDisabledBoxShadow,
  buttonFeaturedBackgroundImage,
  buttonFeaturedHoverBackgroundColor,
  buttonFeaturedActiveBackgroundColor,
  buttonFeaturedActiveBackgroundImage,
  buttonFeaturedDisabledBackgroundColor,
  buttonFeaturedDisabledBackgroundImage,
} from 'bpk-tokens/tokens/base.es6';

const BpkButton = withTheme(styled('button')`
  display: inline-block;
  margin: 0;
  padding: ${props => (
    props.large
      ? `${buttonLargePaddingY} ${buttonLargePaddingX}`
      : `${buttonPaddingY} ${buttonPaddingX}`
  )};
  border: 0;
  border-radius: ${props => (props.large ? buttonBorderRadiusLg : buttonBorderRadius)};
  background-color: ${props => (
    props.selected
      ? buttonSelectedBackgroundColor
    : props.secondary || props.destructive
      ? buttonSecondaryBackgroundColor
    : props.featured
      ? buttonFeaturedActiveBackgroundColor
    : buttonBackgroundColor
  )};
  background-image: ${props => (
    props.selected
      ? buttonSelectedBackgroundImage
    : props.secondary || props.destructive
      ? buttonSecondaryBackgroundImage
    : props.featured
      ? buttonFeaturedBackgroundImage
    : buttonBackgroundImage
  )};
  color: ${props => (
    props.selected
      ? buttonSelectedColor
    : props.secondary
      ? buttonSecondaryColor
    : props.destructive
      ? buttonDestructiveColor
    : buttonColor
  )};
  font-size: ${props => (props.large ? buttonLargeFontSize : buttonFontSize)};
  font-weight: ${buttonFontWeight};
  line-height: ${props => (props.large ? buttonLargeLineHeight : buttonLineHeight)};
  text-align: ${buttonTextAlign};
  text-decoration: none;
  box-shadow: ${props => (
    props.selected
      ? buttonSelectedBoxShadow
    : props.secondary
      ? buttonSecondaryBoxShadow
    : props.destructive
      ? buttonDestructiveBoxShadow
    : buttonBoxShadow
  )};
  cursor: pointer;
  vertical-align: middle;
  user-select: none;

  &:hover {
    background-color: ${props => (
      props.selected
        ? buttonSelectedHoverBackgroundColor
      : props.secondary || props.destructive
        ? buttonSecondaryHoverBackgroundColor
      : props.featured
        ? buttonFeaturedHoverBackgroundColor
      : buttonHoverBackgroundColor
    )};
    background-image: ${props => (
      props.selected
        ? buttonSelectedHoverBackgroundImage
      : props.secondary || props.destructive
        ? buttonSecondaryHoverBackgroundImage
      : buttonHoverBackgroundImage
    )};
    color: ${props => (
      props.selected
        ? buttonSelectedHoverColor
      : props.secondary
        ? buttonSecondaryHoverColor
      : props.destructive
        ? buttonDestructiveHoverColor
      : buttonHoverColor
    )};
    box-shadow: ${props => (
      props.selected
        ? buttonSelectedHoverBoxShadow
      : props.secondary
        ? buttonSecondaryHoverBoxShadow
      : props.destructive
        ? buttonDestructiveHoverBoxShadow
      : buttonHoverBoxShadow
    )};
  }

  &:active {
    background-color: ${props => (
      props.selected
        ? buttonSelectedActiveBackgroundColor
      : props.secondary || props.destructive
        ? buttonSecondaryActiveBackgroundColor
      : props.featured
        ? buttonFeaturedActiveBackgroundColor
      : buttonActiveBackgroundColor
    )};
    background-image: ${props => (
      props.selected
        ? buttonSelectedActiveBackgroundImage
      : props.secondary || props.destructive
        ? buttonSecondaryActiveBackgroundImage
        : props.featured
          ? buttonFeaturedActiveBackgroundImage
      : buttonActiveBackgroundImage
    )};
    color: ${props => (
      props.selected
        ? buttonSelectedActiveColor
      : props.secondary
        ? buttonSecondaryActiveColor
      : props.destructive
          ? buttonDestructiveActiveColor
      : buttonActiveColor
    )};
    box-shadow: ${props => (
      props.selected
        ? buttonSelectedActiveBoxShadow
      : props.secondary
        ? buttonSecondaryActiveBoxShadow
      : props.destructive
        ? buttonDestructiveActiveBoxShadow
      : buttonActiveBoxShadow
    )};
  }

  &:disabled {
    background-color: ${buttonDisabledBackgroundColor};
    background-image: ${buttonDisabledBackgroundImage};
    color: ${buttonDisabledColor};
    box-shadow: ${buttonDisabledBoxShadow};
    cursor: not-allowed;
  }
`);

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

//   const classNames = [buttonCss];

//   if (secondary) { classNames.push(secondaryButtonCss); }
//   if (destructive) { classNames.push(destructiveButtonCss); }
//   if (selected) { classNames.push(selectedButtonCss); }
//   if (large) { classNames.push(largeButtonCss); }
//   if (link) { classNames.push(''); }
//   if (featured) { classNames.push(featuredButtonCss); }
//   if (iconOnly) { classNames.push(large ? '' : ''); }
//   if (className) { classNames.push(className); }

//   const classNameFinal = classNames.join(' ');

//   if (href) {
//     return (
//       <a href={href} className={classNameFinal} onClick={onClick} {...rest}>
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
//     <button type={buttonType} disabled={disabled} className={classNameFinal} onClick={onClickWrapper} {...rest}>
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
  theme: {

  },
};

export default BpkButton;
