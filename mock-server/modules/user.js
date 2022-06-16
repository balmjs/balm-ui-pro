import { responseHandler } from '@mock-server/handler';

export function createUserApis(server) {
  server.get('/user/:id', (schema, request) => {
    const id = request.params.id;

    return responseHandler({
      id,
      a: 'a1',
      b: 'b2',
      c: 'c3',
      d: 2,
      e: [4],
      f: 6,
      g: [7, 9],
      h: '2022-06-11',
      j: true,
      k: 50,
      l: 'hello world'
    });
  });
}
