import { Test, TestingModule } from '@nestjs/testing';
import { NotificationProcessesGateway } from './notification_processes.gateway';
import { NotificationProcessesService } from './notification_processes.service';

describe('NotificationProcessesGateway', () => {
  let gateway: NotificationProcessesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationProcessesGateway, NotificationProcessesService],
    }).compile();

    gateway = module.get<NotificationProcessesGateway>(NotificationProcessesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
