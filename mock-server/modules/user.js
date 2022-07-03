import { responseHandler } from '@mock-server/handler';

export function createUserApis(server) {
  server.get('/user/:id', (schema, request) => {
    const id = request.params.id;

    return responseHandler({
      id,
      a: 'a2',
      b: 'b2',
      c: '<p>c2</p>',
      d: 2,
      e: [4],
      f: 6,
      g: [8, 9],
      h: '2022-06-22',
      i: ['2022-06-15', '2022-06-25'],
      j: 'on',
      k: 60,
      l: 2,
      m: 22,
      n: 222,
      o: 'o2',
      p: 'p2',
      q: '',
      r: '',
      s: '',
      t: '',
      u: '',
      v: '',
      w: '',
      x: '',
      y: '',
      z: 'zzz'
    });
  });
}
