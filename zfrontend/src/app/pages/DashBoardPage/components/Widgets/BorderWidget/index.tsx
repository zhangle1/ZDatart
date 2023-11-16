//  新增边框组件
//  文件路径frontend/src/app/pages/DashBoardPage/components/WidgetCore/MediaWidget/BorderWidget/index.tsx
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
import * as datav from '@jiaminghi/data-view-react';
import { Form, Select } from 'antd';
// import { MediaWidgetContent } from '../../../../pages/Board/slice/types';
import { ColorPickerPopover } from 'app/components/ColorPicker';
import { MediaWidgetContent } from 'app/pages/DashBoardPage/pages/Board/slice/types';
import { editBoardStackActions } from 'app/pages/DashBoardPage/pages/BoardEditor/slice';
// import { BoardActionContext } from 'app/pages/DashBoardPage/contexts/BoardActionContext';
// import { WidgetContext } from 'app/pages/DashBoardPage/contexts/WidgetContext';
// import { WidgetInfoContext } from 'app/pages/DashBoardPage/contexts/WidgetInfoContext';
import produce from 'immer';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { G20 } from 'styles/StyleConstants';
import { WidgetInfoContext } from '../../WidgetProvider/WidgetInfoProvider';
import { WidgetContext } from '../../WidgetProvider/WidgetProvider';

export const BorderWidget: React.FC<{}> = () => {
  const widget = useContext(WidgetContext);
  const { editing } = useContext(WidgetInfoContext);
  //   const { widgetUpdate } = useContext(BoardActionContext);
  const type = (widget.config.content as MediaWidgetContent).borderConfig?.type;
  const firstColor = (widget.config.content as MediaWidgetContent).borderConfig
    ?.firstColor;
  const secondColor = (widget.config.content as MediaWidgetContent).borderConfig
    ?.secondColor;
  const [curType, setCurType] = useState<number | undefined>(1);
  const [curFirstColor, setCurColor1] = useState<string | undefined>('#4fd2dd');
  const [curSecondColor, setCurColor2] = useState<string | undefined>(
    '#235fa7',
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setCurType(type);
    setCurColor1(firstColor);
    setCurColor2(secondColor);
  }, [type, firstColor, secondColor]);

  const onChange = (value, type) => {
    // const nextWidget = produce(widget.config.content, draft => {
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
      <Form initialValues={{ type: type }} layout="inline" autoComplete="off">
        <Form.Item label="样式" name="type">
          <Select
            dropdownMatchSelectWidth
            onChange={value => onChange(value, 'border')}
          >
            {[...new Array(13).keys()].map(o => (
              <Select.Option key={o} value={o}>
                样式{o + 1}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="主颜色" name="mainColor">
          <ColorPickerPopover
            colors={COLORS}
            size={6}
            defaultValue={curFirstColor}
            onChange={value => onChange(value, 'firstColor')}
          ></ColorPickerPopover>
        </Form.Item>
        <Form.Item label="副颜色" name="secondColor">
          <ColorPickerPopover
            colors={COLORS}
            size={6}
            defaultValue={curSecondColor}
            onChange={value => onChange(value, 'secondColor')}
          ></ColorPickerPopover>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <Wrap>
      {editing && setter}
      {(() => {
        switch (curType) {
          case 0:
            return (
              <datav.BorderBox1
                color={[curFirstColor, curSecondColor]}
                key={1 + new Date().getTime()}
              />
            );
          case 1:
            return (
              <datav.BorderBox2
                color={[curFirstColor, curSecondColor]}
                key={2 + new Date().getTime()}
              />
            );
          case 2:
            return (
              <datav.BorderBox3
                color={[curFirstColor, curSecondColor]}
                key={3 + new Date().getTime()}
              />
            );
          case 3:
            return (
              <datav.BorderBox4
                color={[curFirstColor, curSecondColor]}
                key={4 + new Date().getTime()}
              />
            );
          case 4:
            return (
              <datav.BorderBox5
                color={[curFirstColor, curSecondColor]}
                key={5 + new Date().getTime()}
              />
            );
          case 5:
            return (
              <datav.BorderBox6
                color={[curFirstColor, curSecondColor]}
                key={6 + new Date().getTime()}
              />
            );
          case 6:
            return (
              <datav.BorderBox7
                color={[curFirstColor, curSecondColor]}
                key={7 + new Date().getTime()}
              />
            );
          case 7:
            return (
              <datav.BorderBox8
                color={[curFirstColor, curSecondColor]}
                key={8 + new Date().getTime()}
              />
            );
          case 8:
            return (
              <datav.BorderBox9
                color={[curFirstColor, curSecondColor]}
                key={9 + new Date().getTime()}
              />
            );
          case 9:
            return (
              <datav.BorderBox10
                color={[curFirstColor, curSecondColor]}
                key={10 + new Date().getTime()}
              />
            );
          case 10:
            return (
              <datav.BorderBox11
                color={[curFirstColor, curSecondColor]}
                key={11 + new Date().getTime()}
              />
            );
          case 11:
            return (
              <datav.BorderBox12
                color={[curFirstColor, curSecondColor]}
                key={12 + new Date().getTime()}
              />
            );
          case 12:
            return (
              <datav.BorderBox13
                color={[curFirstColor, curSecondColor]}
                key={13 + new Date().getTime()}
              />
            );
          default:
            return (
              <datav.BorderBox1
                color={[curFirstColor, curSecondColor]}
                key={1 + new Date().getTime()}
              />
            );
        }
      })()}
    </Wrap>
  );
};
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .wrap-form {
    padding: 4px;
    margin-bottom: 4px;
    background-color: ${G20};
  }
`;
