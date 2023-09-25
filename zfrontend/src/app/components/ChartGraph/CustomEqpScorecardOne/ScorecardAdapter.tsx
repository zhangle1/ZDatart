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
    bg,
  }) => {
    const ssp = e => {
      e.stopPropagation();
    };
    console.log('nameConfig:' + JSON.stringify(nameConfig?.font));
    console.log('suffixConfig:' + JSON.stringify(suffixConfig?.font));
    var chainColor = '#11FF00';
    var chainIconBg = downIcon;

    if (chainData?.[0]?.value >= 0) {
      chainColor = '#FF5D5D';
      chainIconBg = upIcon;
    }

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
        <Column>
          <ResourceIcon
            style={{
              width: '45px',
              height: '45px',
              zIndex: '555',
              right: '16px',
              bottom: '16px',
              position: 'absolute',
            }}
            bg={bg}
          ></ResourceIcon>

          <Label fontSize={'20px'} color={dataConfig?.[0]?.font?.color}>
            {data?.[0]?.name}
          </Label>

          <Row alignSelf={'flex-end'} style={{ marginTop: '12px' }}>
            <Label fontSize={'18px'} color={dataConfig?.[0]?.font?.color}>
              {data?.[0]?.value}
            </Label>
            <Label fontSize={'14px'} color={dataConfig?.[0]?.font?.color}>
              {suffixConfig?.content ?? ''}
            </Label>
          </Row>
          <Row style={{ marginTop: '12px' }}>
            <Label fontSize={'14px'} color={dataConfig?.[0]?.font?.color}>
              环比
            </Label>
            <Divder color={dataConfig?.[0]?.font?.color} height={'14px'} />
            {/* {icon} */}
            <Icon
              style={{ width: '15px', height: '15px', marginLeft: '8px' }}
              icon={chainIconBg}
            ></Icon>
            <Label fontSize={'14px'} color={chainColor} marginLeft={'4px'}>
              {chainData?.[0]?.value}%{' '}
            </Label>
          </Row>
        </Column>
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

const Column = styled.div<{}>`
  display: flex;
  position: absolute;

  flex-direction: column;
  width: 100%;
  height: 100%;
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
  width: 100%;
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
  width: 2px;
  height: ${p => p.height};
  background-color: ${p => p.color};
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
