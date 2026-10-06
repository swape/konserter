# Improvement Plan

## Type Safety

- [ ] `object` type in `src/fire.ts` (`addEntry`, `updateEntry`) → `Record<string, unknown>`
- [ ] Missing `lang="ts"` on `src/App.svelte`, `src/lib/AuthGate/AuthGate.svelte`, `src/lib/StarRating/index.svelte`
- [ ] `Array(stars)` in `src/lib/StarRating/index.svelte` → `Array.from({length: stars})`

## Performance

- [ ] Concert list has no pagination — will be slow at scale; consider `svelte-virtual-list`

## Code Quality

- [ ] Global writable stores (`showMenu`, `currentPage`, `currentConcertItem`) in `src/myStore.ts` should use Svelte context API (`setContext`/`getContext`) per AGENTS.md guidelines
- [ ] `confirm()` dialogs in `src/pages/new/components/ConcertForm/ConcertForm.svelte` are browser-native and unstyled — replace with a proper modal component

## UX / Features

- [ ] No error handling on async Firebase calls — failures are silent to the user
- [ ] No search on the list page (`src/pages/list/index.svelte`)
- [ ] Loading skeletons/spinners during Firebase sync are missing
