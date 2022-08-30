import { isIE, killIE } from '@/kill-ie';
import createBalmUIProApp from '@/main';

isIE ? killIE() : createBalmUIProApp();
