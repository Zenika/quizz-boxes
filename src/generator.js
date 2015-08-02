import { readdir, mkdir, readFile, writeFile } from 'mz/fs';
import { exec } from 'mz/child_process';
import path from 'path';
import Promise from 'bluebird';
import rimrafCb from 'rimraf';
import { ncp as ncpCb } from 'ncp';
import { conf } from './conf';

import { renderImplem, renderHome } from './renderers';

const rimraf = Promise.promisify(rimrafCb);
const ncp = Promise.promisify(ncpCb);

export default async function() {
  try {
    await rimraf(conf.dist);
    await ncp(conf.public, conf.dist);

    const homeContent = renderHome();
    const homeIndexPath = path.join(conf.dist, 'index.html');
    let homeIndexContent = await readFile(homeIndexPath);
    homeIndexContent = homeIndexContent.toString().replace(
      /<body>[\s\S]*<\/body>/,
      `<body>${homeContent}</body>`
    );
    await writeFile(homeIndexPath, homeIndexContent);


    const directories = await readdir(conf.implems);
    const implemsPromises = directories.map(renderImplem);
    const implems = await Promise.all(implemsPromises);
    //console.log('implems', implems);

    for(let implem of implems) {
      implem.orginalPath = path.join(conf.implems, implem.title);
      implem.orginalDistPath = path.join(implem.orginalPath, 'dist');
      implem.distPath = path.join(conf.dist, implem.title);
      implem.indexDistPath = path.join(implem.distPath, 'index.html');

      await mkdir(implem.distPath);
      await exec('npm install', { cwd: implem.orginalPath });
      await exec('npm start', { cwd: implem.orginalPath });
      await ncp(implem.orginalDistPath, implem.distPath);

      let indexContent = await readFile(implem.indexDistPath);
      indexContent = indexContent.toString().replace(
        /(<body[^>]*)>/,
        `$1 style="margin-left: 25%;">${implem.content}`
      );
      await writeFile(implem.indexDistPath, indexContent);
    }

  } catch (error) {
    console.log('Something went wrong in generation', error);
  }
}
