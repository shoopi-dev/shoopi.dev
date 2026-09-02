@AGENTS.md

## UI work

This repo is built on the `shoopi-design` skill - the liquid glass design language
(`~/.claude/skills/shoopi-design`). Invoke it before writing or changing any JSX or
CSS in `app/` or `components/`: cards, buttons, icon buttons, chips, badges,
panels, colours, radii, type, spacing, and entrance animation all come from there.

Compose `Card`, `IconButton`, `Pill`, `Widget`, `SectionHeader` before writing new
markup. If you change the system here, mirror it back into the skill's `assets/`
so the two don't drift.
