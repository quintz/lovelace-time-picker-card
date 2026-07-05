import { css, CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Day } from '../models/day';
import { Direction } from '../types';

/**
 * Renders a date picker row: [<] Sa., 04.07.2026 [>]
 */
@customElement('date-unit')
export class DateUnitComponent extends LitElement {
  static readonly EVENT_STEP_CHANGE = 'stepChange';

  @property() private day!: Day;
  @property() private locale = 'en';

  render(): TemplateResult {
    return html`
      <div class="date-unit">
        ${this.renderStepChanger(Direction.DOWN)}
        <div class="date-label">${this.day.toString(this.locale)}</div>
        ${this.renderStepChanger(Direction.UP)}
      </div>
    `;
  }

  onStepChangerClick(direction: Direction): void {
    const event = new CustomEvent(DateUnitComponent.EVENT_STEP_CHANGE, { detail: { direction } });
    this.dispatchEvent(event);
  }

  private renderStepChanger(direction: Direction): TemplateResult {
    const icon = direction === Direction.UP ? 'right' : 'left';
    return html`
      <div class="date-picker-icon" @click=${() => this.onStepChangerClick(direction)}>
        <ha-icon .icon="hass:chevron-${icon}"></ha-icon>
        <mwc-ripple id="ripple"></mwc-ripple>
      </div>
    `;
  }

  static get styles(): CSSResult {
    return css`
      .date-unit {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      .date-picker-icon {
        padding: var(--tpc-control-padding);
        text-align: center;
        cursor: pointer;
        color: var(--tpc-icon-color);
      }

      .date-label {
        min-width: 140px;
        padding: var(--tpc-control-padding);
        background: var(--tpc-elements-background-color);
        border-bottom: 2px solid var(--tpc-elements-background-color);
        color: var(--tpc-text-color, #fff);
        text-align: center;
        font-size: 1em;
        user-select: none;
      }
    `;
  }
}
