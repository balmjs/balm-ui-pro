import '@/polyfill';
import { isIE, killIE } from '@/kill-ie';
import createBalmUIProApp from '@/main';

import '@mock-server';
const MOCK = true;

isIE ? killIE() : createBalmUIProApp(MOCK);
