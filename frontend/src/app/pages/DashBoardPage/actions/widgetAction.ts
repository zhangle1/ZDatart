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

import { PageInfo } from 'app/pages/MainPage/pages/ViewPage/slice/types';
import { urlSearchTransfer } from 'app/pages/MainPage/pages/VizPage/utils';
import { ChartMouseEventParams } from 'app/types/Chart';
import i18next from 'i18next';
import { RootState } from 'types';
import { jumpTypes, ORIGINAL_TYPE_MAP } from '../constants';
import { boardActions } from '../pages/Board/slice';
import {
  getChartWidgetDataAsync,
  getControllerOptions,
  getWidgetData,
} from '../pages/Board/slice/thunk';
import {
  BoardLinkFilter,
  BoardState,
  RectConfig,
  VizRenderMode,
} from '../pages/Board/slice/types';
import {
  editBoardStackActions,
  editDashBoardInfoActions,
  editWidgetInfoActions,
} from '../pages/BoardEditor/slice';
import {
  editorWidgetClearLinkageAction,
  widgetClearLinkageAction,
} from '../pages/BoardEditor/slice/actions/actions';
import {
  getEditChartWidgetDataAsync,
  getEditControllerOptions,
  getEditWidgetData,
} from '../pages/BoardEditor/slice/thunk';
import { HistoryEditBoard } from '../pages/BoardEditor/slice/types';
import { Widget } from '../types/widgetTypes';
import {
  getCascadeControllers,
  getNeedRefreshWidgetsByController,
  getValueByRowData,
} from '../utils/widget';

export const toggleLinkageAction =
  (boardEditing: boolean, boardId: string, widgetId: string, toggle: boolean) =>
  dispatch => {
    if (boardEditing) {
      dispatch(
        editWidgetInfoActions.changeWidgetInLinking({
          boardId,
          widgetId,
          toggle,
        }),
      );
    } else {
      dispatch(
        boardActions.changeWidgetInLinking({
          boardId,
          widgetId,
          toggle,
        }),
      );
    }
  };
// tableChartClickAction
export const tableChartClickAction =
  (
    boardId: string,
    editing: boolean,
    renderMode: VizRenderMode,
    widget: Widget,
    params: ChartMouseEventParams,
  ) =>
  dispatch => {
    const opt = {
      pageInfo: { pageNo: params?.value?.pageNo },
      sorters: [
        {
          column: params?.seriesName!,
          operator: (params?.value as any)?.direction,
          aggOperator: (params?.value as any)?.aggOperator,
        },
      ],
    };
    if (editing) {
      dispatch(
        getEditChartWidgetDataAsync({
          widgetId: widget.id,
          option: opt,
        }),
      );
    } else {
      dispatch(
        getChartWidgetDataAsync({
          boardId,
          widgetId: widget.id,
          renderMode,
          option: opt,
        }),
      );
    }
  };

export const widgetClickJumpAction =
  (obj: {
    renderMode: VizRenderMode;
    widget: Widget;
    params: ChartMouseEventParams;
    history: any;
    viewType: string;
  }) =>
  (dispatch, getState) => {
    const { renderMode, widget, params, history, viewType } = obj;
    const state = getState() as RootState;
    const orgId = state?.main?.orgId || '';
    const folderIds = state.viz?.vizs?.map(v => v.relId) || [];
    const jumpConfig = widget.config?.jumpConfig;
    const targetType = jumpConfig?.targetType || jumpTypes[0].value;

    const URL = jumpConfig?.URL || '';
    const queryName = jumpConfig?.queryName || '';
    const targetId = jumpConfig?.target?.relId;
    const jumpFieldName: string = jumpConfig?.field?.jumpFieldName || '';
    // table chart
    if (
      params.componentType === 'table' &&
      jumpFieldName !== params.seriesName
    ) {
      return;
    }
    const rowDataValue = getValueByRowData(
      params.data,
      jumpFieldName,
      viewType,
    );
    console.warn(' jumpValue:', rowDataValue);
    console.warn('rowData', params.data?.rowData);
    console.warn(`rowData[${jumpFieldName}]:${rowDataValue} `);
    if (targetType === 'URL') {
      // jump url
      let jumpUrl;
      if (URL.indexOf('?') > -1) {
        jumpUrl = `${URL}&${queryName}=${rowDataValue}`;
      } else {
        jumpUrl = `${URL}?${queryName}=${rowDataValue}`;
      }
      window.location.href = jumpUrl;
      return;
    }
    // jump in datart
    if (jumpConfig?.targetType === 'INTERNAL') {
      if (!folderIds.includes(jumpConfig.target.relId)) {
        dispatch(
          showJumpErrorAction(renderMode, widget.dashboardId, widget.id),
        );
        return;
      }
      if (typeof jumpConfig?.filter === 'object') {
        const searchParamsStr = urlSearchTransfer.toUrlString({
          [jumpConfig?.filter?.filterId]: rowDataValue,
        });
        history.push(
          `/organizations/${orgId}/vizs/${targetId}?${searchParamsStr}`,
        );
      }
    }
  };

export const widgetClickLinkageAction =
  (
    boardId: string,
    editing: boolean,
    renderMode: VizRenderMode,
    widget: Widget,
    params: ChartMouseEventParams,
    viewType: string,
  ) =>
  (dispatch, getState) => {
    const { componentType, seriesType, seriesName } = params;
    const isTableHandle = componentType === 'table' && seriesType === 'body';

    const linkRelations = widget.relations.filter(re => {
      const {
        config: { type, widgetToWidget },
      } = re;
      if (type !== 'widgetToWidget') return false;
      if (isTableHandle) {
        if (widgetToWidget?.triggerColumn === seriesName) return true;
        return false;
      }
      return true;
    });

    const boardFilters = linkRelations
      .map(re => {
        let linkageFieldName: string =
          re?.config?.widgetToWidget?.triggerColumn || '';
        const linkValue = getValueByRowData(
          params.data,
          linkageFieldName,
          viewType,
        );
        if (!linkValue) {
          console.warn('linkageFieldName:', linkageFieldName);
          console.warn('rowData', params.data?.rowData);
          console.warn(`rowData[${linkageFieldName}]:${linkValue} `);
          return undefined;
        }
        const filter: BoardLinkFilter = {
          triggerWidgetId: widget.id,
          triggerValue: linkValue,
          triggerDataChartId: widget.datachartId,
          linkerWidgetId: re.targetId,
        };
        return filter;
      })
      .filter(item => !!item) as BoardLinkFilter[];

    if (editing) {
      dispatch(
        editDashBoardInfoActions.changeBoardLinkFilter({
          boardId: boardId,
          triggerId: widget.id,
          linkFilters: boardFilters,
        }),
      );
    } else {
      dispatch(
        boardActions.changeBoardLinkFilter({
          boardId: boardId,
          triggerId: widget.id,
          linkFilters: boardFilters,
        }),
      );
    }
    dispatch(toggleLinkageAction(editing, boardId, widget.id, true));
    setTimeout(() => {
      boardFilters.forEach(f => {
        if (editing) {
          dispatch(
            getEditChartWidgetDataAsync({
              widgetId: f.linkerWidgetId,
              option: {
                pageInfo: { pageNo: 1 },
              },
            }),
          );
        } else {
          dispatch(
            getChartWidgetDataAsync({
              boardId,
              widgetId: f.linkerWidgetId,
              renderMode,
              option: {
                pageInfo: { pageNo: 1 },
              },
            }),
          );
        }
      });
    }, 60);
  };
//
export const widgetChartClickAction =
  (obj: {
    boardId: string;
    editing: boolean;
    renderMode: VizRenderMode;
    widget: Widget;
    params: ChartMouseEventParams;
    history: any;
  }) =>
  (dispatch, getState) => {
    const { boardId, editing, renderMode, widget, params, history } = obj;
    const rootState = getState() as RootState;
    const viewBoardState = rootState.board as BoardState;
    const viewMap = viewBoardState.viewMap;
    const viewType =
      viewMap[widget?.config?.content?.dataChart?.viewId]?.type || 'SQL';

    //is tableChart
    if (
      params.componentType === 'table' &&
      params.seriesType === 'paging-sort-filter'
    ) {
      dispatch(
        tableChartClickAction(boardId, editing, renderMode, widget, params),
      );
      return;
    }
    // jump
    const jumpConfig = widget.config?.jumpConfig;
    if (jumpConfig && jumpConfig.open) {
      dispatch(
        widgetClickJumpAction({
          renderMode,
          widget,
          params,
          history,
          viewType,
        }),
      );
      return;
    }
    // linkage
    const linkageConfig = widget.config.linkageConfig;
    if (linkageConfig?.open && widget.relations.length) {
      dispatch(
        widgetClickLinkageAction(
          boardId,
          editing,
          renderMode,
          widget,
          params,
          viewType,
        ),
      );
      return;
    }
  };
export const widgetGetDataAction =
  (editing: boolean, widget: Widget, renderMode: VizRenderMode) => dispatch => {
    const boardId = widget.dashboardId;
    if (editing) {
      dispatch(getEditWidgetData({ widget }));
    } else {
      dispatch(getWidgetData({ boardId, widget, renderMode }));
    }
  };

export const widgetToClearLinkageAction =
  (editing: boolean, widget: Widget, renderMode: VizRenderMode) => dispatch => {
    if (editing) {
      dispatch(editorWidgetClearLinkageAction(widget));
    } else {
      dispatch(widgetClearLinkageAction(widget, renderMode));
    }
  };

export const showJumpErrorAction =
  (renderMode: VizRenderMode, boardId: string, wid: string) => dispatch => {
    const errorInfo = i18next.t('viz.jump.jumpError');
    if (renderMode === 'edit') {
      dispatch(
        editWidgetInfoActions.setWidgetErrInfo({
          boardId,
          widgetId: wid,
          errInfo: errorInfo, // viz.linkage.linkageError
          errorType: 'interaction',
        }),
      );
    } else {
      dispatch(
        boardActions.setWidgetErrInfo({
          boardId,
          widgetId: wid,
          errInfo: errorInfo,
          errorType: 'interaction',
        }),
      );
    }
  };
export const refreshWidgetsByControllerAction =
  (renderMode: VizRenderMode, widget: Widget) => (dispatch, getState) => {
    const boardId = widget.dashboardId;
    const controllerIds = getCascadeControllers(widget);
    const rootState = getState() as RootState;
    const editBoardState = (rootState.editBoard as unknown as HistoryEditBoard)
      .stack.present;

    const viewBoardState = rootState.board as BoardState;
    const widgetMap =
      renderMode === 'edit'
        ? editBoardState.widgetRecord
        : viewBoardState.widgetRecord[boardId];
    const hasQueryBtn = Object.values(widgetMap || {}).find(
      item => item.config.originalType === ORIGINAL_TYPE_MAP.queryBtn,
    );
    // 获取级联选项
    controllerIds.forEach(controlWidgetId => {
      if (renderMode === 'edit') {
        dispatch(getEditControllerOptions(controlWidgetId));
      } else {
        dispatch(
          getControllerOptions({
            boardId,
            widgetId: controlWidgetId,
            renderMode,
          }),
        );
      }
    });
    // 如果有 hasQueryBtn 那么control不会立即触发查询
    if (hasQueryBtn) return;
    const pageInfo: Partial<PageInfo> = {
      pageNo: 1,
    };
    const chartWidgetIds = getNeedRefreshWidgetsByController(widget);

    chartWidgetIds.forEach(widgetId => {
      if (renderMode === 'edit') {
        dispatch(
          getEditChartWidgetDataAsync({ widgetId, option: { pageInfo } }),
        );
      } else {
        dispatch(
          getChartWidgetDataAsync({
            boardId,
            widgetId,
            renderMode,
            option: { pageInfo },
          }),
        );
      }
    });
  };

export const changeGroupRectAction =
  (args: {
    renderMode: VizRenderMode;
    boardId: string;
    wid: string;
    w: number;
    h: number;
  }) =>
  dispatch => {
    const { renderMode } = args;
    if (renderMode === 'edit') {
      dispatch(changeEditGroupRectAction(args));
    } else {
      dispatch(changeViewGroupRectAction(args));
    }
  };

export const changeViewGroupRectAction =
  (args: {
    renderMode: VizRenderMode;
    boardId: string;
    wid: string;
    w: number;
    h: number;
  }) =>
  (dispatch, getState) => {
    const { wid, w, h, boardId } = args;
    const rootState = getState() as RootState;
    const viewBoardState = rootState.board as BoardState;
    const widgetMap = viewBoardState.widgetRecord[boardId];
    if (!wid) return;
    const widget = widgetMap?.[wid];
    if (!widget) return;
    const parentWidget = widgetMap[widget.parentId || ''];
    const rect: RectConfig = {
      x: 0,
      y: 0,
      width: w,
      height: h,
    };

    const parentIsContainer =
      parentWidget && parentWidget.config.type === 'container';

    const parentIsAutoBoard =
      widget.config.boardType === 'auto' && !widget.parentId;

    if (parentIsContainer || parentIsAutoBoard) {
      dispatch(
        boardActions.changeFreeWidgetRect({
          boardId: widget.dashboardId,
          wid,
          rect,
        }),
      );
      return;
    }
  };
export const changeEditGroupRectAction =
  (args: {
    renderMode: VizRenderMode;
    boardId: string;
    wid: string;
    w: number;
    h: number;
  }) =>
  (dispatch, getState) => {
    const { wid, w, h } = args;
    const rootState = getState() as RootState;
    const editBoardState = (rootState.editBoard as unknown as HistoryEditBoard)
      .stack.present;
    const widgetMap = editBoardState.widgetRecord;
    if (!wid) return;
    const widget = widgetMap?.[wid];
    if (!widget) return;
    const parentWidget = widgetMap[widget.parentId || ''];
    const rect: RectConfig = {
      x: 0,
      y: 0,
      width: w,
      height: h,
    };
    const parentIsContainer =
      parentWidget && parentWidget.config.type === 'container';

    const parentIsAutoBoard =
      widget.config.boardType === 'auto' && !widget.parentId;

    if (parentIsContainer || parentIsAutoBoard) {
      dispatch(
        editBoardStackActions.changeFreeWidgetRect({
          wid,
          rect,
        }),
      );
    }
  };
