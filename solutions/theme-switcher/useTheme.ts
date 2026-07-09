import { inject, provide, ref, watchEffect, type InjectionKey, type Ref } from 'vue';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContext {
  theme: Ref<Theme>;
  resolved: Ref<'light' | 'dark'>;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

// InjectionKey gives type safety to provide/inject — no casting needed on the inject side
const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme');

/**
 * Call this once at the root component to provide theme to all descendants.
 */
export function provideTheme(initial: Theme = 'system') {
  const theme = ref<Theme>(initial);

  // Resolve 'system' to an actual light/dark value
  const resolved = ref<'light' | 'dark'>('light');

  watchEffect(() => {
    if (theme.value === 'system') {
      resolved.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      resolved.value = theme.value;
    }

    // Sync to <html> so CSS variables / selectors can react
    document.documentElement.dataset.theme = resolved.value;
  });

  function setTheme(t: Theme) {
    theme.value = t;
  }

  function toggleTheme() {
    theme.value = resolved.value === 'light' ? 'dark' : 'light';
  }

  const ctx: ThemeContext = { theme, resolved, setTheme, toggleTheme };
  provide(ThemeKey, ctx);
  return ctx;
}

/**
 * Call this in any descendant component to consume the theme.
 */
export function useTheme(): ThemeContext {
  const ctx = inject(ThemeKey);
  if (!ctx) {
    throw new Error('useTheme() called without a parent provideTheme()');
  }
  return ctx;
}
