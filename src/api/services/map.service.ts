import { Service } from 'typedi';
import { MapModel } from '@/models/map.model';
import { HttpException } from '@/helpers/exceptions/HttpException';
import { size_array_contants } from '@/constants/index';
@Service()
export class MapService {
  public async insertData(payload): Promise<any> {
    const { map_structure, data_type, size_array, insertion, iteration, random_query, deletion, _memory_usage } = payload;

    const findMap = await MapModel.findOne({ map_structure, data_type, size_array }).lean();
    if (findMap) {
      const { cpu_time } = findMap;
      cpu_time.insertion.push(insertion);
      cpu_time.iteration.push(iteration);
      cpu_time.random_query.push(random_query);
      cpu_time.deletion.push(deletion);
      console.log('🚀 ~ file: map.service.ts:12 ~ MapService ~ insertData ~ u:', cpu_time);

      const { memory_usage } = findMap;
      memory_usage.push(_memory_usage);
      console.log('🚀 ~ file: map.service.ts:19 ~ MapService ~ insertData ~ memory_usage:', memory_usage);

      await MapModel.findOneAndUpdate(
        { map_structure, data_type, size_array },
        {
          cpu_time,
          memory_usage,
        },
      );
    } else {
      const cpu_time = {
        insertion: [insertion],
        iteration: [iteration],
        random_query: [random_query],
        deletion: [deletion],
      };

      return await MapModel.create({
        map_structure,
        data_type,
        size_array,
        cpu_time,
        memory_usage: _memory_usage,
      });
    }
  }

  public async getMapHashMapArrayMapStrInt({ map_structure_arrays, data_type }): Promise<any> {
    const dataInsertion = [
      { map: 'HashMap', x: 0, y: 0 },
      { map: 'ArrayMap', x: 0, y: 0 },
    ];
    const dataIteration = [
      { map: 'HashMap', x: 0, y: 0 },
      { map: 'ArrayMap', x: 0, y: 0 },
    ];

    const dataRandomQuery = [
      { map: 'HashMap', x: 0, y: 0 },
      { map: 'ArrayMap', x: 0, y: 0 },
    ];

    const dataDeletion = [
      { map: 'HashMap', x: 0, y: 0 },
      { map: 'ArrayMap', x: 0, y: 0 },
    ];

    const dataMemoryUsage = [
      { map: 'HashMap', x: 0, y: 0 },
      { map: 'ArrayMap', x: 0, y: 0 },
    ];

    // convert ['hashMap', 'arrayMap'] => [{ map_structure: 'hashMap' }, { map_structure: 'arrayMap' }]
    const convertMapStructure = (map_structure_arrays: string[]) => {
      return map_structure_arrays.map(item => ({ map_structure: item }));
    };
    // Giả sử bạn có một mảng chứa dữ liệu ban đầu
    const initialData = await MapModel.find({
      $or: convertMapStructure(map_structure_arrays),
      data_type: data_type,
    }).lean();
    console.log('🚀 ~ file: map.service.ts:85 ~ MapService ~ getMapHashMapArrayMapStrInt ~ initialData:', initialData);

    if (!initialData) {
      return null;
    }

    size_array_contants.forEach(item => {
      console.log('🚀 ~ file: map.service.ts:91 ~ MapService ~ getMapHashMapArrayMapStrInt ~ item:', item);
      initialData.forEach(item2 => {
        console.log('🚀 ~ file: map.service.ts:93 ~ MapService ~ getMapHashMapArrayMapStrInt ~ item2:', item2.size_array);

        const { cpu_time, memory_usage } = item2;
        const { insertion, iteration, random_query, deletion } = cpu_time;
        const insertion_avg = insertion.reduce((a, b) => a + b, 0) / insertion.length;
        const iteration_avg = iteration.reduce((a, b) => a + b, 0) / iteration.length;
        const random_query_avg = random_query.reduce((a, b) => a + b, 0) / random_query.length;
        const deletion_avg = deletion.reduce((a, b) => a + b, 0) / deletion.length;
        const memory_usage_avg = memory_usage.reduce((a, b) => a + b, 0) / memory_usage.length;

        if (+item === +item2.size_array) {
          console.log('🚀 ~ file: map.service.ts:101 ~ MapService ~ getMapHashMapArrayMapStrInt ~ item2:', item2);

          dataInsertion.push({ map: item2.map_structure, x: item, y: insertion_avg });
          dataIteration.push({ map: item2.map_structure, x: item, y: iteration_avg });
          dataRandomQuery.push({ map: item2.map_structure, x: item, y: random_query_avg });
          dataDeletion.push({ map: item2.map_structure, x: item, y: deletion_avg });
          dataMemoryUsage.push({ map: item2.map_structure, x: item, y: memory_usage_avg });
        }
      });
    });

    return {
      dataInsertion,
      dataIteration,
      dataRandomQuery,
      dataDeletion,
      dataMemoryUsage,
    };
  }
}
