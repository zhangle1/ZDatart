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

import eqpSheBei from 'app/assets/images/eqp_shebei.png';
import eqpHeader from 'app/assets/images/gold_header.png';
import eqpHeaderIcon from 'app/assets/images/gold_icon.png';
import eqpItemBack from 'app/assets/images/gold_item_back.png';
import { FC, memo } from 'react';
import styled from 'styled-components/macro';
import {
  CardGridProp,
  CardHeaderProp,
  CardHeaderRightProp,
  CardProp,
  GridCardConfig,
} from './types';

const GridCardAdapter: FC<GridCardConfig> = memo(
  ({
    dataConfig,
    nameConfig,
    padding,
    data,
    background,
    event,
    suffixConfig,
    cardConfig,
  }) => {
    const ssp = e => {
      e.stopPropagation();
    };

    return (
      <CardGrid
        rowNumber={cardConfig?.rowNumber ?? 5}
        padding={padding}
        onClick={ssp}
        style={{ background }}
      >
        {data?.map(src => {
          var color = '#45b97c';
          if (src.status.value === '停机' || src.status.value === '关机') {
            color = '#6f6d85';
          }
          if (src.status.value === '待机') {
            color = '#FFAA00';
          }
          return (
            <Card>
              <CardHeader color={color}>
                <CardHeaderLeftTitle>
                  <CardLeftIcon></CardLeftIcon>
                  <div
                    style={{ marginLeft: '8px' }}
                  >{`${src.header.value}`}</div>
                </CardHeaderLeftTitle>
                <CardHeaderRight
                  color={color}
                >{`${src.status.value}`}</CardHeaderRight>
              </CardHeader>
              <CardItemContainer>
                <CardItemLeftContainer>
                  {src.item.map(item => {
                    return (
                      <CardItem>
                        <CardItemLeftTitle>{item.name}</CardItemLeftTitle>
                        <CardItemRight>{item.value}</CardItemRight>
                      </CardItem>
                    );
                  })}
                </CardItemLeftContainer>
                <CardItemRightContainer></CardItemRightContainer>
              </CardItemContainer>
            </Card>
          );
        })}
      </CardGrid>
    );
  },
);
export default GridCardAdapter;

const CardGrid = styled.div<CardGridProp>`
  /* display: flex; */
  /* flex-direction: column;
  align-items: center;
  justify-content: center; */
  width: 100%;
  min-width: 0;
  min-height: 0;
  /* padding: ${p => p.padding}; */
  display: grid;
  grid-template-columns: ${p => `repeat(${p.rowNumber ?? 6}, 1fr)`};
  grid-column-gap: 0px;
  align-items: start;
  justify-items: start;
  position: absolute;
  overflow: hidden;
  grid-row-gap: 10px; /* 设置间距为 10px */
`;

const Card = styled.div<CardProp>`
  position: relative;
  width: 90%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  /* padding: 5%; */
  /* border-radius: 20px; */
  /* border: 5px solid white; */
  /* border-style: 'solid'; */
  background-color: black;
  padding-bottom: 8px;
`;

const CardHeader = styled.div<CardHeaderProp>`
  display: flex;
  width: 100%;
  /* height: 20px; */
  font-size: 16px;
  color: white;
  align-items: center;
  background: url(${eqpHeader}) center center / 100% 100% no-repeat;

  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  /* background-color: ${p => p.color ?? '#45b97c'}; */
  padding-bottom: 32px;
`;

const CardHeaderLeftTitle = styled.div`
  flex: 1;
  color: #d0deee;
  display: flex;
  align-items: center;
  font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
`;

const CardLeftIcon = styled.div`
  background: url(${eqpHeaderIcon}) center center / 100% 100% no-repeat;
  width: 20px;
  height: 20px;
`;

const CardHeaderRight = styled.div<CardHeaderRightProp>`
  background: rgba(0, 255, 76, 0.1);
  border-radius: 12px;
  opacity: 1;
  color: ${p => p.color ?? '#45b97c'};
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid #00ff4c;
  border: ${p =>
    p.color != null ? `1px solid ${p.color}` : '1px solid #00ff4c'};
  background-color: ${p => (p.color != null ? p.color + '44' : '#45b97c44')};
  font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
`;

const CardItem = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  font-size: 16px;
  color: white;
  padding-left: 12px;
  padding-right: 8px;
  padding-bottom: 8px;
  padding-top: 8px;
  background: url(${eqpItemBack}) center center / 100% 100% no-repeat;
`;

const CardItemLeftTitle = styled.div`
  flex: 1;
`;

const CardItemRight = styled.div``;

const CardItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
`;

const CardItemLeftContainer = styled.div`
  width: 60%;
`;

const CardItemRightContainer = styled.div`
  width: 39%;
  background: url(${eqpSheBei}) center center / 100% 100% no-repeat;
  height: 100px;
`;
