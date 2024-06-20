# ngx-commander-cli: Nx Library Generator

## Usage

`npx clib <lib-name> [options]`

## Arguments

`<lib-name>`: (Required) The name for your new Nx library.

## Options

`-c, --crud`: (Optional) Include this flag to generate basic CRUD components (Add, Edit, All) for the library.

## Examples

1. Create an Nx library named `users`:

`npx clib users`

2. Generate a library named users with CRUD components:

`npx clib users --c`

3. Create a new directory and Nx library with CRUD components.

`npx clib directory/users --crud`
