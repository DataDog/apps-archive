# Design

## Build

This package builds and bundles to a single minified JavaScript file.
This is done so using `npm init`/`yarn create` is fast.
Since everything is in this single file all that's necessary is to download the package.
Without this approach, all of the runtime dependencies would have to be installed.

That said, if we find that this approach doesn't work us for some reason (build process issues, too abrasive in theory, etc.),
we can always move to something else.
It's not integral to this package that it work this way, it's just currently an easy thing to do.
