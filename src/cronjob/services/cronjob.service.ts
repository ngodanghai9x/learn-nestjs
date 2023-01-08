import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';
import { CronJob } from 'cron';
interface CreateJobDto {
  jobName: string;
  scheduleTime?: string;
}
@Injectable()
export class CronjobService {
  private readonly logger = new Logger(CronjobService.name);
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  async getOrCreateCronJob({
    scheduleTime = CronExpression.EVERY_30_MINUTES,
    jobName,
  }: CreateJobDto): Promise<CronJob> {
    if (!scheduleTime || !jobName) {
      throw new Error('scheduleTime, jobName are required');
    }
    try {
      const job = this.schedulerRegistry.getCronJob(jobName);
      this.logger.log(`Get existed job: ${jobName}`);
      return job;
    } catch (error) {
      const job = new CronJob(scheduleTime, async () => {
        const start = new Date();
        this.logger.log(`Start ${jobName} job with scheduleTime (${scheduleTime})!`);
      });

      this.schedulerRegistry.addCronJob(jobName, job);
      this.logger.log(`Created ${jobName} job with scheduleTime ${scheduleTime}`);

      return job;
    }
  }

  async startCronJob({ scheduleTime = CronExpression.EVERY_30_MINUTES, jobName }: CreateJobDto) {
    try {
      const job = await this.getOrCreateCronJob({ scheduleTime, jobName });
      job.start();
    } catch (error) {
      throw error;
    }
  }

  async stopCronJob(task: CreateJobDto) {
    try {
      const job = this.schedulerRegistry.getCronJob(task.jobName);
      job.stop();

      const lastTimeRun = job.lastDate() || new Date();

      this.logger.log(`Stop job ${task.jobName} at ${lastTimeRun}`);
    } catch (error) {
      this.logger.error(`There are no job with name ${task.jobName}`);
    }
  }
}
