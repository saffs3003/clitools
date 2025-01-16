#!/usr/bin/env node
import arg from 'arg';
import chalk from 'chalk';
import getConfig from '../src/config/config-mgr.js';
import start from '../src/commands/start.js';
import createLogger from '../src/logger.js';
import Today from '../src/commands/today.js';

const logger=createLogger('bin');
try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
    '--today':Boolean
  });
//logger.debug("Recieved Args",args)
  if (args['--start']) {
    const config = getConfig();
    start(config);
  }
  else if(args['--today'])
    {
      Today();
    }
} catch (e) {
  // console.log(chalk.yellow(e.message));
  logger.warning(e.message);
 // console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}