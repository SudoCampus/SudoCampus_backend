import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MajorsModule } from '../majors/majors.module';
import { DepartmentsModule } from 'src/departments/departments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      synchronize: false,
      autoLoadEntities: true,
    }),
    MajorsModule,
    DepartmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
