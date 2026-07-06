import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TimePickerCardConfig } from './types';

const NAME_TO_LABEL_MAP = {
  entity: 'input_datetime entity id',
  name: 'Name',
  hour_step: 'Hour step',
  minute_step: 'Minute step',
  hour_mode: 'Hour mode',
  link_values: 'Link values',
  align_controls: 'Align controls',
  embedded: 'Embedded?',
  thin: 'Thin layout?',
  icon: 'Icon',
  seconds: 'Seconds',
  date: 'Date',
  text: 'Label text',
  secondary: 'Secondary text (small)',
  position: 'Position',
  background: 'Background (CSS value)',
  text_color: 'Time/date text color',
  icon_color: 'Arrow color',
  time_font_size: 'Time font size',
  time_input_width: 'Time input width',
  date_font_size: 'Date font size',
  label_color: 'Label color',
  label_font_size: 'Label font size',
  secondary_label_color: 'Secondary label color',
  secondary_label_font_size: 'Secondary label font size',
  font_family: 'Font family',
  time_input_margin: 'Time input margin',
  offset_x: 'Offset X (e.g. 40px)',
  offset_y: 'Offset Y (e.g. -8px)',
};

const SCHEMA = [
  { name: 'entity', selector: { entity: { domain: 'input_datetime' } } },
  {
    name: 'name',
    selector: { text: {} },
  },
  {
    type: 'grid',
    schema: [
      {
        name: 'hour_step',
        type: 'integer',
        required: true,
        default: 1,
        valueMin: 1,
        valueMax: 24,
      },
      {
        name: 'minute_step',
        type: 'integer',
        required: true,
        default: 5,
        valueMin: 1,
        valueMax: 60,
      },
      {
        name: 'hour_mode',
        type: 'select',
        options: [
          [12, '12'],
          [24, '24'],
        ],
      },
      { name: 'link_values', type: 'boolean' },
    ],
  },
  {
    type: 'expandable',
    name: 'layout',
    title: 'Layout controls',
    schema: [
      {
        name: 'hour_mode',
        type: 'select',
        options: [
          ['single', 'single'],
          ['double', 'double'],
        ],
      },
      {
        name: 'align_controls',
        type: 'select',
        options: [
          ['left', 'left'],
          ['center', 'center'],
          ['right', 'right'],
        ],
      },
      {
        name: 'name',
        type: 'select',
        options: [
          ['header', 'header'],
          ['inside', 'inside'],
        ],
      },
      { name: 'embedded', type: 'boolean' },
      { name: 'thin', type: 'boolean' },
    ],
  },
  {
    type: 'expandable',
    name: 'hide',
    title: 'Hide controls',
    schema: [
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'name', type: 'boolean' },
          { name: 'icon', type: 'boolean' },
          { name: 'seconds', type: 'boolean' },
          { name: 'date', type: 'boolean' },
        ],
      },
    ],
  },
  {
    type: 'expandable',
    name: 'label',
    title: 'Label (free text next to the picker)',
    schema: [
      { name: 'text', selector: { text: {} } },
      { name: 'secondary', selector: { text: {} } },
      {
        name: 'position',
        type: 'select',
        options: [
          ['left', 'left'],
          ['right', 'right'],
          ['top', 'top'],
          ['bottom', 'bottom'],
        ],
      },
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'offset_x', selector: { text: {} } },
          { name: 'offset_y', selector: { text: {} } },
        ],
      },
    ],
  },
  {
    type: 'expandable',
    name: 'style',
    title: 'Styling',
    schema: [
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'background', selector: { text: {} } },
          { name: 'text_color', selector: { text: {} } },
          { name: 'icon_color', selector: { text: {} } },
          { name: 'time_font_size', selector: { text: {} } },
          { name: 'time_input_width', selector: { text: {} } },
          { name: 'date_font_size', selector: { text: {} } },
          { name: 'label_color', selector: { text: {} } },
          { name: 'label_font_size', selector: { text: {} } },
          { name: 'secondary_label_color', selector: { text: {} } },
          { name: 'secondary_label_font_size', selector: { text: {} } },
          { name: 'font_family', selector: { text: {} } },
          { name: 'time_input_margin', selector: { text: {} } },
        ],
      },
    ],
  },
  {
    type: 'expandable',
    title: 'Actions',
    schema: [
      { name: 'tap_action', selector: { action: {} } },
      { name: 'double_tap_action', selector: { action: {} } },
      { name: 'hold_action', selector: { action: {} } },
    ],
  },
];

@customElement('time-picker-card-editor')
export class TimePickerCardEditor extends LitElement implements LovelaceCardEditor {
  private static readonly CONFIG_CHANGED_EVENT = 'config-changed';

  @property({ type: Object }) hass!: HomeAssistant;
  @property() private config!: TimePickerCardConfig;

  private computeLabel({ name }): string {
    return NAME_TO_LABEL_MAP[name] || name;
  }

  private valueChanged(ev: CustomEvent): void {
    const newConfig = { ...this.config, ...ev.detail.value };
    this.dispatch(newConfig);
  }

  render(): TemplateResult {
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${SCHEMA}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }

  setConfig(config): void {
    this.config = config;
  }

  private dispatch(config: TimePickerCardConfig): void {
    const event = new CustomEvent(TimePickerCardEditor.CONFIG_CHANGED_EVENT, {
      bubbles: true,
      composed: true,
      detail: { config },
    });

    this.dispatchEvent(event);
  }
}
