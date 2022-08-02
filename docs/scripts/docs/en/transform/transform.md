```ts
type FormData = { [key: string]: any };

interface Transform {
  in: (data: FormData) => Transform;
  format: (
    keys: string | string[],
    formatFn: (data: FormData) => FormData
  ) => Transform;
  out: () => FormData;
}

interface VueInstance {
  $transform: Transform;
}
```
