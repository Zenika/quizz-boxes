import { readdir, mkdir, writeFile } from 'mz/fs';
import path from 'path';
import Promise from 'bluebird';
import rimrafCb from 'rimraf';
import { conf } from './index';

import { renderImplem, renderHome } from './renderers';

const rimraf = Promise.promisify(rimrafCb);

export default async function() {
  try {
    await rimraf(conf.dist);
    await mkdir(conf.dist);

    const directories = await readdir(conf.implems);
    const implemsPromises = directories.map(renderImplem);

    const implems = await Promise.all(implemsPromises);

    console.log('implems', implems);

    for(let implem of implems) {
      implem.path = path.join(conf.dist, implem.title);
      await mkdir(implem.path);
      await writeFile(path.join(implem.path, 'index.html'), implem.content);
    }

  } catch (error) {
    console.log('Something went wrong in generation', error);
  }

}
