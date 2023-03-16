import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';
import axios from 'axios';

@Injectable()
export class ExternalService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(ExternalService.name);
  private readonly pokeUri = 'https://pokeapi.co/api/v2';
  private readonly tcbsUri = 'https://athenaaws.tcbs.com.vn/athena/v1';
  private readonly dogUri = 'https://api.thedogapi.com';

  getPokemon(idOrName: string): Observable<AxiosResponse<object>> {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      // Authorization: `Basic ${encodeToken}`,
    };
    return this.httpService
      .get(`${this.pokeUri}/contest-type/${idOrName}`, { headers, responseType: 'json' })
      .pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data || error);
          throw error;
        }),
        map((resp) => {
          // console.log('🚀  ~ getPokemon ~ resp', resp?.data);
          // return JSON.parse(JSON.stringify(resp?.data));
          return resp?.data;
        }),
      );
  }

  async getPokemon2(idOrName: string = '2'): Promise<object> {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      // Authorization: `Basic ${encodeToken}`,
    };
    const data = await firstValueFrom(
      this.httpService.get(`${this.pokeUri}/contest-type/${idOrName}`, { headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data || error);
          throw error;
        }),
        map((resp) => {
          console.log('🚀  ~ getPokemon2 ~ resp', resp?.data);
          return resp?.data;
        }),
      ),
    );
    return data;
  }

  async getPokemon3(): Promise<AxiosResponse<object>> {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      // Authorization: `Basic ${encodeToken}`,
    };
    // const resp = await axios.get(`${this.pokeUri}/contest-type/3`);
    const resp = await this.httpService.axiosRef.get(`${this.pokeUri}/contest-type/3`, {
      headers,
      responseType: 'json',
    });

    // console.log('🚀  ~ getPokemon3 ~ resp', resp?.data);
    return resp?.data;
  }

  getWorldIndexes(): Observable<AxiosResponse<object>> {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      // Authorization: `Basic ${encodeToken}`,
    };
    return this.httpService
      .get(`${this.tcbsUri}/worldIndexes`, { headers, responseType: 'json' })
      .pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data || error);
          throw error;
        }),
        map((resp) => {
          return resp?.data;
        }),
      );
  }

  async getWorldIndexes2(): Promise<AxiosResponse<object>> {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `live_giimrGf6zVewPQkRu88rCVPxQlGnU4auxYAdizTx1tZVMHw6oJg8SV2TWyv1dg52`,
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      // Authorization: `Basic ${encodeToken}`,
    };
    // const resp = await axios.get(`${this.tcbsUri}/worldIndexes`);
    const resp = await axios.get(`${this.dogUri}/v1/breeds?limit=5&page=0`, {
      headers,
      responseType: 'json',
    });
    return resp?.data;
  }

  getDogs(): Observable<AxiosResponse<object>> {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': `live_giimrGf6zVewPQkRu88rCVPxQlGnU4auxYAdizTx1tZVMHw6oJg8SV2TWyv1dg52`,
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      // Authorization: `Basic ${encodeToken}`,
    };
    return this.httpService
      .get(`${this.dogUri}/v1/breeds?limit=5&page=0`, { headers, responseType: 'json' })
      .pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data || error);
          throw error;
        }),
        map((resp) => {
          return resp?.data;
          // return JSON.parse(JSON.stringify(resp?.data));
        }),
      );
  }
}
