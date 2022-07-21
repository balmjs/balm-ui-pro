import { responseHandler } from '@mock-server/handler';

export function createUserApis(server) {
  server.get('/user/list', (schema, request) => {
    return responseHandler({
      data: [
        {
          id: 1,
          dessert: 'Frozen yogurt',
          calories: 159,
          fat: 6,
          carbs: 24,
          protein: 4
        },
        {
          id: 2,
          dessert: 'Ice cream sandwich',
          calories: 237,
          fat: 9,
          carbs: 37,
          protein: 4.3
        },
        {
          id: 3,
          dessert: 'Eclair',
          calories: 262,
          fat: 16,
          carbs: 24,
          protein: 6
        },
        {
          id: 4,
          dessert: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 3.9
        },
        {
          id: 5,
          dessert: 'Gingerbread',
          calories: 356,
          fat: 16,
          carbs: 49,
          protein: 0
        },
        {
          id: 6,
          dessert: 'Jelly bean',
          calories: 375,
          fat: 0,
          carbs: 94,
          protein: 0
        },
        {
          id: 7,
          dessert: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 6.5
        },
        {
          id: 8,
          dessert: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 4.9
        }
      ],
      total: 8
    });
  });

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
