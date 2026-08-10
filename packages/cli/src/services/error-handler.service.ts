import { KDLError } from '../types/error.types.js';
import { logger } from '../utils/logger.js';

export class ErrorHandlerService {
  public static handle(error: unknown): void {
    if (error instanceof KDLError) {
      logger.error(`[${error.category}] (${error.code}) ${error.message}`);
      if (error.details) {
        logger.debug('Error Details:', JSON.stringify(error.details, null, 2));
      }
    } else if (error instanceof Error) {
      logger.error(`UNHANDLED_EXCEPTION: ${error.message}`);
      if (error.stack) {
        logger.debug('Stack trace:', error.stack);
      }
    } else {
      logger.error('UNKNOWN_FATAL_ERROR:', String(error));
    }
  }
}
