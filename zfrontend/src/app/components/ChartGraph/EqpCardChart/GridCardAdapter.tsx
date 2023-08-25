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
import { Liquid, Progress } from '@ant-design/plots';
import eqpRunBg from 'app/assets/images/eqp_bg_run.png';
import eqpRunStandy from 'app/assets/images/eqp_bg_standy.png';
import Icon from 'app/assets/images/gold_icon.png';
import { EmptyFiller } from 'app/components/EmptyFiller';
import { FC, memo } from 'react';
import styled from 'styled-components/macro';
import { CardGridProp, CardHeaderProp, GridCardConfig } from './types';

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
    var existItem = data?.[0];
    var color = '#078CFF';
    var icon = eqpRunBg;

    var config = {
      fontSize: '8',
      percent: 0.7,

      wave: {
        length: 38,
      },
      // color:'white'
    };
    var processConfig = {
      height: 50,
      // width: 100,
      autoFit: true,
      percent: 0.7,
      color: ['#078CFF', '#E8EDF3'],
    };
    // var config = ;

    if (existItem) {
      if (existItem.status.value !== '运行') {
        color = '#FD962E ';
        icon = eqpRunStandy;
      }
      if (Number(existItem.planQty?.value) > 0) {
        config.percent =
          Number(existItem.currentQty?.value) /
          1.0 /
          Number(existItem.planQty?.value);

        processConfig.percent =
          Number(existItem.currentQty?.value) /
          1.0 /
          Number(existItem.planQty?.value);
      } else {
        config.percent = 0;
        processConfig.percent = 0;
      }
    }

    return data?.length > 0 ? (
      <EqpCard
        rowNumber={cardConfig?.rowNumber ?? 5}
        padding={padding}
        onClick={ssp}
        style={{ background }}
      >
        <CardHeader color="blue" icon={icon}>
          <div>{existItem.header.value}</div>
          <div style={{ color: color }}>{existItem.status.value}</div>
        </CardHeader>
        <CardGrid>
          {existItem.item.map((src, index) => {
            var gridColumn = 'span 1';
            if (
              index === existItem.item.length - 1 &&
              existItem.item.length % 2 !== 0
            ) {
              // isOdd
              gridColumn = '1 / -1';
            }
            return (
              <CardItem gridColumn={gridColumn}>
                <ItemIcon icon={Icon} width={24} height={24}></ItemIcon>
                <div>{src.name}</div>
                <div style={{ flex: '1', textAlign: 'right' }}>{src.value}</div>
              </CardItem>
            );
          })}
        </CardGrid>
        <CardRow>
          <Liquid
            {...config}
            width={100}
            height={80}
            color={'#078CFF'}
            // label={{style:{fill:'white'}}}
            theme={'light'}
            statistic={{
              content: { style: { color: 'white', fontSize: '22' } },
            }}
          ></Liquid>
          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              color: 'white',
              fontFamily: 'YouSheBiaoTiHei-Regular, YouSheBiaoTiHei',
              fontSize: '22px',
              justifyContent:'start',
              height: '100%',
            }}
          >
            <div style={{ display: 'flex'  }}>完成数量</div>
            <Progress {...processConfig}></Progress>
            <div style={{ display: 'flex',width:'100%', justifyContent:'space-between'  }}>
              <div>计划数量:{existItem.planQty?.value}</div>
              <div>完成数量:{existItem.currentQty?.value}</div>

            </div>

          </div>
        </CardRow>
      </EqpCard>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <EmptyFiller></EmptyFiller>
      </div>
    );
  },
);
export default GridCardAdapter;

const CardRow = styled.div<{}>`
  display: flex;
  height: 120px;
  width: 100%;
  /* background: white; */
  margin-top: 12px;
  align-items: center;
`;

const EqpCard = styled.div<CardGridProp>`
  /* display: flex; */
  /* flex-direction: column;
  align-items: center;
  justify-content: center; */
  width: 100%;
  min-width: 0;
  min-height: 0;
  /* padding: ${p => p.padding}; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: start;
  position: absolute;
  overflow: hidden;
`;

const CardHeader = styled.div<CardHeaderProp>`
  display: flex;
  width: 100%;
  /* height: 20px; */
  font-size: 23px;
  color: white;
  align-items: center;
  background: url(${p => p.icon}) center center / 100% 100% no-repeat;
  width: 370px;
  height: 62px;
  align-items: center;
  padding-left: 80px;
  padding-right: 70px;
  /* background-color: ${p => p.color ?? '#45b97c'}; */
  justify-content: space-between;
  font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
`;

const ItemIcon = styled.div<{
  icon: any;
  width: any;
  height: any;
}>`
  background: url(${p => p.icon}) center center / 100% 100% no-repeat;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  margin-right: 12px;
`;

const CardGrid = styled.div<{}>`
  width: 100%;
  min-width: 0;
  min-height: 0;
  display: grid;
  align-items: start;
  justify-items: start;
  grid-gap: 10px;
  margin-top: 16px;
  grid-template-columns: repeat(2, 1fr); /* 三列 */
`;
// height: '50px', color: 'white' ,background:'white',
//           gridColumn:'span 1',width:'100%'
const CardItem = styled.div<{ gridColumn: string }>`
  height: 50px;
  color: white;
  background: rgba(0, 33, 143, 0.5);
  width: 100%;
  grid-column: ${p => p.gridColumn};
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
`;
