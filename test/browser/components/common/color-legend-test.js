// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import test from 'tape';
import {mountWithTheme} from 'test/helpers/component-utils';

import {ColorLegendFactory, LegendRowFactory, appInjector} from '@kepler.gl/components';

const ColorLegend = appInjector.get(ColorLegendFactory);
const LegendRow = appInjector.get(LegendRowFactory);

test('Components -> ColorLegend.render 1', t => {
  t.doesNotThrow(() => {
    mountWithTheme(<ColorLegend />);
  }, 'Show not fail without props');

  const width = 180;
  const fieldType = 'real';
  const domain = [0, 20];
  const scaleType = 'quantize';
  const range = {
    colors: ['#5A1846', '#900C3F', '#C70039', '#E3611C', '#F1920E', '#FFC300']
  };
  const displayLabel = true;

  const props = {
    scaleType,
    displayLabel,
    domain,
    fieldType,
    range,
    width
  };

  let wrapper = mountWithTheme(<ColorLegend {...props} />);
  t.equal(wrapper.find(LegendRow).length, 6, 'Should render 6 legends');
  const rect = wrapper.find(LegendRow).at(0).find('.legend-row-color').at(0);

  t.equal(rect.props().style.backgroundColor, '#5A1846', 'should render color rect');

  props.scaleType = 'quantile';
  wrapper = mountWithTheme(<ColorLegend {...props} />);
  t.equal(wrapper.find(LegendRow).length, 6, 'Should render 6 legends');

  props.scaleType = 'log';
  wrapper = mountWithTheme(<ColorLegend {...props} />);
  t.equal(wrapper.find(LegendRow).length, 0, 'Should render 0 legends');

  props.displayLabel = false;
  props.scaleType = 'quantile';
  wrapper = mountWithTheme(<ColorLegend {...props} />);

  const row1Txt = wrapper.find(LegendRow).at(0).find('.legend__label__title__editor').at(0);

  t.equal(row1Txt.props().value, '', 'should not render text');

  t.end();
});

test('Components -> ColorLegend.render 2', t => {
  t.doesNotThrow(() => {
    mountWithTheme(<ColorLegend />);
  }, 'Show not fail without props');

  const width = 180;
  const range = {
    colorMap: [
      ['apple', '#C1C9CC'],
      ['pear', '#DFB02F'],
      ['car', '#7F8120'],
      ['dog', '#DCD0A4'],
      ['chicken', '#AD5633']
    ]
  };

  const props = {
    displayLabel: true,
    range,
    width
  };

  let wrapper = mountWithTheme(<ColorLegend {...props} />);
  t.equal(wrapper.find(LegendRow).length, 5, 'Should render 5 legends');
  let row1 = wrapper.find(LegendRow).at(0);
  let rect = row1.find('.legend-row-color').at(0);
  let label = row1.find('.legend__label__title__editor').at(0);

  t.equal(rect.props().style.backgroundColor, '#C1C9CC', 'should render color rect');
  t.equal(label.props().value, 'apple', 'should render color text based on colorMap');

  props.range = {
    colorLegends: {
      '#DFB02F': 'Apple',
      '#7F8120': 'Pear',
      '#DCD0A4': 'Car',
      '#AD5633': 'Dog',
      '#C1C9CC': 'Chicken'
    }
  };

  wrapper = mountWithTheme(<ColorLegend {...props} />);
  t.equal(wrapper.find(LegendRow).length, 5, 'Should render 5 legends');
  row1 = wrapper.find(LegendRow).at(0);
  rect = row1.find('.legend-row-color').at(0);
  label = row1.find('.legend__label__title__editor').at(0);

  t.equal(rect.props().style.backgroundColor, '#DFB02F', 'should render color rect');
  t.equal(label.props().value, 'Apple', 'should render color text based on colorMap');

  t.end();
});
