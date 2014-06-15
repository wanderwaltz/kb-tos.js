kb-tos.js
=========

Known Issues
============

Tainted Canvas
--------------
Simply running this locally under Chrome won't work because of the tainted canvas issue. On Mac OS you can run

    python -m SimpleHTTPServer

in Terminal app from the kb-tos root dir and then open `localhost:8000`.

WebGL.d.ts
----------
Kiwi uses `WebGL.d.ts` which duplicates the APIs which are already present in `lib.d.ts` after a fresh install of the Typescript on Mac OS X using `npm install -g typescript`. This generates a lot of duplicate symbol errors. I haven't come to any reasonable solution which would allow having Kiwi as a submodule and also avoid usage of `WebGL.d.ts` in it, so as a temporary workaround I decided to patch the `lib.d.ts` from the Typescript installation to remove these errors. This file can be found in `other/lib.d.ts`.