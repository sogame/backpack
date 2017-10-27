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
import BpkAnimateHeight from 'bpk-animate-height';
import { durationBase } from 'bpk-tokens/tokens/base.es6';
import { cssModules } from 'bpk-react-utils';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import STYLES from './bpk-banner-alert.scss';

const getClassName = cssModules(STYLES);

const animateHeightDuration = parseInt(durationBase, 10);
const fadeDuration = parseInt(durationBase, 10);

class AnimateAndFade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      atHeight: this.props.show,
      visible: this.props.show,
      hiding: false,
      showing: false,
    };

    this.onToggle = this.onToggle.bind(this);
    this.onFadeComplete = this.onFadeComplete.bind(this);
    this.onAnimateHeightComplete = this.onAnimateHeightComplete.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      this.onToggle();
    }
  }

  onToggle() {
    if (this.state.visible && this.state.atHeight) {
      this.hide();
    } else if (!this.state.visible && !this.state.atHeight) {
      this.show();
    }
  }

  onAnimateHeightComplete() {
    if (this.state.showing) {
      this.setState({
        showing: false,
      });
    }
  }

  onFadeComplete() {
    if (this.state.hiding) {
      this.setState({
        atHeight: false,
        hiding: false,
      });
    }
  }

  show() {
    this.setState({
      atHeight: true,
      showing: true,
      visible: true,
    });
  }

  hide() {
    this.setState({
      hiding: true,
      visible: false,
    });
  }

  render() {
    const { children, onEnter, onLeave } = this.props;
    const showPlaceholder = !this.state.visible && !this.state.hiding;

    const fadingComponent = (
      <CSSTransitionGroup
        transitionName={{
          leave: getClassName('bpk-banner-alert--leave'),
          leaveActive: getClassName('bpk-banner-alert--leave-active'),
          enter: getClassName('bpk-banner-alert--enter'),
          enterActive: getClassName('bpk-banner-alert--enter-active'),
          appear: getClassName('bpk-banner-alert--appear'),
          appearActive: getClassName('bpk-banner-alert--appear-active'),
        }}
        transitionLeave={onLeave}
        transitionEnter={onEnter}
        transitionAppear={onEnter}
        transitionLeaveTimeout={fadeDuration + animateHeightDuration}
        transitionEnterTimeout={fadeDuration + animateHeightDuration}
        transitionAppearTimeout={fadeDuration + animateHeightDuration}
        onTransitionEnd={this.onFadeComplete}
      >
        {this.state.visible &&
            children
          }
      </CSSTransitionGroup>
    );

    // While the expanding animation takes place, we render the child element
    // close to invisible. If we don't do this, the animate-height container
    // will take on height 0, and will never expand to allow the children to fade in
    const placeholder = (
      <div style={{ opacity: showPlaceholder ? 0.01 : 1 }}>
        {showPlaceholder &&
              children
            }
      </div>
    );

    return (
      <BpkAnimateHeight
        onAnimationComplete={this.onAnimateHeightComplete}
        duration={animateHeightDuration}
        height={this.state.atHeight ? 'auto' : 0}
      >
        {placeholder}
        {fadingComponent}
      </BpkAnimateHeight>
    );
    /* eslint-enable */
  }
}

AnimateAndFade.propTypes = {
  onEnter: PropTypes.bool.isRequired,
  onLeave: PropTypes.bool.isRequired,
  children: PropTypes.node,
  show: PropTypes.bool,
};

AnimateAndFade.defaultProps = {
  show: false,
  children: null,
};

export default AnimateAndFade;
