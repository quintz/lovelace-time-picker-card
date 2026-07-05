# Time Picker Card (with Date Picker)

[![HACS][hacs-shield]][hacs-link]
[![Downloads][downloads-shield]][downloads-link]
[![GitHub Release][releases-shield]][releases-link]
[![CI][ci-shield]][ci-link]
[![Project Maintenance][maintenance-shield]][maintenance-link]
[![License][license-shield]][license-link]

> **Note:** This is a fork of [GeorgeSG/lovelace-time-picker-card](https://github.com/GeorgeSG/lovelace-time-picker-card) that adds a **date picker row** for `input_datetime` entities that have both date and time.

## Overview

This is a Time Picker Card for [Home Assistant](https://www.home-assistant.io/)'s [Lovelace UI](https://www.home-assistant.io/lovelace).

Requires an [Input Datetime](https://www.home-assistant.io/integrations/input_datetime/) that has time (`has_time: true`).

If the entity also has a date (`has_date: true`), the card automatically shows a date row below the time controls:

```
        ▲         ▲
       07    :   30
        ▼         ▼

   ◀  Sun, 07/05/2026  ▶
```

- The **◀ / ▶ arrows** step the date one day back / forward. Month and year boundaries roll over correctly (e.g. Jan 31 → Feb 1).
- The date label is formatted according to your Home Assistant language setting.
- Date and time are written to the entity together via `input_datetime.set_datetime`.
- The date row can be hidden with `hide: date: true` (see [Hide Object](#hide-object)).

## Installation

### HACS (custom repository)

This fork is not in the HACS default store. Add it as a custom repository instead:

1. In HACS, open the **⋮ menu → Custom repositories**.
2. Add `https://github.com/quintz/lovelace-time-picker-card` with type **Dashboard**.
3. Install **Time Picker Card** from HACS and add the resource to your config:

```yaml
resources:
  - url: /hacsfiles/lovelace-time-picker-card/time-picker-card.js
    type: module
```

> **Heads-up:** If you previously installed the original card via HACS, uninstall it first (or remove its resource entry) so the two versions don't conflict.

### Manual

Download `time-picker-card.js` from the [latest release](https://github.com/quintz/lovelace-time-picker-card/releases/latest) of this fork (or build it yourself, see [Development](#development)) and place it in your `config/www` folder. Add the following to your config:

```yaml
resources:
  - url: /local/time-picker-card.js
    type: module
```

After replacing an existing version, force-reload your browser (Ctrl+F5) or clear the frontend cache in the companion app.

## Usage

### Visual Editor

Time Picker Card supports Lovelace's Visual Editor. Click the + button to add a card and search for time picker.

![Visual Editor](https://raw.githubusercontent.com/GeorgeSG/lovelace-time-picker-card/master/examples/visual_editor.png)

## Examples

### Default config - card name shown, 24 hour mode

![Default theme with card name](https://raw.githubusercontent.com/GeorgeSG/lovelace-time-picker-card/master/examples/default_with_name.png)

```yaml
type: 'custom:time-picker-card'
entity: input_datetime.alarm_time
```

### Date and time picker - entity with `has_date: true` and `has_time: true`

The date row appears automatically when the entity has a date. Useful for things like departure times that may be today or on a future day:

```yaml
type: 'custom:time-picker-card'
entity: input_datetime.car_departure
name: Abfahrtszeit Auto
minute_step: 15
```

To use such an entity but only control its time, hide the date row:

```yaml
type: 'custom:time-picker-card'
entity: input_datetime.car_departure
hide:
  date: true
```

### Custom config - hidden card name, 12 hour mode

![Default theme with no card name](https://raw.githubusercontent.com/GeorgeSG/lovelace-time-picker-card/master/examples/default_without_name.png)

```yaml
type: 'custom:time-picker-card'
entity: input_datetime.alarm_time
hour_mode: 12
hide:
  name: true
```

### Custom config - hidden card name, 12 hour mode with a "single" hour mode picker

![Default theme with single hour mode](https://raw.githubusercontent.com/GeorgeSG/lovelace-time-picker-card/master/examples/single_hour_mode.png)

```yaml
type: 'custom:time-picker-card'
entity: input_datetime.alarm_time
hour_mode: 12
layout:
  hour_mode: single
  align_controls: right
hide:
  name: true
```

### Custom config - card name inside card and controls aligned right

![Default theme with single hour mode](https://raw.githubusercontent.com/GeorgeSG/lovelace-time-picker-card/master/examples/name_inside.png)

```yaml
type: 'custom:time-picker-card'
entity: input_datetime.alarm_time
layout:
  name: inside
  align_controls: center
```

### Dark theme, embedded layout

![Dark theme embedded](https://raw.githubusercontent.com/GeorgeSG/lovelace-time-picker-card/master/examples/dark_embedded.png)

### Dark theme, thin layout

![Dark theme thin layout](https://raw.githubusercontent.com/GeorgeSG/lovelace-time-picker-card/master/examples/dark_thin.png)

### With a custom lovelace theme

![Custom theme](https://raw.githubusercontent.com/GeorgeSG/lovelace-time-picker-card/master/examples/custom.png)

## Options

| Name              | Type         | Requirement  | Description                                                                                               | Default                  |
| ----------------- | ------------ | ------------ | --------------------------------------------------------------------------------------------------------- | ------------------------ |
| type              | string       | **Required** | `custom:time-picker-card`                                                                                 |                          |
| entity            | string       | **Required** | [Input Datetime](https://www.home-assistant.io/integrations/input_datetime/) entity with `has_time: true`. If the entity also has `has_date: true`, a date picker row is shown |                          |
| name              | string       | **Optional** | Card name                                                                                                 | Entity's `friendly_name` |
| link_values       | boolean      | **Optional** | If enabled, will change hour when minutes overflow. E.g. will go from 11:55 to 12:00, instead of 11:00    | `false`                  |
| hour_mode         | `12` or `24` | **Optional** | Hour format. If `12`, card will show AM/PM picker                                                         | `24`                     |
| hour_step         | number       | **Optional** | Hour change when clicking arrows                                                                          | `1`                      |
| minute_step       | number       | **Optional** | Minute change when clicking arrows                                                                        | `5`                      |
| delay             | number       | **Optional** | Delay in ms before updating entity                                                                        | `0`                      |
| layout            | object       | **Optional** | Card Layout configuration                                                                                 | `none`                   |
| hide              | object       | **Optional** | Hide object                                                                                               | `none`                   |
| tap_action        | action       | **Optional** | Home assistant action to perform on tap                                                                   | `more-info`              |
| double_tap_action | action       | **Optional** | Home assistant action to perform on tap                                                                   | `more-info`              |
| hold_action       | action       | **Optional** | Home assistant action to perform on tap                                                                   | `more-info`              |

### Layout Object

| Name           | Value                     | Requirement  | Description                                                                                        | Default  |
| -------------- | ------------------------- | ------------ | -------------------------------------------------------------------------------------------------- | -------- |
| hour_mode      | `single`, `double`        | **Optional** | Whether to show both AM/PM or just the current mode. In `single` mode, tap the value to change it. | `double` |
| align_controls | `left`, `center`, `right` | **Optional** | Horizontal alignment of the controls                                                               | `center` |
| name           | `header`, `inside`        | **Optional** | Whether to show the name as a header or inside the card                                            | `header` |
| embedded       | boolean                   | **Optional** | Render with embedded style - disables padding, box shadow, and card header                         | `false`  |
| thin           | boolean                   | **Optional** | Render with reduced paddings                                                                       | `false`  |

### Hide Object

| Name    | Type    | Requirement  | Description                                       | Default |
| ------- | ------- | ------------ | ------------------------------------------------- | ------- |
| name    | boolean | **Optional** | Hides the card name                               | `false` |
| icon    | boolean | **Optional** | Hides the card icon (only with controls "inside") | `false` |
| seconds | boolean | **Optional** | Hides seconds input                               | `true`  |
| date    | boolean | **Optional** | Hides the date row (only relevant for entities with `has_date: true`) | `false` |

### Theme Variables

Time Picker Card will automatically pick up colors from your lovelace theme, but if you want to customize some of them,
you can use the following variables in your theme's config file:

| Name                                  | Default                        | Description                                                                                          |
| ------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| time-picker-elements-background-color | `var(--primary-color)`         | Background color for header and inputs                                                               |
| time-picker-icon-color                | `var(--primary-text-color)`    | Arrow color                                                                                          |
| time-picker-text-color                | `white`                        | Text color                                                                                           |
| time-picker-accent-color              | `var(--primary-color)`         | AM / PM active color                                                                                 |
| time-picker-off-color                 | `var(--disabled-text-color)`   | AM / PM inactive color                                                                               |
| time-picker-border-radius             | `var(--ha-card-border-radius)` | Border radius of the card                                                                            |
| time-picker-control-padding           | `8px`                          | Padding for interactive elements. Increase for larger hitboxes of the controls. Example: `10px 12px` |

The date row uses the same variables as the time inputs (`time-picker-elements-background-color`, `time-picker-text-color`, `time-picker-icon-color`, `time-picker-control-padding`).

## Development

```bash
npm install
npm run build   # lint + bundle to dist/time-picker-card.js
npm test        # run unit tests
```

## Meta

Fork maintained by [quintz](https://github.com/quintz) — adds the date picker feature.

Original card by **Georgi Gardev**:

- [gar.dev](https://gar.dev)
- [![GitHub][github-icon]][github-link] [GeorgeSG][github-link]
- [![Twitter][twitter-icon]][twitter-link] [@georgesg92][twitter-link]

[hacs-shield]: https://img.shields.io/badge/HACS-Custom-orange.svg
[hacs-link]: https://github.com/hacs/integration
[downloads-shield]: https://img.shields.io/github/downloads/quintz/lovelace-time-picker-card/latest/total?color=brightgreen&logo=github
[downloads-link]: https://github.com/quintz/lovelace-time-picker-card/releases
[releases-shield]: https://img.shields.io/github/release/quintz/lovelace-time-picker-card.svg
[releases-link]: https://github.com/quintz/lovelace-time-picker-card/releases
[ci-shield]: https://img.shields.io/github/actions/workflow/status/quintz/lovelace-time-picker-card/ci.yaml?label=CI&logo=github
[ci-link]: https://github.com/quintz/lovelace-time-picker-card/actions
[maintenance-shield]: https://img.shields.io/maintenance/yes/2026.svg
[maintenance-link]: https://github.com/quintz/lovelace-time-picker-card
[license-shield]: https://img.shields.io/github/license/quintz/lovelace-time-picker-card?color=brightgreen
[license-link]: https://github.com/quintz/lovelace-time-picker-card/blob/master/LICENSE
[github-icon]: http://i.imgur.com/9I6NRUm.png
[github-link]: https://github.com/GeorgeSG/
[twitter-icon]: http://i.imgur.com/wWzX9uB.png
[twitter-link]: https://twitter.com/georgesg92