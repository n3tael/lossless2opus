# lossless2opus

Website to convert FLAC to Opus locally with on-device processing.

## Developing

Once you've cloned this project and installed dependencies with `bun install`, you need to bring the wasm binaries for `opusenc`. Build the [opusenc-wasm](https://github.com/n3tael/opusenc-wasm) and place generated binaries to `src/lib/wasm`.

Then, start a development server:

```bash
bun run dev
```

## Building

To create a production version of app:

```bash
bun run build
```

You can preview the production build with `npm run preview`.

## Support

If you liked the project, consider giving it star or [make a donation](https://n3tael.eu.org/support).

## License

Copyright (C) 2025 n3tael

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, see
<https://www.gnu.org/licenses/>.