import { Test, TestingModule } from '@nestjs/testing';
import { PurchasedItemsService } from './purchased_items.service';

describe('PurchasedItemsService', () => {
  let service: PurchasedItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchasedItemsService],
    }).compile();

    service = module.get<PurchasedItemsService>(PurchasedItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
