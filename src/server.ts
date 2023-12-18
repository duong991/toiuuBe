import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { MapRoute } from './api/routes/map.route';

ValidateEnv();

const app = new App([new MapRoute()]);

app.listen();
