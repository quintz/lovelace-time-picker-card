import { Direction } from '../types';

/**
 * Represents the date part (day / month / year) of a datetime.
 * Stepping the day uses native Date arithmetic, so month and year
 * boundaries roll over correctly (e.g. Jan 31 -> Feb 1).
 */
export class Day {
  constructor(private _date: Date) {}

  /**
   * Value formatted for the input_datetime.set_datetime service: YYYY-MM-DD
   */
  get value(): string {
    const year = this._date.getFullYear();
    const month = (this._date.getMonth() + 1).toString().padStart(2, '0');
    const day = this._date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get date(): Date {
    return this._date;
  }

  stepUpdate(direction: Direction, step = 1): void {
    const delta = direction === Direction.UP ? step : -step;
    this._date.setDate(this._date.getDate() + delta);
  }

  /**
   * Human readable, locale-aware label - e.g. "Sa., 04.07.2026"
   */
  toString(locale = 'en'): string {
    return this._date.toLocaleDateString(locale, {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
