import { Test, TestingModule } from '@nestjs/testing';
import { TaskProcessService } from './task_process.service';

describe('TaskProcessService', () => {
  let service: TaskProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskProcessService],
    }).compile();

    service = module.get<TaskProcessService>(TaskProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
