import { Test, TestingModule } from '@nestjs/testing';
import { NotificationProcessesService } from './notification_processes.service';

describe('NotificationProcessesService', () => {
  let service: NotificationProcessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationProcessesService],
    }).compile();

    service = module.get<NotificationProcessesService>(NotificationProcessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
