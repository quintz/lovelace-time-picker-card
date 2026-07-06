import { ActionConfig, LovelaceCardConfig } from 'custom-card-helpers';

export interface TimePickerCardConfig extends LovelaceCardConfig {
  entity: string;
  name?: string;
  link_values?: boolean;
  hour_mode?: HourMode;
  hour_step?: number;
  minute_step?: number;
  second_step?: number;
  delay?: number;
  layout?: TimePickerLayoutConfig;
  hide?: TimePickerHideConfig;
  label?: TimePickerLabelConfig;
  style?: TimePickerStyleConfig;
  tap_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export type HourMode = 12 | 24 | undefined;

export interface TimePickerLayoutConfig {
  align_controls?: Layout.AlignControls;
  name?: Layout.Name;
  hour_mode?: Layout.HourMode;
  embedded?: boolean;
  thin?: boolean;
}

export namespace Layout {
  export type HourMode = 'single' | 'double';

  export enum AlignControls {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
  }

  export enum Name {
    HEADER = 'header',
    INSIDE = 'inside',
  }
}

export type LabelPosition = 'left' | 'right' | 'top' | 'bottom';

export interface TimePickerLabelConfig {
  text?: string;
  secondary?: string;
  position?: LabelPosition;
  offset_x?: string;
  offset_y?: string;
}

export interface TimePickerStyleConfig {
  background?: string;
  text_color?: string;
  icon_color?: string;
  time_font_size?: string;
  time_input_width?: string;
  date_font_size?: string;
  label_color?: string;
  label_font_size?: string;
  secondary_label_color?: string;
  secondary_label_font_size?: string;
  font_family?: string;
  time_input_margin?: string;
}

export interface TimePickerHideConfig {
  name?: boolean;
  icon?: boolean;
  seconds?: boolean;
  date?: boolean;
}

export enum Direction {
  UP = 'up',
  DOWN = 'down',
}

export enum Period {
  AM = 'AM',
  PM = 'PM',
}
