import { readFile } from 'mz/fs';
import path from 'path';
import marked from 'marked';

import { conf } from './index';

import React from 'react';
import Implem from './components/implem.component';

export function renderImplem(implemPath) {
  return readFile(path.join(conf.implems, implemPath, 'README.md'))
    .then(readmeContent => {

      const readme = marked(readmeContent.toString());
      //console.log('marked', readme);
      return {
        title: implemPath,
        content: React.renderToString(<Implem title={implemPath} readme={readme}/>)
      };
    });
}

export function renderHome() {
  return 'home';
}
