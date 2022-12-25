import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MyForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger/dist';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor.ts';
import { sleep } from 'src/common/utils/sleep';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UploadedFiles } from '@nestjs/common/decorators';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('file')
@ApiTags('file')
// @UseInterceptors(LoggingInterceptor)
export class FileController {
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file')) // 👈 field name must match
  testUploadFile(@Body() body, @UploadedFile() file: Express.Multer.File) {
    console.log('🚀 ~testUploadedFiles body', body);
    console.log('🚀 ~testUploadedFiles file', file);
  }

  @Post('uploadFiles')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'integer' },
        files: {
          type: 'array', // 👈  array of files
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  // @UseInterceptors(FileExtender)
  @UseInterceptors(FilesInterceptor('files'))
  testUploadedFiles(@Body() body, @UploadedFiles() files: Express.Multer.File[]) {
    console.log('🚀 ~testUploadedFiles body', body);
    console.log('🚀 ~testUploadedFiles files', files);
  }

  @Post('uploadFields')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // 👈  field names need to be repeated for swagger
        name: {
          type: 'string',
        },
        avatar: {
          type: 'string',
          format: 'binary',
        },
        background: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      // 👈  multiple files with different field names
      { name: 'avatar', maxCount: 2 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  testUploadMultipleFiles(
    @Body() body,
    @UploadedFiles()
    bodyFiles: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    console.log('🚀 ~ body', body);
    // console.log('🚀 ~ bodyFiles', bodyFiles);
    console.log('🚀 ~ avatar', bodyFiles?.avatar);
    console.log('🚀 ~ background', bodyFiles?.background);
  }
}
