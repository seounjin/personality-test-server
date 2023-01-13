import fs from 'fs';
import { resolve } from 'path';
import { DBField } from '../types';

const basePath = resolve();

const filenames = {
  [DBField.CARDS]: resolve(basePath, 'src/db/cards.json'),
  [DBField.USERS]: resolve(basePath, 'src/db/users.json'),
  [DBField.SELECT_ITEMS]: resolve(basePath, 'src/db/selectItems.json'),
  [DBField.RESULT_ITEM]: resolve(basePath, 'src/db/resultItems.json'),
};

export const readDB = (target: DBField) => {
  try {
    return JSON.parse(fs.readFileSync(filenames[target], 'utf-8'));
  } catch (err) {
    console.error(err);
  }
};

export const writeDB = (target: DBField, data: any) => {
  try {
    return fs.writeFileSync(filenames[target], JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};
