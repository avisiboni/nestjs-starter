import { SetMetadata } from '@nestjs/common';

//Define the key for Anonymous access for the end point
export const ALLOW_ANONYMOUS_KEY = 'allowAnonymous';

//Definition of the decorator for allowing anonymous access for the end point
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS_KEY, true);
