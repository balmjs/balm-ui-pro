import { responseHandler } from '@mock-server/handler';

const options1 = [
  {
    label: 'Item 1',
    value: 1
  },
  {
    label: 'Item 2',
    value: 2
  }
];

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

export function createTestApis(server) {
  server.post('/test/options1', () => {
    const options = options1;

    return responseHandler(options);
  });

  server.post('/test/options2', (schema, request) => {
    const params = JSON.parse(request.requestBody);

    const selectedOptions = options2.find(
      (item) => item.parentId === params.id
    );
    const options = selectedOptions ? selectedOptions.options : [];

    return responseHandler(options);
  });

  server.post('/test/options3', (schema, request) => {
    const params = JSON.parse(request.requestBody);

    const selectedOptions = options3.find(
      (item) => item.parentId === params.id
    );
    const options = selectedOptions ? selectedOptions.options : [];

    return responseHandler(options);
  });
}
