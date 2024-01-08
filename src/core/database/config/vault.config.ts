import { registerAs } from '@nestjs/config';
import * as vault from 'node-vault';
import { EnvironmentTypes } from './environment-types';
import { get } from 'env-var';
import { Logger } from '@nestjs/common';

export default async () => {
  if (process.env.NODE_ENV === EnvironmentTypes.Development) {
    return {};
  }
  Logger.debug('Fetching key-values from Vault');

  return await getAllValues();
};

async function getClient() {
  return vault({
    token: get('VAULT_TOKEN').required().asString(),
    endpoint: get('VAULT_ADDRESS').required().asString(),
    apiVersion: 'v1/',
  });
}

async function getAllValues() {
  try {
    const client = await getClient();
    const {
      data: { data },
    } = await client.read(get('VAULT_PREFIX_PATH').required().asString());
    return { ...data };
  } catch (error) {
    console.error('Error fetching key-values from Consul:', error);
    return null;
  }
}
