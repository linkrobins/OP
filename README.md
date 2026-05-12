# Link Robins OP

A [Flarum 2.0](https://flarum.org) extension that adds a small **OP** label next to the original poster's name whenever they reply in their own discussion. Makes it easy to spot the discussion author across long threads.

This is a Flarum 2.0 port of [`dem13n/topic-starter-label`](https://github.com/Dem13n/topic-starter-label) (Flarum 1.x), with the label changed to "OP" and adapted for Flarum 2.0's component registry.

## Install

```sh
composer require linkrobins/op
php flarum cache:clear
```

Then enable it in **Admin → Extensions**.

## How it works

When viewing a discussion, every reply by the original poster gets a small green **OP** badge added to its author byline. The first post (which is by definition by the OP) is excluded — the badge is only useful for telling the OP's *replies* apart from everyone else's.

## Requirements

- Flarum **2.0+**
- PHP **8.2+**

## License

MIT. Credit to [Dem13n](https://github.com/Dem13n) for the original implementation.
