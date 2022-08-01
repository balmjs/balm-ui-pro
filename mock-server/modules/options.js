import { responseHandler } from '@mock-server/handler';

export function createOptionsApis(server) {
  server.get('/demo/select/options', () => {
    const options = [
      {
        label: 'A',
        value: 1
      },
      {
        label: 'B',
        value: 2
      }
    ];

    return responseHandler(options);
  });

  server.get('/demo/checkbox/options', () => {
    const options = [
      {
        label: 'C',
        value: 3
      },
      {
        label: 'D',
        value: 4
      }
    ];

    return responseHandler(options);
  });

  server.get('/demo/radio/options', () => {
    const options = [
      {
        label: 'E',
        value: 5
      },
      {
        label: 'F',
        value: 6
      }
    ];

    return responseHandler(options);
  });

  server.get('/demo/chips/options', () => {
    const options = [
      {
        label: 'G',
        value: 7
      },
      {
        label: 'H',
        value: 8
      },
      {
        label: 'I',
        value: 9
      }
    ];

    return responseHandler(options);
  });

  server.get('/demo/multi-select/options1', () => {
    const options = [
      {
        label: 'Item 1',
        value: 1
      },
      {
        label: 'Item 2',
        value: 2
      }
    ];

    return responseHandler(options);
  });

  server.get('/demo/multi-select/options2', (schema, request) => {
    const params = request.queryParams;
    // console.log('options2', params);

    const options2 = [
      {
        parentId: 1,
        options: [
          {
            label: 'Item 11',
            value: 11
          },
          {
            label: 'Item 12',
            value: 12
          }
        ]
      },
      {
        parentId: 2,
        options: [
          {
            label: 'Item 21',
            value: 21
          },
          {
            label: 'Item 22',
            value: 22
          }
        ]
      }
    ];

    const selectedOptions = options2.find(
      (item) => item.parentId === +params.id
    );
    const options = selectedOptions ? selectedOptions.options : [];

    return responseHandler(options);
  });

  server.get('/demo/multi-select/options3', (schema, request) => {
    const params = request.queryParams;
    // console.log('options3', params);

    const options3 = [
      {
        parentId: 11,
        options: [
          {
            label: 'Item 111',
            value: 111
          },
          {
            label: 'Item 112',
            value: 112
          }
        ]
      },
      {
        parentId: 12,
        options: [
          {
            label: 'Item 121',
            value: 121
          },
          {
            label: 'Item 122',
            value: 122
          }
        ]
      },
      {
        parentId: 21,
        options: [
          {
            label: 'Item 211',
            value: 211
          },
          {
            label: 'Item 212',
            value: 212
          }
        ]
      },
      {
        parentId: 22,
        options: [
          {
            label: 'Item 221',
            value: 221
          },
          {
            label: 'Item 222',
            value: 222
          }
        ]
      }
    ];

    const selectedOptions = options3.find(
      (item) => item.parentId === +params.id
    );
    const options = selectedOptions ? selectedOptions.options : [];

    return responseHandler(options);
  });
}
