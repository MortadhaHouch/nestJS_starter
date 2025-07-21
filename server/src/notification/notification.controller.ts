/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { AuthenticatedRequest, NotificationType } from 'utils/types';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(
    @Body() createNotificationDto: CreateNotificationDto
  ) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findAll(
    @Req() req: AuthenticatedRequest,
    @Param('p') p?:number
  ) {
    return this.notificationService.findAll(req.user._id,p);
  }

  @Get(':id')
  findOne(
    @Req() req: AuthenticatedRequest
  ) {
    return this.notificationService.findOne(req.user._id);
  }
  @Get("/status/:status")
  findByStatus(
    @Req() req: AuthenticatedRequest,
    @Param('status') status?:NotificationType,
    @Param('p') p?:number
  ) {
    return this.notificationService.findByStatus(req.user._id,status,p);
  }
}
