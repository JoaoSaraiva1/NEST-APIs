import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { PriceHistoryModule } from './price_history/price_history.module';
import { PurchasedItemsModule } from './purchased_items/purchased_items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'joaoename',
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ItemsModule,
    PriceHistoryModule,
    PurchasedItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//Use autoLoadEntities: true to avoid having to declare all the Entities
//https://docs.nestjs.com/techniques/database#auto-load-entities
