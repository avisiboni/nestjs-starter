import { CacheType } from './cache-type';

/**
 * @typedef {Object} CacheManagerModuleOptions
 * Options for configuring the CacheManagerModule.
 *
 * @example
 * {
 *   type: CacheType.REDIS;
 *   ...
 * }
 */
export type CacheManagerModuleOptions =
  | {
      /**
       * @property {CacheType.} type
       * Determines the type of cache. It can be REDIS.
       */

      type: CacheType.REDIS;

      /**
       * @property {string} host
       * The Redis host. This could be the IP address or DNS name of the Redis server.
       */
      host: string;

      /**
       * @property {number} port
       * The Redis server's TCP port number.
       */
      port: number;

      /**
       * @property {string} password
       * The password for authentication to the Redis server.
       */
      password: string;

      /**
       * @property {number} database
       * The Redis database number.
       */
      database: number;

      /**
       * @property {string} prefix
       * The prefix used for all cache keys.
       */
      prefix: string;

      /**
       * @property {string} userName
       * The username for authentication to the Redis server.
       */
      userName: string;

      /**
       * @property {boolean} [isSentinel]
       * Determines whether Sentinel is enabled.
       */
      isSentinel?: boolean;

      /**
       * @property {SentinelConfig} [sentinels]
       * Configuration for Sentinel.
       */
      sentinels?: SentinelConfig;

      /**
       * @property {number} [retries]
       * The number of connection retries.
       */
      retries?: number;

      /**
       * @property {boolean} [enableReadyCheck]
       * Determines whether to check if the server is ready before commands are allowed to run.
       */

      enableReadyCheck?: false;

      /**
       * @property {Object} [tls]
       * Configuration for TLS.
       */
      tls?: {
        /**
         * @property {false} [rejectUnauthorized]
         * If true, the server certificate is verified against the list of supplied CAs.
         */
        rejectUnauthorized?: false;

        /**
         * @property {false} [requestCert]
         * If true, the server requests a certificate from clients that connect and attempt to verify that certificate.
         */
        requestCert?: false;

        /**
         * @property {'TLSv1.3'} [maxVersion]
         * Optionally set maximum TLS version to allow.
         */
        maxVersion?: 'TLSv1.3';

        /**
         * @property {'TLSv1.2'} [minVersion]
         * The minimum TLS version to allow.
         */
        minVersion?: 'TLSv1.2';
      };
    }
  | {
      /**
       * @property {CacheType.} type
       * Determines the type of cache. It can be IN_MEMORY.
       */
      type: CacheType.IN_MEMORY;

      /**
       * @property {string} prefix
       * The prefix used for all cache keys.
       */
      prefix: string;
    };

/**
 * @typedef {Object} SentinelConfig
 * Represents a configuration for Sentinel.
 *
 * @example
 * {
 *   username: 'sentinelUser'
 *   ...
 * }
 */
export type SentinelConfig = {
  /**
   * @property {string} [username]
   * The username for Sentinel authentication.
   */
  username?: string;

  /**
   * @property {string} [password]
   * The password for Sentinel authentication.
   */
  password?: string;

  /**
   * @property {boolean} [enableTLS]
   * Determines whether TLS is enabled or not.
   */
  enableTLS?: boolean;
};
