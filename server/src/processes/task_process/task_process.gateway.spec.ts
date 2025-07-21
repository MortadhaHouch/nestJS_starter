import { Test, TestingModule } from '@nestjs/testing';
import { TaskProcessGateway } from './task_process.gateway';
import { TaskProcessService } from './task_process.service';

describe('TaskProcessGateway', () => {
  let gateway: TaskProcessGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskProcessGateway, TaskProcessService],
    }).compile();

    gateway = module.get<TaskProcessGateway>(TaskProcessGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
