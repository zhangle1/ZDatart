import { BackgroundConfig } from 'app/pages/DashBoardPage/pages/Board/slice/types';
import { FontStyle } from '../../../types/ChartConfig';

interface FontConfig {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontStyle: string;
  fontWeight: string;
  lineHeight: number;
}
export interface CardConfig {
  rowNumber: string | number;
}

export interface GridCardConfig {
  cardConfig: CardConfig;
  dataConfig: FontConfig;
  bg: BackgroundConfig;
  nameConfig: {
    show: boolean;
    font: FontConfig;
    position: string;
    alignment: string;
  };
  suffixConfig: SuffixConfig;

  padding: string;
  context: {
    width: number;
    height: number;
  };
  width: number;
  data: GridCardItemInfo[];
  background: string;
  event: {
    [eventName: string]: (value: any) => void;
  }[];
}

export interface CardGridProp {
  padding: string | number;
  rowNumber: string | number;
}

export interface CardProp {
  bg: any
}

export interface CardHeaderProp {
  color: string;
}

export interface CardHeaderRightProp{
  color: string;
}

export interface AggregateBoxProp {
  position: string;
  alignment: string;
}

export interface LabelConfig {
  show: boolean;
  font: FontStyle;
  position: string;
  alignment: string;
}

export interface PaddingConfig {
  width: number;
  padding: string;
}

export interface SuffixConfig {
  show: boolean;
  font: FontStyle;
  content: string;
}

export interface GridCardItemData {
  name: string;
  value: string;
}

export interface GridCardItemInfo {
  item: GridCardItemData[];
  header: GridCardItemData;
  status: GridCardItemData;
}
