import { Controller, Get, Post, Body, UseInterceptors, StreamableFile } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { MyForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger/dist';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Header, Res, UploadedFile, UploadedFiles } from '@nestjs/common/decorators';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiFile, ApiFileFields, ApiFiles } from 'src/common/decorators/files.decorator';
import { ParseFile } from 'src/common/pipes/parse-file.pipe';
import { join } from 'path';
import { createReadStream } from 'fs';
import type { Response } from 'express';
import { Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Readable, Writable } from 'stream';
import mime = require('mime');

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
  // @Header('Content-Type', 'application/json')
  // @Header('Content-Disposition', 'attachment; filename="package.json"')
  getStaticFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const fullPath = join(process.cwd(), 'package.json');
    const file = createReadStream(fullPath);

    res.set({
      'Content-Type': mime.getType(fullPath) || 'application/octet-stream',
      // 'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }

  @Get('download2')
  @Header('Content-Type', 'text/plain')
  @Header('Content-Disposition', 'attachment; filename="download2.txt"')
  async getStaticFile2(@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    const url =
      'https://cdn.discordapp.com/attachments/1057908213867094076/1063015944873594940/image.png';
    const mapData = (res) => res.data;
    const files = await Promise.all([
      fetch(url).then((res) => res.arrayBuffer()),
      axios({
        method: 'get',
        url,
        responseType: 'arraybuffer',
      }).then(mapData),
      // axios({
      //   method: 'get',
      //   url,
      // }).then(mapData),
      // axios({
      //   method: 'get',
      //   url,
      //   responseType: 'blob',
      // }).then(mapData),
      // axios({
      //   method: 'get',
      //   url,
      //   responseType: 'stream',
      // }).then(mapData),
    ]);
    console.log('🚀  file0', files[0]);
    console.log('🚀  file1', files[1]);
    // console.log('🚀  file2', files[2]);
    // console.log('🚀  file3', files[3]);
    // console.log('🚀  file4', files[4]);
    // res.set({
    //   'Content-Type': 'application/json',
    //   'Content-Disposition': 'attachment; filename="package.json"',
    // });
    return new StreamableFile(null);
  }

  @Get('download3')
  @Header('Content-Disposition', 'attachment; filename="image.png"')
  async getStaticFile3(@Res({ passthrough: true }) res: Response) {
    const url =
      'https://cdn.discordapp.com/attachments/1057908213867094076/1063015944873594940/image.png';
    const mapData = (res: AxiosResponse<ArrayBuffer, any>) => res.data;
    function getReadableStream(buffer: Buffer): Readable {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);
      return stream;
    }
    const files = await Promise.all([
      axios({
        method: 'get',
        url,
        responseType: 'arraybuffer',
      }).then(mapData),
    ]);
    const buffer = Buffer.from(files[0]);
    // const stream = getReadableStream(buffer);
    // res.pipe(stream as Writable);
    res.set({
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
    });
    // return stream.pipe(res);
    return res.end(buffer, 'binary');
  }

  @Get('download4')
  getStaticFile4(
    @Query() getStaticFileDto: GetStaticFileDto,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const stream = createReadStream(getStaticFileDto.fullPath);

    //   '': 'application/json',
    //   'Content-Disposition': 'attachment; filename="package.json"',
    res.header(
      'Content-Type',
      getStaticFileDto.mimeType ||
        mime.getType(getStaticFileDto.fullPath) ||
        'application/octet-stream',
    );
    return new StreamableFile(stream);
  }
}
