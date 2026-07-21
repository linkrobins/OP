# Link Robins OP

A [Flarum 2.0](https://flarum.org) extension that adds a small **OP** label next to the original poster's name whenever they reply in their own discussion. Makes it easy to spot the discussion author's contributions across a long thread.

This is a Flarum 2.0 port of [`dem13n/topic-starter-label`](https://github.com/Dem13n/topic-starter-label) (Flarum 1.x), with the label changed to "OP" and adapted for Flarum 2.0's component registry.

## What it does

Inside a discussion, every reply written by the person who started it gets a small **OP** badge added to its author byline. Two rules keep the badge useful:

- **Only the original poster.** Replies from everyone else are left untouched.
- **Replies only, not the opening post.** The first post is the OP by definition, so badging it would just be noise. The badge is there to pick the OP's *replies* out from the rest of the conversation.

The badge only renders on the discussion page, so post previews and other lists stay clean. It uses your theme's primary color, so it fits in on any light or dark theme without configuration.

## Installation

```sh
composer require linkrobins/op
php flarum cache:clear
```

Then enable it in **Admin → Extensions**. No configuration and no migrations.

## Compatibility

- Flarum **2.0** (tested through 2.0.0-rc.5)
- PHP **8.3+**
- No dependencies beyond `flarum/core`

## License

MIT. Credit to [Dem13n](https://github.com/Dem13n) for the original implementation.
