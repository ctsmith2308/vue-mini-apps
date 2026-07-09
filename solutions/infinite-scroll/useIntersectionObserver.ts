import { watch, onUnmounted, type Ref } from 'vue';

interface UseIntersectionObserverOptions {
  /** The element to observe — typically a template ref */
  target: Ref<HTMLElement | null>;
  /** Called when the target enters the viewport */
  onIntersect: () => void;
  /** IntersectionObserver options */
  rootMargin?: string;
  threshold?: number;
}

export function useIntersectionObserver({
  target,
  onIntersect,
  rootMargin = '0px',
  threshold = 0.1,
}: UseIntersectionObserverOptions) {
  let observer: IntersectionObserver | null = null;

  // Watch the target ref — when the element mounts (goes from null to element), start observing
  watch(
    target,
    (el, _, onCleanup) => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      if (!el) return;

      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            onIntersect();
          }
        },
        { rootMargin, threshold },
      );

      observer.observe(el);

      // Cleanup when the target changes or component unmounts
      onCleanup(() => {
        observer?.disconnect();
        observer = null;
      });
    },
    { immediate: true },
  );

  onUnmounted(() => {
    observer?.disconnect();
  });
}
