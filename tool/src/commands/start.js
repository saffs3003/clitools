// import chalk from 'chalk';
import createLogger from '../logger.js';
export default function start(config){
    const logger =createLogger('commands:start')

  
      logger.highlight('  Starting the app  ');
      logger.debug('Received configuration', config);
    }