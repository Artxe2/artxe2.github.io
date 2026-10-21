---
paths:
  - "**/*.html"
  - "**/*.js"
---
- Style only with Click CSS tokens in `class`, with `<script src="https://artxe.github.io/click-css/min.js"></script>` first in `<head>`; no `<style>` or `style=` (so no `@keyframes`).
- Click CSS's reset gives every element `flex-shrink:0`: a flex child that must shrink needs `fsk=1` or `f=1_1_<basis>`.
- A parent's `_child/…` rule beats the child's own token; mark the child's token `!` to win.
- User-facing text is English.
- Pages must also run opened from `file://`, where Chrome blocks module imports: a page's shared logic is a classic script defining one global (`globalThis.Name = (() => { ... })()`), loaded by `<script src>` before the inline script; tests import it for that side effect.
