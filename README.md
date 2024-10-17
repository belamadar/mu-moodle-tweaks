# Moodle Tweaks Userscript

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Supported-brightgreen)](https://www.tampermonkey.net/)
[![GitHub release](https://img.shields.io/github/v/release/belamadar/mu-moodle-tweaks)](https://github.com/belamadar/mu-moodle-tweaks/releases)
[![GitHub issues](https://img.shields.io/github/issues/belamadar/mu-moodle-tweaks)](https://github.com/belamadar/mu-moodle-tweaks/issues)

A lightweight userscript to improve the usability and aesthetics of the Moodle interface at Maynooth University. This script provides features like hiding timeline items, marking tasks as done, and various UI tweaks to make your Moodle experience smoother.

## Features

- **Mark as Done**: Keep track of completed tasks by marking them as done.
- **Improved Navigation**: Simplified buttons and dropdowns for easier interaction.
- **Better UI**: Clean up large headers, remove redundant images, and streamline the overall interface.

## Planned Features

- [x] Remove large header from Moodle pages
- [x] Remove course images and adjust card layout
- [x] Make the navigation take up less space
- [ ] Hide unnecessary timeline items
- [ ] Mark tasks as done and store state
- [ ] Sync "Mark as done" state across devices using Google Drive
- [ ] Add the ability to set custom deadlines for assignments

## Installation

1. **Install Tampermonkey**:
   - [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Tampermonkey for Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

2. **Install the Script**:
   - Go to the [Moodle Tweaks Userscript GitHub page](https://github.com/belamadar/mu-moodle-tweaks).
   - Click on the `Moodle-Tweaks.user.js` file.
   - Click on the "Raw" button and Tampermonkey should prompt you to install the script.

## Usage

Once installed, the userscript will automatically apply the following enhancements to the Moodle interface:

- **Hide or Mark Timeline Items**: Hide irrelevant tasks or mark tasks as done with dropdown options on each timeline item.
- **UI Cleanup**: Improved navigation and a cleaner, simpler design.
- **Persistent Changes**: The script uses `localStorage` to remember your settings and "Mark as done" actions across sessions.

## Contributing

Feel free to contribute by submitting issues or opening pull requests. To contribute:

1. Fork this repository.
2. Create a new branch for your feature or bugfix.
3. Push your changes and submit a pull request.

## Issues & Support

If you encounter any bugs or have feature requests, please open an issue on the [GitHub Issues page](https://github.com/belamadar/mu-moodle-tweaks/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/belamadar/mu-moodle-tweaks/blob/main/LICENSE) file for details.
