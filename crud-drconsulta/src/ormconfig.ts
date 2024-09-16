import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sql',
  synchronize: true, // deixar sync ligado apenas em dev, tirar em prod
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

