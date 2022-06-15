import { createDemoApis } from './demo';
import { createTestApis } from './test';

export default function createApis(server) {
  createDemoApis(server);
  createTestApis(server);
}
