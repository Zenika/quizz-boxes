import { readFile } from 'mz/fs';
import path from 'path';
import marked from 'marked';

import { conf } from './index';

import React from 'react';
import Implem from './components/implem.component';
import Home from './components/home.component';

export async function renderImplem(implemPath) {
  const readmeContent = await readFile(path.join(conf.implems, implemPath, 'README.md'));
  const readme = marked(readmeContent.toString());
  //console.log('marked', readme);
  return {
    title: implemPath,
    content: React.renderToString(<Implem title={implemPath} readme={readme}/>)
  };
}

export function renderHome() {
  return React.renderToString(<Home/>);
}
