import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterField, MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { AppendLogParamInterceptor } from '../interceptors/append-log-param.interceptor';

export type UploadFields = MulterField & { required?: boolean };

export function AppendLogParam(customValue: string) {
    // const apiBody = ApiBody({
    //   schema: {
    //     type: 'object',
    //     properties: bodyProperties,
    //     required: uploadFields.filter((f) => f.required).map((f) => f.name),
    //   },
    // });

    return applyDecorators(
        SetMetadata('customValue', customValue),
        UseInterceptors(AppendLogParamInterceptor),
        // ApiConsumes('multipart/form-data'),
        // apiBody,
    );
}
