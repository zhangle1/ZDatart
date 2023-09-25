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

export interface ScorecardConfig {
  chainConfig: FontConfig;
  dataConfig: FontConfig;
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
  data: {
    name: string;
    value: number | string;
  };
  chainData: {
    name: string;
    value: number | string;
  };
  background: string;
  bg: BackgroundConfig;

  event: {
    [eventName: string]: (value: any) => void;
  }[];
}

export interface ScorecardBoxProp {
  padding: string | number;
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
