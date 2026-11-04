# Link Robins OP

A [Flarum 2](https://flarum.org) extension that adds a small **OP** badge next to the original poster's name whenever they reply in their own discussion. It makes the discussion author's contributions easy to spot in a long thread.

This is a Flarum 2 port of [`dem13n/topic-starter-label`](https://github.com/Dem13n/topic-starter-label) (Flarum 1.x), with the label changed to "OP" and adapted for Flarum 2's component registry.

## Features

- **Only the original poster.** A reply gets the badge when its author is the member who started the discussion. Replies from everyone else are left untouched.
- **Replies only, not the opening post.** The first post is the OP by definition, so badging it would mark every discussion's first post and tell you nothing. The badge picks the OP's *replies* out from the rest of the conversation.
- **Discussion page only.** The badge renders on the discussion page (including when you jump to a post), so the discussion list, post previews and search results stay clean.
- **Readable on any theme.** The badge takes your forum's primary color. If white text on that color would be hard to read, the color is darkened until it clears the WCAG AA contrast ratio (4.5:1); a primary color too light for that keeps its own color with black text instead. Light and dark themes both work with no configuration.
- **Translatable.** The label is a language string (`linkrobins-op.forum.label`, "OP" in English), so a language pack can change it.

## What it does not do

- No settings, no permissions and no migrations. The badge is on for everyone who can read the discussion once the extension is enabled.
- It cannot be hidden from particular groups.
- It adds nothing outside the discussion page.

## Requirements

- Flarum 2.x
- PHP 8.3 or newer
- No dependencies beyond `flarum/core`

## Installation

```sh
composer require linkrobins/op
```

Then toggle it on in the admin panel's **Extensions** page. There is nothing to configure.

## Updating

```sh
composer update linkrobins/op
php flarum cache:clear
```

## Styling

The badge is a single element with the class `.LinkRobinsOp-badge`, inside the post's author byline. To restyle it, override that class in your theme's custom LESS:

```less
.LinkRobinsOp-badge {
  background: @secondary-color;
  text-transform: none;
}
```

## License

MIT. Credit to [Dem13n](https://github.com/Dem13n) for the original implementation.
