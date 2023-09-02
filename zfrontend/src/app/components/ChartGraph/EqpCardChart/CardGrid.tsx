/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ChartInteractionEvent } from 'app/constants';
import { ChartSelectionManager } from 'app/models/ChartSelectionManager';
import ReactChart from 'app/models/ReactChart';
import { ChartMouseEventParams, ChartsEventData } from 'app/types/Chart';
import {
  ChartConfig,
  ChartDataSectionField,
  ChartStyleConfig,
  FontStyle,
} from 'app/types/ChartConfig';
import ChartDataSetDTO, { IChartDataSet } from 'app/types/ChartDataSet';
import { BrokerContext, BrokerOption } from 'app/types/ChartLifecycleBroker';
import {
  getColumnRenderName,
  getExtraSeriesRowData,
  getStyles,
  toFormattedValue,
  transformToDataSet,
} from 'app/utils/chartHelper';
import { CSSProperties } from 'react';
import { getConditionalStyle } from './conditionalStyle';
import Config from './config';
import GridCardAdapter from './GridCardAdapter';
import {
  CardConfig,
  GridCardItemData,
  GridCardItemInfo,
  LabelConfig,
  PaddingConfig,
} from './types';

class CardGrid extends ReactChart {
  chart: any = null;
  isISOContainer = 'react-card-grid';
  config = Config;
  protected isAutoMerge = false;
  index: number = 0;
  useIFrame = false;
  selectionManager?: ChartSelectionManager;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(props?) {
    super(GridCardAdapter, {
      id: props?.id || 'custom-eqp-card',
      name: props?.name || 'viz.palette.graph.names.eqpCard',
      icon: props?.icon || 'fanpaiqi',
    });
    this.meta.requirements = props?.requirements || [
      {
        group: 0,
        aggregate: 1,
      },
    ];
  }

  onMount(options: BrokerOption, context: BrokerContext) {
    if (options.containerId === undefined || !context.document) {
      return;
    }
    this.adapter?.mounted(
      context.document.getElementById(options.containerId),
      options,
      context,
    );

    this.selectionManager = new ChartSelectionManager(this.mouseEvents);
  }

  public onUnMount(options: BrokerOption, context?: BrokerContext): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.adapter?.unmount();
  }

  rearrangeArrayByIndex<T>(arr: T[][], index: number): T[][] {
    const len = arr.length;
    const newIndex = index % len;
    const newArr = [...arr.slice(newIndex), ...arr.slice(0, newIndex)];
    return newArr;
  }

  onUpdated(options: BrokerOption, context: BrokerContext) {
    if (!this.isMatchRequirement(options.config)) {
      this.adapter?.unmount();
      return;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    // options?.dataset?.rows = this.rearrangeArrayByIndex(
    //   options?.dataset?.rows,
    //   this.index,
    // );
    this.adapter?.updated(
      this.getOptions(context, options.dataset!, options.config!),
      context,
    );

    this.intervalId = setInterval(() => {
      this.index = this.index + 1;

      this.adapter?.updated(
        this.getOptions(context, options.dataset!, options.config!),
        context,
      );
      // console.log("刷新了")
    }, 3000);
  }

  onResize(options: BrokerOption, context: BrokerContext) {
    this.onUpdated(options, context);
  }

  getOptions(
    context: BrokerContext,
    dataset: ChartDataSetDTO,
    config: ChartConfig,
  ) {
    var rows = [] as any;
    if (dataset != null && dataset.rows != null) {
      rows = this.rearrangeArrayByIndex<string>(
        dataset?.rows as any,
        this.index,
      );
    }
    const styleConfigs = config.styles || [];
    const dataConfigs = config.datas || [];
    const aggregateConfigs = dataConfigs
      .filter(c => c.key === 'item')
      // .filter(c => c.type === ChartDataSectionType.Mixed)
      .flatMap(config => config.rows || []);

    const itemConfigs = dataConfigs
      .filter(c => c.key === 'item')
      .flatMap(config => config.rows || []);

    const currentQtyConfigs = dataConfigs
      .filter(c => c.key === 'currentQty')
      .flatMap(config => config.rows || []);

    const planQtyConfigs = dataConfigs
      .filter(c => c.key === 'planQty')
      .flatMap(config => config.rows || []);

    const headerConfigs = dataConfigs
      .filter(c => c.key === 'title')
      .flatMap(config => config.rows || []);

    const statusConfig = dataConfigs
      .filter(c => c.key === 'status')
      .flatMap(config => config.rows || []);

    const chartDataSet = transformToDataSet(
      rows as string[][],
      dataset.columns,
      dataConfigs,
    );

    const gridCardData = this.getChartData(
      chartDataSet,
      itemConfigs,
      headerConfigs,
      statusConfig,
      currentQtyConfigs,
      planQtyConfigs,
    );

    // console.log("chartDataSet:"+JSON.stringify(dataConfigs))

    const { padding, width } = this.getPaddingConfig(
      styleConfigs,
      context.width!,
    );
    const fontSizeFn = this.getFontSize(width, styleConfigs);
    const rowNumber = this.getRowNumber(styleConfigs)(['data']);
    const qtyShow = this.getQtyShow(styleConfigs)(['data']);

    const aggColorConfig = this.getColorConfig(
      styleConfigs,
      aggregateConfigs,
      chartDataSet,
    );
    const nameConfig = this.getNameConfig(
      aggColorConfig,
      styleConfigs,
      fontSizeFn,
    );

    const dataConfig = this.getDataConfig(
      aggColorConfig,
      styleConfigs,
      fontSizeFn,
      rowNumber,
    );

    const cardConfig = this.getCardConfig(rowNumber);

    const data: ChartsEventData[] = [
      {
        name: getColumnRenderName(aggregateConfigs[0]),
        value: toFormattedValue(
          chartDataSet?.[0]?.getCell?.(aggregateConfigs[0]),
          aggregateConfigs[0]?.format,
        ),
        ...getExtraSeriesRowData(chartDataSet?.[0]),
      },
    ];
    return {
      context: {
        width: context.width,
        height: context.height,
      },
      cardConfig,
      dataConfig,
      nameConfig,
      padding,
      data: gridCardData,
      qtyShow: qtyShow,
      background: aggColorConfig?.[0]?.backgroundColor || 'transparent',
      event: data.map((d, i) => this.registerEvents(data[i], i)),
    };
  }
  getCardConfig(rowNumber: string | number) {
    return {
      rowNumber: rowNumber ?? 6,
    } as CardConfig;
  }
  getChartData(
    chartDataSet: IChartDataSet<string>,
    itemConfigs: ChartDataSectionField[],
    headerConfigs: ChartDataSectionField[],
    statusConfigs: ChartDataSectionField[],
    currentQtyConfigs: ChartDataSectionField[],
    planQtyConfigs: ChartDataSectionField[],
  ) {
    var iteminfoData: GridCardItemInfo[] = new Array<GridCardItemInfo>();

    chartDataSet.forEach(dataSet => {
      var itemRowData: GridCardItemData[] = new Array<GridCardItemData>();
      itemConfigs.forEach(item => {
        itemRowData.push({
          value: dataSet.getCell(item),
          name: getColumnRenderName(item),
        });
      });
      var header = { name: '', value: '' } as GridCardItemData;
      var status = { name: '', value: '' } as GridCardItemData;
      var currentQty = { name: '', value: '' } as GridCardItemData;
      var planQty = { name: '', value: '' } as GridCardItemData;
      if (headerConfigs.length > 0) {
        header.name = getColumnRenderName(headerConfigs[0]);
        header.value = dataSet.getCell(headerConfigs[0]);
      }
      if (statusConfigs.length > 0) {
        status.name = getColumnRenderName(headerConfigs[0]);
        status.value = dataSet.getCell(statusConfigs[0]);
      }
      if (currentQtyConfigs.length > 0) {
        currentQty.name = getColumnRenderName(currentQtyConfigs[0]);
        currentQty.value = dataSet.getCell(currentQtyConfigs[0]);
      }
      if (planQtyConfigs.length > 0) {
        planQty.name = getColumnRenderName(planQtyConfigs[0]);
        planQty.value = dataSet.getCell(planQtyConfigs[0]);
      }

      iteminfoData.push({
        item: itemRowData,
        header: header,
        status: status,
        planQty: planQty,
        currentQty: currentQty,
      });
    });

    return iteminfoData;
  }

  private registerEvents(data: ChartsEventData, index: number) {
    const eventParams: ChartMouseEventParams = {
      type: 'click',
      chartType: 'scorecard',
      interactionType: ChartInteractionEvent.Select,
      data,
      selectedItems: [
        {
          index,
          data,
        },
      ],
    };
    return {
      onClick: event => {
        this.selectionManager?.echartsClickEventHandler({
          ...eventParams,
          dataIndex: index,
          componentIndex: '',
          data: eventParams.data,
        });
      },
    };
  }

  getColorConfig(
    style: ChartStyleConfig[],
    aggConfig: ChartDataSectionField[],
    chartDataSet: IChartDataSet<string>,
  ): CSSProperties[] {
    const [conditionalStylePanel] = getStyles(
      style,
      ['scorecardConditionalStyle', 'modal'],
      ['conditionalStylePanel'],
    );
    return aggConfig.map(ac =>
      getConditionalStyle(
        chartDataSet?.[0]?.getCell?.(ac),
        conditionalStylePanel,
        ac.uid!,
      ),
    );
  }

  getDataConfig(
    aggColorConfig: CSSProperties[],
    style: ChartStyleConfig[],
    fontSizeFn: (path: string[]) => string,
    rowNumber: string | number,
  ): { font: FontStyle; rowNumber: string | number }[] {
    const [font] = getStyles(style, ['data'], ['font']);
    return [
      {
        font: {
          fontSize: fontSizeFn(['data']),
          ...font,
          color: aggColorConfig?.[0]?.color || font.color,
        },
        rowNumber: rowNumber,
      },
    ];
  }

  getQtyShow(style: ChartStyleConfig[]): (path: string[]) => string {
    return path => {
      const [qtyShow] = getStyles(style, path, ['qtyShow']);
      return qtyShow;
    };
  }
  getFontSize(
    width: number,
    style: ChartStyleConfig[],
  ): (path: string[]) => string {
    return path => {
      const [autoFontSize, scale, fixedFontSize] = getStyles(style, path, [
        'autoFontSize',
        'scale',
        'fixedFontSize',
      ]);
      if (autoFontSize) {
        return Math.floor(width / scale) + 'px';
      }
      return fixedFontSize + 'px';
    };
  }

  getRowNumber(style: ChartStyleConfig[]): (path: string[]) => string {
    return path => {
      const [rowNumber] = getStyles(style, path, ['rowNumber']);
      return rowNumber;
    };
  }

  getNameConfig(
    aggColorConfig: CSSProperties[],
    style: ChartStyleConfig[],
    fontSizeFn: (path: string[]) => string,
  ): LabelConfig {
    const [show, font, position, alignment] = getStyles(
      style,
      ['label'],
      ['show', 'font', 'position', 'alignment'],
    );
    return {
      show,
      font: {
        ...font,
        fontSize: fontSizeFn(['label']),
        color: aggColorConfig?.[0]?.color || font.color,
      },
      position,
      alignment,
    };
  }

  getPaddingConfig(
    style: ChartStyleConfig[],
    contextWidth: number,
  ): PaddingConfig {
    const _getPaddingNum = (value: string) => {
      if (!value || isNaN(parseFloat(value))) {
        return 0;
      }
      if (/%$/g.test(value)) {
        return Math.ceil((parseFloat(value) * contextWidth) / 100);
      }
      return parseFloat(value);
    };
    const _initPaddingNum = (value: string) => {
      if (!value || isNaN(parseFloat(value))) {
        return '0';
      }
      if (/%$/g.test(value)) {
        return value;
      }
      return value + 'px';
    };
    const [left, right, top, bottom] = getStyles(
      style,
      ['margin'],
      ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
    );
    return {
      padding: `${_initPaddingNum(top)} ${_initPaddingNum(
        right,
      )} ${_initPaddingNum(bottom)} ${_initPaddingNum(left)}`,
      width: Math.floor(
        contextWidth - _getPaddingNum(left) - _getPaddingNum(right),
      ),
    };
  }
}

export default CardGrid;
