import { responseHandler } from '@mock-server/handler';

export function createUserApis(server) {
  server.post('/user/add', (schema, request) => {
    return responseHandler({});
  });

  server.post('/user/edit', (schema, request) => {
    return responseHandler({});
  });

  server.get('/user/list', (schema, request) => {
    const { page } = request.queryParams;
    const id = 8 * (page - 1) + 1;

    return responseHandler({
      data: [
        {
          id,
          dessert: 'Frozen yogurt',
          calories: 159,
          fat: 6,
          carbs: 24,
          protein: 4
        },
        {
          id: id + 1,
          dessert: 'Ice cream sandwich',
          calories: 237,
          fat: 9,
          carbs: 37,
          protein: 4.3
        },
        {
          id: id + 2,
          dessert: 'Eclair',
          calories: 262,
          fat: 16,
          carbs: 24,
          protein: 6
        },
        {
          id: id + 3,
          dessert: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 3.9
        },
        {
          id: id + 4,
          dessert: 'Gingerbread',
          calories: 356,
          fat: 16,
          carbs: 49,
          protein: 0
        },
        {
          id: id + 5,
          dessert: 'Jelly bean',
          calories: 375,
          fat: 0,
          carbs: 94,
          protein: 0
        },
        {
          id: id + 6,
          dessert: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 6.5
        },
        {
          id: id + 7,
          dessert: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 4.9
        }
      ],
      page: {
        total: 88
      }
    });
  });

  server.get('/user/info', (schema, request) => {
    const { id } = request.queryParams;

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
      x: 'x',
      y: 'yy',
      z: 'zzz'
    });
  });

  server.post('/user/edit', (schema, request) => {
    const data = JSON.parse(request.requestBody);

    console.log(data);

    return responseHandler({});
  });
}
