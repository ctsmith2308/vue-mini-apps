import { ref } from 'vue';

interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
}

const PAGE_SIZE = 10;
const TOTAL_POSTS = 50;

// Fake API — generates mock posts with a simulated network delay
function fakeFetch(page: number): Promise<Post[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * PAGE_SIZE;

      if (start >= TOTAL_POSTS) {
        resolve([]);
        return;
      }

      const posts: Post[] = Array.from({ length: PAGE_SIZE }, (_, i) => {
        const id = start + i + 1;
        return {
          id,
          title: `Post #${id}: ${titles[id % titles.length]}`,
          body: `This is the content of post ${id}. It demonstrates infinite scrolling with Vue's Composition API.`,
          author: authors[id % authors.length],
        };
      }).filter((p) => p.id <= TOTAL_POSTS);

      resolve(posts);
    }, 800);
  });
}

const titles = [
  'Getting Started with Vue',
  'Understanding Reactivity',
  'Composables Deep Dive',
  'Template Refs Explained',
  'Async Components',
];

const authors = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];

export function usePosts() {
  const posts = ref<Post[]>([]);
  const page = ref(1);
  const loading = ref(false);
  const exhausted = ref(false);

  async function loadMore() {
    if (loading.value || exhausted.value) return;

    loading.value = true;
    const newPosts = await fakeFetch(page.value);

    if (newPosts.length === 0) {
      exhausted.value = true;
    } else {
      posts.value = [...posts.value, ...newPosts];
      page.value++;
    }

    loading.value = false;
  }

  // Initial load — returns a promise so async setup can await it
  async function init() {
    await loadMore();
  }

  return {
    posts,
    loading,
    exhausted,
    loadMore,
    init,
  };
}

export type { Post };
