import { createUserApis } from './user';
import { createOptionsApis } from './options';

export default function createApis(server) {
  createUserApis(server);
  createOptionsApis(server);
}
