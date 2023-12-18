import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import asyncHandler from '@/helpers/asyncHandler';
import { MapController } from '../controllers/map.controller';
export class MapRoute implements Routes {
  public path = '/map';
  public router = Router();
  public map = new MapController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/insert-data`, asyncHandler(this.map.insertData));

    this.router.get(`${this.path}/hashMap-arrayMap/str-int`, asyncHandler(this.map.getMapHashMapArrayMapStrInt));
  }
}
