import { isIE, killIE } from '@/kill-ie';
import createBalmUIProApp from '@/main';

import '@mock-server';

isIE ? killIE() : createBalmUIProApp();
