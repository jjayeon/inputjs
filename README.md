# Input.js --- a low-level library for Javascript input processing

A low-level, all-in-one package for handling mouse and keyboard events.

If you need a library for handling user input that's agnostic to your UI framework (React, Angular, etc), this is the place for you.  Input.js is simply an intuitive wrapper around the infamous document.addEventListener() command, which is powerful, but a bit cumbersome.  Using Input.js, you can quickly add and remove bindings to individual keys and mouse actions, complete with modifiers (Shift, Control, Alt).  Fork it and run `npm run build` to try it out!

## installation/getting started

Input.js is not yet available on npm.  To download or use, fork this repo on Github and copy the files src/lib/Input.js and src/lib/Helpers.js to wherever you need them.

To see it in action, fork this repo and run:

    npm install # or yarn install, of course
    npm run build

And dist/index.html will have some basic usage examples.  See src/index.js for the implementation.

To see unit tests, go to src/test/Helpers.test.js.  Run

    npm test

to verify that they work.  Uses Mocha.

## usage

Input.js keeps track of the following state variables:

    input.x; // the current mouse X position.
    input.y; // the current mouse y position.
	
    input.pressed; // a javascript object of key:boolean pairs.
    // ex: { Shift: true, mouseleft: true, a: false }
	
    input.binds; // All the key bindings in use.
    input.upbinds; // stored separately for keyup/keydown.
	
    // so the binds for A are in data.binds["None"]["a"],
    // and the binds for Shift B are in data.binds["Shift"]["B"].

And you can use the following functions to modify the key bindings:

    input.bind([modifier, ]key[, callback]); // Takes any modifier + key combination 
    // and either adds a new callback to it, or returns existing callbacks.
    input.upbind([modifier, ]key[, callback]); // same for keyups.
    input.unbind([modifier, ]key); // unbinds the given key.
    input.unupbind([modifier, ]key); // you can guess what this does.

Supported modifier keys are Alt, Control, Meta, and Shift.  You can also use mouseleft, mousemiddle, mouseright, and mousemove as keys to bind mouse events!

## A note on Shift and Capslock

Because of the way Javascript handles keyboard events, there are some syntactic restrictions on bind().  Pressing the A key will fire an event with e.key === "a", but pressing the A key while Shift is held down will result in e.key === "A" and e.shiftKey === true.  What this means for you is that input.bind("a") and input.bind("Shift", "A") will have your (presumably) intended behavior, but input.bind("A") and input.bind("Shift", "a") will not --- input.bind("A") will only fire if CapsLock is active and Shift is released, whereas input.bind("Shift", "a") will only fire is Capslock is active and Shift is held.  input.bind("Shift", "1") will never fire at all --- use input.bind("Shift", "!") instead.

More generally, for any key that looks different when pressed with Shift, make sure you match the modifier and key together.  Never use the Shift modifier with an un-Shifted key!  Also, if you use this library, note that toggling CapsLock will probably brick your application's keybindings --- to avoid this, consider binding both ("Shift", "A") and ("Shift", "a") to the desired function.  A later update will include some tools to manage the Shift/Capslock discrepancy more easily, but for now, just be aware of the odd behavior.

## packages

Input.js relies on no external libraries to run.  These packages are used in development:

npm and Yarn for package management, of course.

Webpack as our build system.

Babel for Javascript wrangling.

ESLint and Prettier for code formatting.
