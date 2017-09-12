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
import { ThemeProvider } from 'glamorous';

import BpkSelect from './../bpk-component-select';

const THEMES = {
  ba: {
    primaryColor: '#eb2226',
    primaryContrastColor: '#ffffff',
    primaryGradientStartColor: '#eb2226',
    primaryGradientEndColor: '#eb2226',
    primaryLightColor: '#ff2427',
    primaryLightContrastColor: '#ffffff',
    primaryDarkColor: '#b81a1c',
    primaryDarkContrastColor: '#ffffff',
    secondaryColor: '#ffffff',
    secondaryContrastColor: '#eb2226',
  },
  klm: {
    primaryColor: '#00a1e4',
    primaryContrastColor: '#ffffff',
    primaryGradientStartColor: '#00a1e4',
    primaryGradientEndColor: '#00a1e4',
    primaryLightColor: '#00AAF2',
    primaryLightContrastColor: '#ffffff',
    primaryDarkColor: '#0086BF',
    primaryDarkContrastColor: '#ffffff',
    secondaryColor: '#ffffff',
    secondaryContrastColor: '#00a1e4',
  },
};

class ThemeSwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    this.setState(() => ({ value }));
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={THEMES[this.state.value] || {}}>
          <div>
            {this.props.children}
          </div>
        </ThemeProvider>
        <br />
        <BpkSelect
          id="theme-switcher"
          name="themes"
          value={this.state.value}
          onChange={this.onChange}
        >
          <option value="">Select theme...</option>
          <option value="ba">British Airways</option>
          <option value="klm">KLM</option>
        </BpkSelect>
      </div>
    );
  }
}

ThemeSwitcher.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeSwitcher;
