import { ref } from 'vue';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

interface AddToastOptions {
  message: string;
  type?: ToastType;
  /** Duration in ms. Set 0 for no auto-dismiss. Errors default to 0. */
  duration?: number;
}

// Module-level state — shared across all components that call useToast()
const toasts = ref<Toast[]>([]);
const timers = new Map<string, ReturnType<typeof setTimeout>>();

function addToast(options: AddToastOptions) {
  const type = options.type ?? 'info';
  const duration = options.duration ?? (type === 'error' ? 0 : 3000);

  const toast: Toast = {
    id: crypto.randomUUID(),
    message: options.message,
    type,
    duration,
  };

  toasts.value.push(toast);

  // Auto-dismiss (skip for errors by default — they need explicit user action)
  if (duration > 0) {
    const timer = setTimeout(() => removeToast(toast.id), duration);
    timers.set(toast.id, timer);
  }
}

function removeToast(id: string) {
  const timer = timers.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.delete(id);
  }
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

export function useToast() {
  return {
    toasts,
    addToast,
    removeToast,
  };
}

export type { Toast, ToastType };
