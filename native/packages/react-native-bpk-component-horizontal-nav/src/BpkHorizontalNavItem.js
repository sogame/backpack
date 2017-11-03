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

import {
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { setOpacity } from 'bpk-tokens';
import BpkText from 'react-native-bpk-component-text';
import { withTheme } from 'react-native-bpk-theming';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

// If theming is ever expanded to support other types, this should be changed
// to something akin to BpkButton's theming functions.
const THEMING_ATTRIBUTE = 'horizontalNavSelectedTextColor';

const selectedColor = tokens.colorBlue700;
const styles = StyleSheet.create({
  text: {
    color: tokens.colorGray700,
    paddingVertical: tokens.spacingMd,
    paddingHorizontal: tokens.spacingBase,
  },
  spaceAround: {
    marginHorizontal: tokens.spacingBase,
  },
  disabledText: {
    color: tokens.colorGray300,
  },
  selectedText: {
    color: selectedColor,
  },
  selectedIndicator: {
    backgroundColor: selectedColor,
    height: tokens.borderSizeLg,
  },
});

const themePropType = (props, propName, componentName) => {
  const { theme } = props;
  if (!theme) {
    return false;
  }
  if (!theme[THEMING_ATTRIBUTE]) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. To theme a BpkHorizontalNavItem, the \`theme\` prop must include \`${THEMING_ATTRIBUTE}\``); // eslint-disable-line max-len
  }
  return false;
};

const BpkHorizontalNavItem = (props) => {
  const {
    accessibilityLabel,
    disabled,
    onPress,
    selected,
    spaceAround,
    theme,
    title,
    ...rest
  } = props;

  const accessibilityTraits = ['button'];

  // Configure stylings.
  const viewStyles = [];
  const textStyles = [styles.text];
  const indicatorStyles = [styles.selectedIndicator];
  if (disabled) {
    accessibilityTraits.push('disabled');
    textStyles.push(styles.disabledText);
  } else if (selected) {
    textStyles.push(styles.selectedText);
    if (theme && theme[THEMING_ATTRIBUTE]) {
      const themeStyles = StyleSheet.create({
        selectedText: {
          color: theme.horizontalNavSelectedTextColor,
        },
        selectedIndicator: {
          backgroundColor: theme.horizontalNavSelectedTextColor,
        },
      });
      textStyles.push(themeStyles.selectedText);
      indicatorStyles.push(themeStyles.selectedIndicator);
    }
  }
  if (spaceAround) {
    viewStyles.push(styles.spaceAround);
  }

  // Tailor it to the platform.
  let Touchable;
  let formattedTitle;
  let platformSpecificProps;
  if (Platform.OS === 'android') {
    Touchable = TouchableNativeFeedback;
    formattedTitle = title.toUpperCase();
    platformSpecificProps = {
      background: TouchableNativeFeedback.SelectableBackgroundBorderless(),
    };
  } else {
    formattedTitle = title;
    Touchable = TouchableHighlight;
    platformSpecificProps = {
      underlayColor: setOpacity(tokens.underlayColor, tokens.underlayOpacity),
    };
  }
  return (
    <Touchable
      accessibilityComponentType="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityTraits={accessibilityTraits}
      disabled={disabled}
      onPress={onPress}
      {...platformSpecificProps}
      {...rest}
    >
      <View style={viewStyles}>
        <BpkText style={textStyles}>{formattedTitle}</BpkText>
        { (selected && !disabled) && <View style={indicatorStyles} />}
      </View>
    </Touchable>
  );
};

BpkHorizontalNavItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  spaceAround: PropTypes.bool,
  theme: themePropType,
};

BpkHorizontalNavItem.defaultProps = {
  accessibilityLabel: null,
  disabled: false,
  selected: false,
  spaceAround: false,
  theme: null,
};

export default withTheme(BpkHorizontalNavItem);
