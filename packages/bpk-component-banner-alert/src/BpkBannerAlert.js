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
import React, { Component } from 'react';
import { withButtonAlignment } from 'bpk-component-icon';
import BpkAnimateHeight from 'bpk-animate-height';
import TickCircleIcon from 'bpk-component-icon/sm/tick-circle';
import ChevronDownIcon from 'bpk-component-icon/sm/chevron-down';
import InfoCircleIcon from 'bpk-component-icon/sm/information-circle';
import { durationSm } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-banner-alert.scss';

const getClassName = cssModules(STYLES);

const NeutralIcon = withButtonAlignment(InfoCircleIcon);
const WarnIcon = withButtonAlignment(InfoCircleIcon);
const ErrorIcon = withButtonAlignment(InfoCircleIcon);
const SuccessIcon = withButtonAlignment(TickCircleIcon);
const ExpandIcon = withButtonAlignment(ChevronDownIcon);

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
  NEUTRAL: 'neutral',
};

export const ARIA_LIVE = {
  OFF: 'off',
  ASSERTIVE: 'assertive',
  POLITE: 'polite',
};

const getIconForType = (type) => {
  const map = {
    [ALERT_TYPES.SUCCESS]: <SuccessIcon className={getClassName('bpk-banner-alert__success-icon')} />,
    [ALERT_TYPES.WARN]: <WarnIcon className={getClassName('bpk-banner-alert__warn-icon')} />,
    [ALERT_TYPES.ERROR]: <ErrorIcon className={getClassName('bpk-banner-alert__error-icon')} />,
    [ALERT_TYPES.NEUTRAL]: <NeutralIcon className={getClassName('bpk-banner-alert__neutral-icon')} />,
  };

  return map[type];
};

const ToggleButton = (props) => {
  const classNames = [getClassName('bpk-banner-alert__expand-icon')];

  if (props.expanded) { classNames.push(getClassName('bpk-banner-alert__expand-icon--flipped')); }

  return (
    <button
      className={getClassName('bpk-banner-alert__toggle-button')}
      aria-label={props.label}
      aria-expanded={props.expanded}
      title={props.label}
    >
      <ExpandIcon
        className={classNames.join(' ')}
      />
    </button>
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
};

class BpkBannerAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      hidden: false,
    };

    this.onExpand = this.onExpand.bind(this);
  }

  componentWillMount() {
    const { hideAfter } = this.props;
    if (hideAfter) {
      this.hideIntervalId = setTimeout(() => {
        this.setState({
          hidden: true,
        });
      }, hideAfter * 1000);
    }
  }

  componentWillUnmount() {
    if (this.hideIntervalId) {
      clearTimeout(this.hideIntervalId);
    }
  }

  onExpand() {
    this.setState(state => ({
      expanded: !state.expanded,
    }));
  }

  render() {
    const {
      children, className, type, ariaLive, message, toggleButtonLabel, ...rest
    } = this.props;
    const isExpanded = this.state.expanded;
    const isExpandable = children;
    const showChildren = isExpandable && isExpanded;
    const ariaRoles = ['alert'];

    const headerClassNames = [getClassName('bpk-banner-alert__header')];
    const sectionClassNames = ['bpk-banner-alert', `bpk-banner-alert--${type}`]
      .map(sectionClassName => getClassName(sectionClassName));
    if (this.state.hidden) {
      sectionClassNames.push(getClassName('bpk-banner-alert--hidden'));
    }

    if (className) { sectionClassNames.push(className); }
    if (isExpandable) {
      headerClassNames.push(getClassName('bpk-banner-alert__header--expandable'));
      ariaRoles.push('button');
    }

    /* eslint-disable
    jsx-a11y/no-static-element-interactions,
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-noninteractive-element-interactions
    */
    // Disabling 'click-events-have-key-events and interactive-supports-focus' because header element is not focusable.
    // ToggleButton is focusable and works for this.
    return (
      <section className={sectionClassNames.join(' ')} {...rest}>
        <header
          role={ariaRoles.join(' ')}
          aria-live={ariaLive}
          className={headerClassNames.join(' ')}
          onClick={this.onExpand}
        >
          <span className={getClassName('bpk-banner-alert__icon')}>{getIconForType(type)}</span>
          &nbsp;
          <span className={getClassName('bpk-banner-alert__message')}>{message}</span>
          &nbsp;
          {isExpandable ? (
            <span className={getClassName('bpk-banner-alert__toggle')}>
              <ToggleButton expanded={isExpanded} label={toggleButtonLabel} />
            </span>
          ) : null}
        </header>
        <BpkAnimateHeight duration={parseInt(durationSm, 10)} height={showChildren ? 'auto' : 0}>
          <div className={getClassName('bpk-banner-alert__children-container')}>{children}</div>
        </BpkAnimateHeight>
      </section>
    );
    /* eslint-enable */
  }
}

BpkBannerAlert.propTypes = {
  type: PropTypes.oneOf([
    ALERT_TYPES.SUCCESS,
    ALERT_TYPES.WARN,
    ALERT_TYPES.ERROR,
    ALERT_TYPES.NEUTRAL,
  ]).isRequired,
  message: PropTypes.node.isRequired,
  ariaLive: PropTypes.oneOf([
    ARIA_LIVE.OFF,
    ARIA_LIVE.ASSERTIVE,
    ARIA_LIVE.POLITE,
  ]),
  children: PropTypes.node,
  toggleButtonLabel: PropTypes.string,
  className: PropTypes.string,
  hideAfter: PropTypes.number,
};

BpkBannerAlert.defaultProps = {
  ariaLive: ARIA_LIVE.ASSERTIVE,
  children: null,
  toggleButtonLabel: null,
  className: null,
  hideAfter: null,
};

export default BpkBannerAlert;
