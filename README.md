# The videu Web Frontend

[![Build Status](https://jenkins.sandtler.club/buildStatus/icon?job=videu%2Ffrontend)](https://jenkins.sandtler.club/job/videu/job/frontend/)

This is the source tree of the videu web frontend, as used in the
[FreeTube](https://freetube.eu/) platform.

## WARNING: This Is Pre-Alpha Software!

This application should not be exposed to the Internet because it is
not stable yet.

## License

Copyright &copy; 2020 The videu Project.  All rights reserved.

This software is licensed under the AGPLv3, see the `LICENSE` file
for details.

## Development Setup

You will need:

- NodeJS >= 8.0 (and `npm` ofc)
- a UNIX system (Linux, *BSD and Darwin should all work)
- a decent IDE with TypeScript support (VS Code or Atom recommended)

You might be able to run it on Windows, but this is not supported and highly
discouraged.  If you absolutely need to, use the Windows Subsystem for Linux.

Clone the repository, open a shell in the project's root directory and type
`npm i` to install all dependencies.  Copy the `.env.default` file to `.env` and
adjust its configuration values as needed.  Then, type `npm start` to spin up a
local development server.  You might want to run the corresponding
[backend server](https://github.com/videu/backend) as well.
NOTE: If the opened browser window is empty, you have to manually refresh the
page once.  That can happen if `es-dev-server` opens the browser window before
`tsc` has finished building.  You only have to do this the first time because
`es-dev-server` is watching changes in the output directory of `tsc`.

You might also want to install the
[Redux DevTools browser extension](https://github.com/zalmoxisus/redux-devtools-extension).
