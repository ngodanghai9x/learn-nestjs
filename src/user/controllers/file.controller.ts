import { Controller, Get, Post, Body, UseInterceptors, StreamableFile } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MyForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger/dist';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor.ts';
import { sleep } from 'src/common/utils/sleep';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Header, Res, UploadedFile, UploadedFiles } from '@nestjs/common/decorators';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiFile, ApiFileFields, ApiFiles } from 'src/common/decorators/files.decorator';
import { ParseFile } from 'src/common/pipes/parse-file.pipe';
import { join } from 'path';
import { createReadStream } from 'fs';
import type { Response } from 'express';
import { Logger } from '@nestjs/common';

@Controller('file')
@ApiTags('file')
// @UseInterceptors(LoggingInterceptor)
export class FileController {
  private readonly logger = new Logger(FileController.name);

  @Post('upload')
  @ApiFile({
    name: { type: 'string' },
    age: { type: 'integer' },
  })
  // https://notiz.dev/blog/type-safe-file-uploads
  testUploadFile(@Body() body, @UploadedFile(ParseFile) file: Express.Multer.File) {
    this.logger.log('🚀 ~testUploadedFiles body', body);
    this.logger.log('🚀 ~testUploadedFiles file', file);
  }

  @Post('uploadFiles')
  @ApiConsumes('multipart/form-data')
  @ApiFiles(
    {
      name: { type: 'string' },
      age: { type: 'integer' },
    },
    'filesParams',
  )
  // @UseInterceptors(FileExtender)
  testUploadedFiles(@Body() body, @UploadedFiles(ParseFile) filesParams: Express.Multer.File[]) {
    this.logger.log('🚀 ~testUploadedFiles body', body);
    this.logger.log('🚀 ~testUploadedFiles files', filesParams);
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
    @UploadedFiles(ParseFile)
    bodyFiles: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    this.logger.log('🚀 ~ body', body);
    // this.logger.log('🚀 ~ bodyFiles', bodyFiles);
    this.logger.log('🚀 ~ avatar', bodyFiles?.avatar);
    this.logger.log('🚀 ~ background', bodyFiles?.background);
  }

  @Post('v2/uploadFields')
  @ApiFileFields([
    { name: 'avatar', maxCount: 1, required: true },
    { name: 'background', maxCount: 1 },
  ])
  uploadMultipleFiles(@UploadedFiles(ParseFile) files: Express.Multer.File[]) {
    this.logger.log(files);
  }

  @Get('download')
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  getStaticFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    // res.set({
    //   'Content-Type': 'application/json',
    //   'Content-Disposition': 'attachment; filename="package.json"',
    // });
    return new StreamableFile(file);
  }
}
