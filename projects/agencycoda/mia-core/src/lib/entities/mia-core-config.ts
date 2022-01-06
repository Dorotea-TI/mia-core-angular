import { Injectable, InjectionToken } from "@angular/core";

export const MIA_CORE_PROVIDER = new InjectionToken<MiaCoreConfig>('agencycoda.core');

@Injectable()
export class MiaCoreConfig {
  baseUrl: string = '';
  v2?: boolean = false;
}