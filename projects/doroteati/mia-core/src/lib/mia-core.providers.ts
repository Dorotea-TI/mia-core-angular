import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MiaCoreConfig, MIA_CORE_PROVIDER } from './entities/mia-core-config';
import {
  MiaGoogleStorage,
  MIA_GOOGLE_STORAGE_PROVIDER,
} from './services/google-storage.service';

export interface MiaCoreProvidersConfig {
  core?: Partial<MiaCoreConfig>;
  googleStorage?: Partial<MiaGoogleStorage>;
}

export function provideMiaCore(
  config: MiaCoreProvidersConfig = {}
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: MIA_CORE_PROVIDER,
      useFactory: () => {
        const instance = new MiaCoreConfig();
        Object.assign(instance, config.core);
        return instance;
      },
    },
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useFactory: () => {
        const instance = new MiaGoogleStorage();
        Object.assign(instance, config.googleStorage);
        return instance;
      },
    },
  ]);
}
