# Coding Guidelines

## Runes (Reactivity)

- Use `$state()` for reactive local variables instead of `let` with implicit reactivity.
- Use `$derived()` for computed values that depend on reactive state — never mutate a derived value.
- Use `$props()` to declare component props. Destructure with defaults inline: `let { count = 0 } = $props()`.
- Use `$bindable()` for props that support two-way binding from a parent.
- Avoid `$effect()` for state derivations — use `$derived()` instead.

## Components

- One component per file. Keep components small and focused on a single responsibility.
- Prefer `<script>` (not `<script context="module">`) for instance logic.
- Use `<script module>` (Svelte 5 syntax) only for module-level code shared across all instances.
- Avoid inline event handlers with complex logic — extract to named functions in `<script>`.
- Always use `{#key ...}` when you need to force a component to remount on value change.

## Props & Events

- Declare all props with `$props()`. Do not rely on implicit prop passing.
- Use callback props (`onclick`, `onsubmit`, etc.) rather than `createEventDispatcher` — dispatchers are legacy Svelte 4 syntax.
- Prefer `$bindable()` for values that the parent legitimately owns and the child should mutate.

```svelte
<script>
let {value = $bindable(''), onchange} = $props()
</script>
```

## Stores

- Prefer `$state()` and context API (`setContext`/`getContext`) over Svelte stores for component-tree-local state.
- Use Svelte stores (`writable`, `readable`, `derived`) only for truly global or cross-tree state.
- When using stores in Svelte 5, the `$store` auto-subscription shorthand still works.

## TypeScript

- Use TypeScript for all new files (`.svelte` files with `<script lang="ts">`).
- Type props explicitly using the destructured `$props()` with a defined interface.
- Avoid `any` — use `unknown` and narrow types explicitly.

## Styling

- Use scoped `<style>` blocks for component styles.
- Prefer utility classes (Tailwind) for layout and spacing; use scoped styles for component-specific rules.
- Avoid `:global()` unless targeting third-party or dynamic content.

## Performance

- Avoid creating reactive state inside loops or conditional branches — hoist `$state()` to the top level.
- Prefer `{#each items as item (item.id)}` with a key expression to help Svelte diff lists efficiently.
- Avoid unnecessary `$effect()` calls — they re-run on every reactive dependency change.

## File & Project Structure

- Group components by feature, not by type: `src/lib/FeatureName/index.svelte`.
- Keep page-level components in `src/pages/`.
- Shared utilities go in `src/lib/` or `src/helpers/`.
- Types live in `src/types/index.ts`.

## Anti-patterns to Avoid

- Do not use `on:event` directive syntax — use `onevent` prop syntax in Svelte 5.
- Do not use `<svelte:component this={...}>` when the component is known statically.
- Do not read and write the same `$state` inside a single `$effect` — this causes infinite loops.
- Do not use `export let` for props — use `$props()` instead.

## Formatting and linting

- Use Prettier for consistent code formatting. Configure it with a `.prettierrc` file.
- Use ESLint with a Svelte plugin for linting. Configure it with an `.eslintrc` file.
