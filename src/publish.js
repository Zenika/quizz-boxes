import { mkdir } from 'mz/fs';
import { exec } from 'mz/child_process';
import path from 'path';
import Promise from 'bluebird';
import rimrafCb from 'rimraf';
import { ncp as ncpCb } from 'ncp';
import { conf } from './conf';

const rimraf = Promise.promisify(rimrafCb);
const ncp = Promise.promisify(ncpCb);

const repo = path.join(conf.work, 'repo');

export default async function() {
  try {
    await rimraf(conf.work);
    await mkdir(conf.work);

    await exec(`git clone ${conf.git} repo`, { cwd: conf.work });
    await exec(`git checkout gh-pages`, { cwd: repo });
    await ncp(conf.dist, repo);
    await exec(`git add .`, { cwd: repo });
    await exec(`git commit -m "${new Date()}"`, { cwd: repo });
    await exec(`git push origin gh-pages`, { cwd: repo });

    await rimraf(conf.work);

  } catch (error) {
    console.log('Something went wrong in publication', error);
  }
}
