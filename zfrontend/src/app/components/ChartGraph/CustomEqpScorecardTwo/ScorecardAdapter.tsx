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

import downIcon from 'app/assets/images/icon_down.png';
import upIcon from 'app/assets/images/icon_up.png';
import { getBackgroundImage } from 'app/pages/DashBoardPage/utils';
import { FC, memo } from 'react';
import styled from 'styled-components/macro';
import { ScorecardConfig } from './types';

const ScorecardAdapter: FC<ScorecardConfig> = memo(
  ({
    dataConfig,
    chainConfig,
    nameConfig,
    padding,
    data,
    chainData,
    background,
    event,
    suffixConfig,
    dataItem,
    bg,
  }) => {
    const ssp = e => {
      e.stopPropagation();
    };
    console.log('nameConfig:' + JSON.stringify(nameConfig?.font));
    console.log('suffixConfig:' + JSON.stringify(suffixConfig?.font));

    return (
      // <ScorecardBox padding={padding} onClick={ssp} style={{ background }}>
      //   <AggregateBox
      //     alignment={nameConfig?.alignment || 'center'}
      //     position={nameConfig?.position || 'column'}
      //   >
      //     <NameWrapper>
      //       <HeaderIcon
      //         style={{
      //           width: nameConfig?.font.fontSize,
      //           height: nameConfig?.font.fontSize,
      //         }}
      //       ></HeaderIcon>

      //       {nameConfig?.show && (
      //         <NameBox style={nameConfig?.font} {...event?.[0]}>
      //           {data?.[0]?.name}
      //         </NameBox>
      //       )}
      //     </NameWrapper>
      //     <ValueWrapper>
      //       <ValueBox style={dataConfig?.[0].font} {...event?.[0]}>
      //         {data?.[0]?.value}
      //       </ValueBox>
      //     </ValueWrapper>

      //     <ValueWrapper>
      //       <ValueBox
      //         style={{
      //           ...chainConfig?.[0].font,
      //           color: 'white',
      //           marginRight: '4px',
      //         }}
      //         {...event?.[0]}
      //       >
      //         环比
      //       </ValueBox>

      //       <ValueBox
      //         style={{ ...chainConfig?.[0].font, color: chainColor }}
      //         {...event?.[0]}
      //       >
      //         {chainData?.[0]?.value}%
      //       </ValueBox>
      //       <div
      //         style={{
      //           background: chainIconBg,
      //           width: chainConfig?.[0].font.fontSize,
      //           height: chainConfig?.[0].font.fontSize,
      //         }}
      //       ></div>
      //     </ValueWrapper>
      //   </AggregateBox>
      // </ScorecardBox>
      <Stack>
        <RowWrapper>
          <ColumnWrapper>
            <Column>
              <Label fontSize={'16px'} color="#646464">
                {data?.[0]?.name}
              </Label>

              <Row style={{ marginTop: '12px' }}>
                <Label fontSize={'20px'} color="#000000">
                  {data?.[0]?.value}
                </Label>
                {/* <Label fontSize={'14px'} color={dataConfig?.[0]?.font?.color}>
                  {suffixConfig?.content ?? ''}
                </Label> */}
              </Row>
              {dataItem?.dayItem.map(item => {
                var chainColor = '#11FF00';
                var chainIconBg = downIcon;

                if (Number((item?.value+'').match(/\d+/g)?.[0]) >= 0) {
                  chainColor = '#FF5D5D';
                  chainIconBg = upIcon;
                }

                return (
                  <Row style={{ marginTop: '12px' }}>
                    <Label fontSize={'16px'} color="#AFAFAF">
                      {item?.name}
                    </Label>
                    <Divder
                      color={dataConfig?.[0]?.font?.color}
                      height={'14px'}
                    />
                    {/* {icon} */}
                    <Icon
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '8px',
                      }}
                      icon={chainIconBg}
                    ></Icon>
                    <Label
                      fontSize={'14px'}
                      color={chainColor}
                      marginLeft={'4px'}
                    >
                      {item?.value}
                    </Label>
                  </Row>
                );
              })}
            </Column>
          </ColumnWrapper>
          <DivderDash color={dataConfig?.[0]?.font?.color} height={'100%'} />

          <ColumnWrapper>
            <Column>
              <Label fontSize={'16px'} color="#646464">
                {data?.[1]?.name}
              </Label>

              <Row style={{ marginTop: '12px' }}>
                <Label fontSize={'20px'} color="#000000">
                  {data?.[1]?.value}
                </Label>
                {/* <Label fontSize={'14px'} color={dataConfig?.[0]?.font?.color}>
                  {suffixConfig?.content ?? ''}
                </Label> */}
              </Row>
              {dataItem?.monthItem?.map(item => {
                var chainColor = '#11FF00';
                var chainIconBg = downIcon;

                if (Number((item?.value+'').match(/\d+/g)?.[0]) >= 0) {
                  chainColor = '#FF5D5D';
                  chainIconBg = upIcon;
                }

                return (
                  <Row style={{ marginTop: '12px' }}>
                    <Label fontSize={'16px'} color="#AFAFAF">
                      {item?.name}
                    </Label>
                    <Divder
                      color={dataConfig?.[0]?.font?.color}
                      height={'14px'}
                    />
                    {/* {icon} */}
                    <Icon
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '8px',
                      }}
                      icon={chainIconBg}
                    ></Icon>
                    <Label
                      fontSize={'14px'}
                      color={chainColor}
                      marginLeft={'4px'}
                    >
                      {item?.value}
                    </Label>
                  </Row>
                );
              })}
            </Column>
          </ColumnWrapper>
          <DivderDash color={dataConfig?.[0]?.font?.color} height={'100%'} />

          <ColumnWrapper>
            <Column>
              <Label fontSize={'16px'} color="#646464">
                {data?.[2]?.name}
              </Label>

              <Row style={{ marginTop: '12px' }}>
                <Label fontSize={'20px'} color="#000000">
                  {data?.[2]?.value}
                </Label>
                {/* <Label fontSize={'14px'} color={dataConfig?.[0]?.font?.color}>
                  {suffixConfig?.content ?? ''}
                </Label> */}
              </Row>
              {dataItem?.yearItem?.map(item => {
                var chainColor = '#11FF00';
                var chainIconBg = downIcon;

                if (Number((item?.value+'').match(/\d+/g)?.[0]) >= 0) {
                  chainColor = '#FF5D5D';
                  chainIconBg = upIcon;
                }

                return (
                  <Row style={{ marginTop: '12px' }}>
                    <Label fontSize={'16px'} color="#AFAFAF">
                      {item?.name}
                    </Label>
                    <Divder
                      color={dataConfig?.[0]?.font?.color}
                      height={'14px'}
                    />
                    {/* {icon} */}
                    <Icon
                      style={{
                        width: '15px',
                        height: '15px',
                        marginLeft: '8px',
                      }}
                      icon={chainIconBg}
                    ></Icon>
                    <Label
                      fontSize={'14px'}
                      color={chainColor}
                      marginLeft={'4px'}
                    >
                      {item?.value}
                    </Label>
                  </Row>
                );
              })}
            </Column>
          </ColumnWrapper>
        </RowWrapper>
      </Stack>
    );
  },
);
export default ScorecardAdapter;

const Stack = styled.div<{}>`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const RowWrapper = styled.div<{}>`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  justify-content: space-between;
`;
const ColumnWrapper = styled.div<{}>`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div<{}>`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* flex: 1; */
  padding: 16px;
  border-radius: 5px;
  justify-content: space-between;
`;

const Icon = styled.div<{ icon: any }>`
  background: url(${p => p.icon}) center center / 100% 100% no-repeat;
`;

const ResourceIcon = styled.div<{ bg: any }>`
  background: ${p => getBackgroundImage(p.bg?.image)} center center / 100% 100%
    no-repeat;

  /* background-color: ${p => p.bg?.color}; */
`;

const Row = styled.div<{ alignSelf?: any }>`
  display: flex;
  align-self: ${p => p.alignSelf ?? ''};
  justify-content: start;
  align-items: end;
`;

const Label = styled.div<{
  fontSize?: any;
  color?: any;
  marginLeft?: any;
}>`
  font-size: ${p => p.fontSize};
  line-height: ${p => p.fontSize};
  color: ${p => p.color};
  margin-left: ${p => p.marginLeft};
`;

const Divder = styled.div<{
  height?: any;
  color?: any;
}>`
  margin-left: 8px;
  width: 1px;
  height: ${p => p.height};
  background-color: '#D5D5D5';
  /* border: 1px dashed #D5D5D5; */
`;

const DivderDash = styled.div<{
  height?: any;
  color?: any;
}>`
  margin-left: 8px;
  width: 1px;
  height: ${p => p.height};
  /* background-color: '#D5D5D5'; */
  border: 1px dashed #d5d5d5;
`;

// const ScorecardBox = styled.div<ScorecardBoxProp>`
//   display: flex;
//   flex-direction: column;
//   align-items: start;
//   justify-content: center;
//   width: 100%;
//   min-width: 0;
//   height: 100%;
//   min-height: 0;
//   padding: ${p => p.padding};
// `;

// const HeaderIcon = styled.div`
//   background: url(${headerIcon}) center center / 100% 100% no-repeat;
// `;

// const AggregateBox = styled.div<AggregateBoxProp>`
//   display: flex;
//   flex-direction: ${p => p.position};
//   align-items: ${p => p.alignment};
//   justify-content: start;
//   min-width: 0;
//   max-width: 100%;
//   min-height: 0;
//   max-height: 100%;
// `;

// const ValueBox = styled.div`
//   max-width: 100%;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   cursor: pointer;
// `;

// const SuffixBox = styled.div`
//   max-width: 100%;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   cursor: pointer;
// `;

// const ValueWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: start;
// `;

// const NameWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: start;
// `;

// const NameBox = styled.div`
//   max-width: 100%;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   cursor: pointer;
// `;
