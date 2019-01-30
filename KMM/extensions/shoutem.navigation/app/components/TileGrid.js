import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import { connectStyle } from '@shoutem/theme';
import { GridRow, View, defaultThemeVariables } from '@shoutem/ui';
import { TILE_GRID } from '../const';
import TileItem from './TileItem';
import FolderBase from './FolderBase';

class TileGrid extends FolderBase {
  // itemText value when there is no text
  static NO_TEXT = 'noText';
  static ROW_COUNT = 2;

  static propTypes = {
    ...FolderBase.propTypes,
    // Text position; Also defines if there shouldn't be text.
    itemText: PropTypes.string,
    // Gutter size key
    itemGutter: PropTypes.string,
  };

  resolvePageProps() {
    const { style } = this.props;
    return style;
  }

  resolvePageProps() {
    const { style } = this.props;
    const { itemGutter } = this.getLayoutSettings();
    const { dimensions: { height } } = this.state;
    const styleName = `${itemGutter}-gutter`;

    return {
      style: {
        minHeight: height,
        ...style.page,
      },
      styleName,
    };
  }

  renderRow(row) {
    const { itemText, itemGutter, backgroundImagesEnabled } = this.getLayoutSettings();
    const { style } = this.props;
    const styleName = itemGutter === 'noGutter' ? `${itemText} no-gutter` : `${itemText} ${itemGutter}-gutter`;
    const tileItemStyle = {
      item: {
        ...style.item,
        marginLeft: itemGutter === 'noGutter' ? 0 : defaultThemeVariables.SmallGutter,
      },
      text: style.text,
    };

    const shortcutItems = _.map(row, (shortcut) => {
      return (
        <TileItem
          showText={itemText !== TileGrid.NO_TEXT}
          shortcut={shortcut}
          onPress={this.itemPressed}
          style={tileItemStyle}
          styleName={styleName}
          showBackground={backgroundImagesEnabled}
        />
      );
    });

    return (
      <GridRow columns={2} style={style.gridRow}>
        {shortcutItems}
      </GridRow>
    );
  }

  renderRows(page = []) {
    const groupedShortcuts = GridRow.groupByRows(page, TileGrid.ROW_COUNT);
    return groupedShortcuts.map(this.renderRow);
  }
}

const mapPropsToStyleNames = (styleNames, props) => {
  return styleNames;
};

export default connectStyle(TILE_GRID, undefined, mapPropsToStyleNames)(TileGrid);
