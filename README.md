# CustomRP
CustomRP is a simple program built in Node.js and [Electron](https://electronjs.org) using [DiscordCustomRP](https://github.com/scripthubteam/DiscordCustomRP) library.

![](https://cdn.discordapp.com/attachments/163157006432206849/475896243109756938/unknown.png)

![](https://cdn.discordapp.com/attachments/163157006432206849/475896434709889026/unknown.png)

## Installation

### Release
- Go to [Releases](https://github.com/Nakido/CustomRP/releases) and download the most recent build.
- Unzip it.
- Open folder `DiscordCustomRP-win32-ia32` and execute `DiscordCustomRP`.

### Node.js
- Clone this repository `https://github.com/Nakido/CustomRP.git`.
- Open `CustomRP` folder.
- Do `npm install` to install needed libraries.
- Start with `npm start`.

## Usage

- **Details:** First field text.
- **State:** Second field text.
- **Save:** Save `Details` and `State` text.
- **Run:** Start Rich Presence.
- **Advanced Options:** Show `ClientID` and `Image` fields.
  - **ClientID:** App ID, get one here: https://discordapp.com/developers/applications/me
  - **Image:** Image key from RP Assets.
- **Default:** Revert fields to default values.
- **Restart:** Restart the app and stops Rich Presence.
- **Exit:** Completely closes the app.

> Special thanks to DrBlastula#0736 for helping me with listeners and JSON reading issues and [Devsaider](https://github.com/MrDevsaider) for making DiscordCustomRP.

## Changelog

- `1.0.0` Initial release
    - `1.2.0` Added new fuctions and minor fixes
    - `1.3.0` Updated [DiscordCustomRP](https://github.com/scripthubteam/DiscordCustomRP) to 2.0.0