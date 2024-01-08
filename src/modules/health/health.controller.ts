import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller({ path: 'health' })
@ApiTags('Health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get('disk')
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.disk.checkStorage('Storage', {
          path: '/',
          thresholdPercent: 5,
        }),
      () => this.memory.checkHeap('memoryHeap', 150 * 1024 * 1024),
    ]);
  }
}
