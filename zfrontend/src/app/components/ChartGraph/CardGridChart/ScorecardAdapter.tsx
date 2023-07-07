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

import { FC, memo } from 'react';
import styled from 'styled-components/macro';
import {
  CardGridProp,
  CardHeaderProp,
  CardProp,
  ScorecardConfig,
} from './types';

const ScorecardAdapter: FC<ScorecardConfig> = memo(
  ({
    dataConfig,
    nameConfig,
    padding,
    data,
    background,
    event,
    suffixConfig,
  }) => {
    const ssp = e => {
      e.stopPropagation();
    };
    var viewArr = [{}, {}, {}, {}, {}, {}, {}, {}];

    return (
      <CardGrid padding={padding} onClick={ssp} style={{ background }}>
        {viewArr.map(src => {
          return (
            <Card>
              <CardHeader>
                <CardHeaderLeftTitle>设备编码:BM489412</CardHeaderLeftTitle>
                <CardHeaderRight>停机</CardHeaderRight>
              </CardHeader>
              <Divder></Divder>
              <CardItem>
                <CardItemLeftTitle>当前生产产品</CardItemLeftTitle>
                <CardItemRight>产品1</CardItemRight>
              </CardItem>

              <CardItem>
                <CardItemLeftTitle>焊机速度:</CardItemLeftTitle>
                <CardItemRight>894</CardItemRight>
              </CardItem>

              <CardItem>
                <CardItemLeftTitle>当天生产米数</CardItemLeftTitle>
                <CardItemRight>894</CardItemRight>
              </CardItem>
            </Card>
          );
        })}
      </CardGrid>
    );
  },
);
export default ScorecardAdapter;

const CardGrid = styled.div<CardGridProp>`
  /* display: flex; */
  /* flex-direction: column;
  align-items: center;
  justify-content: center; */
  width: 100%;
  min-width: 0;
  height: 100%;
  min-height: 0;
  /* padding: ${p => p.padding}; */
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: start;
  justify-items: start;
  position: absolute;
  overflow: hidden;
`;

const Card = styled.div<CardProp>`
  position: relative;

  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 5%;
  background-color: red;
`;

const CardHeader = styled.div<CardHeaderProp>`
  display: flex;
  width: 100%;
  font-size: 16px;
  color: white;
  align-items: center;
`;

const CardHeaderLeftTitle = styled.div`
  flex: 1;
`;

const Divder = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 10px;

  width: 100%;
  height: 2px;
  background-color: black;
`;

const CardHeaderRight = styled.div``;

const CardItem = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  font-size: 16px;
  color: white;
`;

const CardItemLeftTitle = styled.div`
  flex: 1;
`;

const CardItemRight = styled.div``;
