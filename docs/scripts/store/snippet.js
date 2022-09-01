import { ref } from 'vue';

const demos = ref([]);

async function initSnippet(name, count) {
  demos.value = []; // reset

  if (count) {
    demos.value = [''];

    for (let i = 1; i <= count; i++) {
      const filename = `${name}/demo${i}.md`;
      const code = (await import(`@/snippets/${filename}`)).default;

      demos.value.push(code);
    }
  }
}

const useSnippetStore = () => {
  return {
    demos,
    initSnippet
  };
};

export default useSnippetStore;
