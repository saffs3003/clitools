import chalk from 'chalk';
// import * as pkgUp from 'pkg-up';
import  createLogger  from '../logger.js'
const logger=createLogger('config:mgr');
import { cosmiconfigSync } from 'cosmiconfig';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const schema = require("./schema.json");


import betterAjvErrors from 'better-ajv-errors';

import Ajv from 'ajv';
const ajv = new Ajv({ jsonPointers: true });

const configLoader = cosmiconfigSync('tool', {
  searchPlaces: [
    'tool.config.js', // First preference
    'tool.config.json',
    '.toolrc',
    'package.json',   // Last preference
  ],
});
// console.log(configLoader)
export default function getConfig() {
  const result = configLoader.search(process.cwd());
  
  // console.log(`Configuration file found at: ${result.filepath}`);
  // console.log(result)
  if (!result) {
    logger.warning('Could not find configuration, using default');
    // console.log(chalk.yellow('Could not find configuration, using default'));
    return { port: 1234 };
  } else {
    const isValid=ajv.validate(schema,result.config);
    if(!isValid){
      logger.warning('Invalid configuration was supplied');
      // console.log(chalk.yellow('Invalid configuration was supplied'));
      console.log(ajv.errors);
      console.log(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }
logger.debug('Found Configuration',result.config);
    // console.log('Found configuration', result.config);
    return result.config;
  }
}