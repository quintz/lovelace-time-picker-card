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
  date?: TimePickerDateConfig;
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

/** CSS length as string ('-15px', '2em') or number (interpreted as px, e.g. from a slider) */
export type CssLength = string | number;

/** CSS color as string ('transparent', 'var(--x)') or [r, g, b] array (from the color picker) */
export type CssColor = string | number[];

export type DateFormat = 'short' | 'long';

export interface TimePickerDateConfig {
  show_weekday?: boolean;
  format?: DateFormat;
  day_step?: number;
  locale?: string;
}

export interface TimePickerLabelConfig {
  text?: string;
  secondary?: string;
  position?: LabelPosition;
  overlay?: boolean;
  offset_x?: CssLength;
  offset_y?: CssLength;
}

export interface TimePickerStyleConfig {
  background?: CssColor;
  text_color?: CssColor;
  icon_color?: CssColor;
  time_font_size?: string;
  time_input_width?: string;
  date_font_size?: string;
  label_color?: CssColor;
  label_font_size?: string;
  secondary_label_color?: CssColor;
  secondary_label_font_size?: string;
  font_family?: string;
  time_input_margin?: string;
  picker_offset_x?: CssLength;
  picker_offset_y?: CssLength;
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
