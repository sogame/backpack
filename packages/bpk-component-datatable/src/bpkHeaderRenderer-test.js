/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import { SortDirection } from 'react-virtualized';

import bpkHeaderRenderer, { getSortIconDirection } from './bpkHeaderRenderer';

jest.mock('./utils', () => ({
  hasClassName: (element, className) => element && element.hasClass(className),
}));

describe('bpkHeaderRenderer', () => {
  it('renders sort icons', () => {
    const header = bpkHeaderRenderer({ dataKey: 'dataKey', label: 'Label' });
    const { asFragment } = render(<div>{header}</div>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('does not render sort icons if sorting disabled', () => {
    const header = bpkHeaderRenderer({
      dataKey: 'dataKey',
      label: 'Label',
      disableSort: true,
    });
    const { asFragment } = render(<div>{header}</div>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders sort icon with down icon selected', () => {
    const header = bpkHeaderRenderer({
      dataKey: 'dataKey',
      label: 'Label',
      sortBy: 'dataKey',
      sortDirection: SortDirection.DESC,
    });
    const { asFragment } = render(<div>{header}</div>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders sort icon with up icon selected', () => {
    const header = bpkHeaderRenderer({
      dataKey: 'dataKey',
      label: 'Label',
      sortBy: 'dataKey',
      sortDirection: SortDirection.ASC,
    });
    const { asFragment } = render(<div>{header}</div>);
    expect(asFragment()).toMatchSnapshot();
  });
  describe('getSortIconDirection', () => {
    let mounted;
    beforeEach(() => {
      mounted = mount(
        <div>
          {bpkHeaderRenderer({
            dataKey: 'data',
            label: 'Label',
            sortBy: 'datax',
          })}
        </div>,
      );
    });

    it('returns ASC for the up icon element', () => {
      const upIcon = mounted
        .find('svg')
        .find('.bpk-data-table-column__sort-icon--up');
      const sortDirection = getSortIconDirection(upIcon);
      expect(sortDirection).toBe(SortDirection.ASC);
    });
    it('returns DESC for the down path element', () => {
      const downIcon = mounted
        .find('svg')
        .find('.bpk-data-table-column__sort-icon--down');
      const sortDirection = getSortIconDirection(downIcon);
      expect(sortDirection).toBe(SortDirection.DESC);
    });
    it('returns null other things', () => {
      const headerLabel = mounted
        .find('span')
        .find('.bpk-data-table-column__header');
      const sortDirection = getSortIconDirection(headerLabel);
      expect(sortDirection).toBeNull();
    });
  });
});
