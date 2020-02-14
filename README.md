# The videu Web Frontend

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
`npm i` to install all dependencies.  Then, type `npm start` to spin up a local
development server.  You might want to run the corresponding
[backend server](https://github.com/videu/backend) as well.
