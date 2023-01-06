import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';

import { Observable, catchError } from 'rxjs';

@Injectable()
export class ExternalService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(ExternalService.name);
  private readonly pokeUri = 'https://pokeapi.co/api/v2';
  private readonly tcbsUri = 'https://athenaaws.tcbs.com.vn/athena/v1';

  getPokemon(idOrName: string): Observable<AxiosResponse<object>> {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: '*/*',
      // Authorization: `Basic ${encodeToken}`,
    };
    return this.httpService.get(`${this.pokeUri}/pokemon/${idOrName}`, { headers }).pipe(
      catchError((error: AxiosError) => {
        this.logger.error(error.response?.data || error);
        throw error;
      }),
    );
  }

  getWorldIndexes(): Observable<AxiosResponse<object>> {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: '*/*',
      // Authorization: `Basic ${encodeToken}`,
    };
    return this.httpService.get(`${this.tcbsUri}/worldIndexes`, { headers }).pipe(
      catchError((error: AxiosError) => {
        this.logger.error(error.response?.data || error);
        throw error;
      }),
    );
  }

  async getWorldIndexes2(): Promise<AxiosResponse<object>> {
    const headers = {
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // Accept: '*/*',
      // Authorization: `Basic ${encodeToken}`,
    };
    return axios.get(`${this.pokeUri}/pokemon/1`);
    return axios.get(`${this.tcbsUri}/worldIndexes`);
  }

  getWorldIndexes3(): Promise<AxiosResponse<object>> {
    const headers = {
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // Accept: '*/*',
      // Authorization: `Basic ${encodeToken}`,
    };
    return this.httpService.axiosRef.get(`${this.tcbsUri}/worldIndexes`, { headers });
  }
}
