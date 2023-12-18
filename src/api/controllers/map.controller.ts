import { Request, Response } from 'express';
import { Container } from 'typedi';
import { Created, OK } from '@/helpers/valid_responses/success.response';
import { HttpException } from '@/helpers/exceptions/HttpException';
import { MapService } from '../services/map.service';
import { _mapStructure, _dataType } from '@/constants';
export class MapController {
  public map = new MapService();
  public insertData = async (req: Request, res: Response) => {
    const { map_structure, data_type, size_array, insertion, iteration, random_query, deletion, _memory_usage } = req.body;
    if (!map_structure || !data_type || !size_array || !insertion || !iteration || !random_query || !deletion || !_memory_usage) {
      throw new HttpException(400, 'Bad request');
    }

    if (!_mapStructure.includes(map_structure) || !_dataType.includes(data_type)) {
      throw new HttpException(400, 'Bad request');
    }

    const result = await this.map.insertData({
      map_structure,
      data_type,
      size_array,
      insertion,
      iteration,
      random_query,
      deletion,
      _memory_usage,
    });

    new Created({
      message: 'Data inserted successfully',
      data: result,
    }).send(res);
  };

  public getMapHashMapArrayMapStrInt = async (req: Request, res: Response) => {
    const result = await this.map.getMapHashMapArrayMapStrInt({
      map_structure_arrays: ['hashMap', 'arrayMap'],
      data_type: 's-i',
    });
    new OK({
      message: 'Get data successfully',
      data: result,
    }).send(res);
  };
}
