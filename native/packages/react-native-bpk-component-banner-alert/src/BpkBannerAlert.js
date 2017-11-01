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
  View,
  Platform,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setOpacity } from 'bpk-tokens';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkAnimateHeight from 'react-native-bpk-component-animate-height';
import AnimateAndFade from './AnimateAndFade';

const stylePropType = (props, propName, componentName) => {
  const value = StyleSheet.flatten(props[propName]);

  if (value === undefined) return false;

  if (value.fontWeight) {
    return new Error(`Invalid prop \`${propName}\` with \`fontWeight\` value \`${value.fontWeight}\` supplied to \`${componentName}\`. Use \`emphasize\` prop instead.`); // eslint-disable-line max-len
  }

  return false;
};

const dismissablePropType = (props, propName, componentName) => {
  if (props[propName] && props.children !== null) {
    return new Error(`Invalid prop \`${propName}\` with value \`${props[propName]}\` supplied to \`${componentName}\`. Banner alert cannot be expanded to show children if it is dismissable.`); // eslint-disable-line max-len
  }

  return false;
};

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

// Slight darkness to use when buttons are pressed in.
const underlayColor = Platform.select({
  ios: () => setOpacity(tokens.underlayColor, tokens.underlayOpacity),
  android: () => null,
})();

const {
  borderRadiusSm,
  borderSizeSm,
  colorGray300,
  colorGray500,
  colorGray700,
  colorGreen500,
  colorRed500,
  colorYellow500,
  spacingBase,
  spacingMd,
  spacingSm,
  spacingXl,
} = tokens;

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
  NEUTRAL: 'neutral',
};

const styles = StyleSheet.create({
  outerContainer: {
    borderWidth: borderSizeSm,
    borderRadius: borderRadiusSm,
    overflow: 'hidden',
    height: 'auto',
  },
  bannerContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    minHeight: spacingXl - (borderSizeSm * 2),
  },
  bannerContainerPadded: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacingSm,
    paddingLeft: spacingMd,
    paddingRight: spacingMd,
    paddingTop: spacingSm,
  },
  bannerContainerPaddedDismissable: {
    paddingRight: 0,
  },
  closeButtonContainer: {
    height: '100%',
    width: ((2 * spacingMd) + spacingBase),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedChildContainer: {
    paddingBottom: spacingSm,
    paddingLeft: spacingMd,
    paddingRight: spacingMd,
  },
  outerContainerSuccess: {
    borderColor: colorGreen500,
  },
  outerContainerWarn: {
    borderColor: colorYellow500,
  },
  outerContainerError: {
    borderColor: colorRed500,
  },
  outerContainerNeutral: {
    borderColor: colorGray300,
  },
  text: {
    flex: 1,
    flexGrow: 1,
    paddingLeft: spacingSm,
    color: colorGray700,
  },
  iconSuccess: {
    color: colorGreen500,
  },
  iconWarn: {
    color: colorYellow500,
  },
  iconError: {
    color: colorRed500,
  },
  iconNeutral: {
    color: colorGray500,
  },
  buttonExpand: {
    color: colorGray700,
  },
  buttonClose: {
    color: colorGray500,
  },
});

class BpkBannerAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
      dismissed: false,
    };

    this.onToggleExpanded = this.onToggleExpanded.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ dismissed: true });
    if (this.props.onAction !== null) {
      this.props.onAction();
    }
  }

  onToggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
    if (this.props.onAction !== null) {
      this.props.onAction();
    }
  }

  render() {
    const {
      children, type, style, dismissable, message, fadeIn, actionButtonLabel, ...rest
    } = this.props;

    const expandable = children !== null;
    const show = !this.state.dismissed;

    let iconSource = null;
    let buttonIconSource = null;
    let iconStyle = null;
    let buttonIconStyle = null;
    let onPressAction = null;

    const outerStyleFinal = [styles.outerContainer];
    const expandedChildContainer = [styles.expandedChildContainer];

    if (style) {
      outerStyleFinal.push(style);
    }

    if (type === ALERT_TYPES.SUCCESS) {
      iconSource = 'tick-circle';
      outerStyleFinal.push(styles.outerContainerSuccess);
      iconStyle = styles.iconSuccess;
    } else if (type === ALERT_TYPES.WARN) {
      iconSource = 'information-circle';
      outerStyleFinal.push(styles.outerContainerWarn);
      iconStyle = styles.iconWarn;
    } else if (type === ALERT_TYPES.ERROR) {
      iconSource = 'information-circle';
      outerStyleFinal.push(styles.outerContainerError);
      iconStyle = styles.iconError;
    } else if (type === ALERT_TYPES.NEUTRAL) {
      iconSource = 'information-circle';
      outerStyleFinal.push(styles.outerContainerNeutral);
      iconStyle = styles.iconNeutral;
    }

    if (dismissable) {
      onPressAction = this.onDismiss;
      buttonIconSource = 'close';
      buttonIconStyle = styles.buttonClose;
    } else if (children !== null) {
      onPressAction = this.onToggleExpanded;
      buttonIconStyle = styles.buttonExpand;
      if (this.state.expanded) {
        buttonIconSource = 'chevron-up';
      } else {
        buttonIconSource = 'chevron-down';
      }
    }

    const iconComponent = (
      <BpkIcon
        style={iconStyle}
        icon={iconSource}
        small
      />
    );

    const textComponent = (
      <BpkText textStyle="sm" style={styles.text}>{message}</BpkText>
    );

    const actionComponent = (
      <View>
        {buttonIconSource &&
        <BpkIcon
          style={buttonIconStyle}
          icon={buttonIconSource}
          small
        />
    }
      </View>
    );

    const closeButtonComponent = (
      <TouchableHighlight
        accessibilityComponentType="button"
        onPress={onPressAction}
        underlayColor={underlayColor}
        accessibilityLabel={actionButtonLabel}
        style={styles.closeButtonContainer}
      >
        {actionComponent}
      </TouchableHighlight>
    );

    const contentPaddedStyle = [styles.bannerContainerPadded];
    if (dismissable) {
      contentPaddedStyle.push(styles.bannerContainerPaddedDismissable);
    }

    let banner = (
      <View style={[contentPaddedStyle]}>
        {iconComponent}
        {textComponent}
        {expandable && actionComponent}
      </View>
    );

    if (expandable) {
      banner = (
        <TouchableHighlight
          accessibilityComponentType="button"
          onPress={onPressAction}
          underlayColor={underlayColor}
          accessibilityLabel={actionButtonLabel}
          style={styles.bannerContainer}
        >
          {banner}
        </TouchableHighlight>
      );
    }

    const bannerAlert = (
      <View style={outerStyleFinal} {...rest} >
        <View style={styles.bannerContainer} >
          {banner}
          {dismissable && closeButtonComponent }
        </View>
        <BpkAnimateHeight expanded={this.state.expanded}>
          <View style={expandedChildContainer}>{children}</View>
        </BpkAnimateHeight>
      </View>
    );

    return (
      <AnimateAndFade onEnter={fadeIn} onLeave show={show}>
        {bannerAlert}
      </AnimateAndFade>
    );
  }
}

BpkBannerAlert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    ALERT_TYPES.SUCCESS,
    ALERT_TYPES.WARN,
    ALERT_TYPES.ERROR,
    ALERT_TYPES.NEUTRAL,
  ]).isRequired,
  children: PropTypes.node,
  dismissable: dismissablePropType,
  fadeIn: PropTypes.bool,
  onAction: PropTypes.func,
  actionButtonLabel: PropTypes.string,
  style: stylePropType,
};

BpkBannerAlert.defaultProps = {
  children: null,
  dismissable: false,
  fadeIn: false,
  onAction: () => null,
  style: null,
  actionButtonLabel: null,
};

export default BpkBannerAlert;
