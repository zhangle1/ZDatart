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
import * as datav from '@jiaminghi/data-view-react'

import { Form, Select, Space } from 'antd';
import { WidgetContext } from 'app/pages/DashBoardPage/components/WidgetProvider/WidgetProvider';
import { memo, useContext, useEffect, useState } from 'react';
import { BoardContext } from '../../BoardProvider/BoardProvider';
import { FlexStyle, ZIndexStyle } from '../../WidgetComponents/constants';
import { EditMask } from '../../WidgetComponents/EditMask';
import { LockIconFn } from '../../WidgetComponents/StatusIcon';
import { StyledWidgetToolBar } from '../../WidgetComponents/StyledWidgetToolBar';
import { WidgetDropdownList } from '../../WidgetComponents/WidgetDropdownList';
import { WidgetTitle } from '../../WidgetComponents/WidgetTitle';
import { WidgetWrapper } from '../../WidgetComponents/WidgetWrapper';
import {
  getWidgetBaseStyle,
  getWidgetTitle,
} from '../../WidgetManager/utils/utils';
import { WidgetInfoContext } from '../../WidgetProvider/WidgetInfoProvider';
import { RichTextWidgetCore } from './RichTextWidgetCore';
import { MediaWidgetContent } from 'app/pages/DashBoardPage/pages/Board/slice/types';
import produce from 'immer';
import { ColorPickerPopover } from 'app/components/ColorPicker';
import { BoardActionContext } from '../../ActionProvider/BoardActionProvider';
import { useDispatch } from 'react-redux';
import { editBoardStackActions } from 'app/pages/DashBoardPage/pages/BoardEditor/slice';

export const BorderWidget2: React.FC<{ hideTitle: boolean }> = memo(
  ({ hideTitle }) => {
    const widget = useContext(WidgetContext);
    const { editing } = useContext(BoardContext);
    const widgetInfo = useContext(WidgetInfoContext);
    const title = getWidgetTitle(widget.config.customConfig.props);
    title.title = widget.config.name;
    // 自动更新
    const { background, border, padding } = getWidgetBaseStyle(
      widget.config.customConfig.props,
    );
    const dispatch = useDispatch();


    const type = (widget.config.content as MediaWidgetContent).borderConfig?.type??2;
    const firstColor = (widget.config.content as MediaWidgetContent).borderConfig?.firstColor??'#4fd2dd';
    const secondColor = (widget.config.content as MediaWidgetContent).borderConfig?.secondColor??'#235fa7';
    const [curType, setCurType] = useState<number | undefined>(1);
    const [curFirstColor, setCurColor1] = useState<string | undefined>('#4fd2dd');
    const [curSecondColor, setCurColor2] = useState<string | undefined>('#235fa7');
  
    useEffect(() => {
      setCurType(type);
      setCurColor1(firstColor);
      setCurColor2(secondColor);
    }, [type, firstColor, secondColor]);
     
  
    const onChange = (value, type) => {
      // const nextWidget = produce(widget, draft => {
      //   (draft.config.content as MediaWidgetContent).borderConfig = {
      //     type: type === 'border' ? value : curType,
      //     firstColor: type === 'firstColor' ? value : curFirstColor,
      //     secondColor: type === 'secondColor' ? value : curSecondColor,
      //   };

      // });

      
    const nextMediaWidgetContent = produce(widget.config.content, draft => {
      (draft as any).borderConfig = {
        type: type === 'border' ? value : curType,
        firstColor: type === 'firstColor' ? value : curFirstColor,
        secondColor: type === 'secondColor' ? value : curSecondColor,
      };
    }) as any;
    dispatch(
      editBoardStackActions.changeMediaWidgetConfig({
        id: widget.id,
        mediaWidgetContent: nextMediaWidgetContent,
      }),
    );
      // widgetUpdate(nextWidget);
      
    };
  
    const COLORS = [
      '#B80000',
      '#DB3E00',
      '#FCCB00',
      '#008B02',
      '#006B76',
      '#1273DE',
      '#004DCF',
      '#5300EB',
      '#EB9694',
      '#FAD0C3',
      '#FEF3BD',
      '#C1E1C5',
      '#BEDADC',
      '#C4DEF6',
      '#BED3F3',
      '#D4C4FB',
    ];
    const setter = (
      <div className="wrap-form">
        <Form
          initialValues={{ type: type }}
          layout="inline"
          autoComplete="off"
        >
          <Form.Item
            label="样式"
            name="type"
          >
            <Select
              dropdownMatchSelectWidth
              onChange={value => onChange(value, 'border')}
            >
              {[...new Array(13).keys()].map(o => (
                <Select.Option key={o} value={o}>
                  样式{o+1}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="主颜色"
            name="mainColor"
          >
            <ColorPickerPopover
              colors={COLORS}
              size={6}
              defaultValue={ curFirstColor }
              onChange={value => onChange(value, 'firstColor')}
            ></ColorPickerPopover>
          </Form.Item>
          <Form.Item
            label="副颜色"
            name="secondColor"
          >
            <ColorPickerPopover
              colors={COLORS}
              size={6}
              defaultValue={ curSecondColor }
              onChange={value => onChange(value, 'secondColor')}
            ></ColorPickerPopover>
          </Form.Item>
        </Form>
      </div>
    );
  


    return (
      <WidgetWrapper background={background} border={border} padding={padding}>
        <div style={ZIndexStyle}>
          {hideTitle ? null : <WidgetTitle title={title} />}
          <div style={FlexStyle}>
          {editing && setter}
      {(() => {
        switch (curType) {
          case 0:
            return <datav.BorderBox1 color={[curFirstColor, curSecondColor]} key={ 1 + new Date().getTime() }/>
          case 1:
            return <datav.BorderBox2 color={[curFirstColor, curSecondColor]} key={ 2 + new Date().getTime() }/>
          case 2:
            return <datav.BorderBox3 color={[curFirstColor, curSecondColor]} key={ 3 + new Date().getTime() }/>
          case 3:
            return <datav.BorderBox4 color={[curFirstColor, curSecondColor]} key={ 4 + new Date().getTime() }/>
          case 4:
            return <datav.BorderBox5 color={[curFirstColor, curSecondColor]} key={ 5 + new Date().getTime() }/>
          case 5:
            return <datav.BorderBox6 color={[curFirstColor, curSecondColor]} key={ 6 + new Date().getTime() }/>
          case 6:
            return <datav.BorderBox7 color={[curFirstColor, curSecondColor]} key={ 7 + new Date().getTime() }/>
          case 7:
            return <datav.BorderBox8 color={[curFirstColor, curSecondColor]} key={ 8 + new Date().getTime() }/>
          case 8:
            return <datav.BorderBox9 color={[curFirstColor, curSecondColor]} key={ 9 + new Date().getTime() }/>
          case 9:
            return <datav.BorderBox10 color={[curFirstColor, curSecondColor]} key={ 10 + new Date().getTime() }/>
          case 10:
            return <datav.BorderBox11 color={[curFirstColor, curSecondColor]} key={ 11 + new Date().getTime() }/>
          case 11:
            return <datav.BorderBox12 color={[curFirstColor, curSecondColor]} key={ 12 + new Date().getTime()} />
          case 12:
            return <datav.BorderBox13 color={[curFirstColor, curSecondColor]} key={ 13 + new Date().getTime() }/>
          default:
            return <datav.BorderBox1 color={[curFirstColor, curSecondColor]} key={ 1 + new Date().getTime() }/>
        }
      }
      )()}
          </div>
        </div>
        {editing && <EditMask />}
        <StyledWidgetToolBar>
          <Space size={0}>
            <LockIconFn
              boardEditing={editing}
              wid={widget.id}
              lock={widget.config?.lock}
            />
            <WidgetDropdownList widget={widget} />
          </Space>
        </StyledWidgetToolBar>
      </WidgetWrapper>
    );
  },
);
