import { Test, TestingModule } from '@nestjs/testing';
import { PurchasedItemsController } from './purchased_items.controller';
import { PurchasedItemsService } from './purchased_items.service';

describe('PurchasedItemsController', () => {
  let controller: PurchasedItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasedItemsController],
      providers: [PurchasedItemsService],
    }).compile();

    controller = module.get<PurchasedItemsController>(PurchasedItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
