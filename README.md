# Dogma Meta (Server)

**Dogma Meta** is a cross-platform, non-anonymous, privacy-oriented decentralized communication platform written in TypeScript.

## About package

This package is a part of **Dogma Meta** Application, which is currently in active development. **Dogma Meta** (Server) is a standalone app to run on a server without GUI, like a web service. You can control basic functions via Websocket (Socket.IO) API.

## You can use **Dogma Meta** platform to:

- Build private networks through secure e2e-encrypted connections between own nodes and nodes of your friends.
- Communicate with friends with text, voice or video chats.
- Send and receive files between connected nodes.
- Synchronize important data between own nodes to keep it safe.

## Inspired by:

- Retroshare
- Syncthing
- Tox
- Tor

## Installation

```
git clone https://github.com/Dogma-Project/dogma-meta-server-js
cd dogma-meta-server-js
npm install
npm run build
```

## Configuration

1. Copy .env.default file without ".default" part in name;
2. Uncomment and set some needed params.

## Usage

```
npm run start
```

## Credits

Author: rotegott <rotegott@dogma-project.org>\
[Official page](https://meta.dogma-project.org/)

## License

MIT License

Copyright (c) 2021 Dogma Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
