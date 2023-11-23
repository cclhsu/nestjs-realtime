import { Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

const logger: Logger = new Logger('ApiUtils');
const DEFAULT_RETRIES: number = 0;
const DEFAULT_TIMEOUT: number = 5000;
const DEFAULT_RETRIES_TIMEOUT: number = 1000;

// Function to perform an HTTP request
async function httpRequest<T, U>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE',
  url: string,
  data?: U,
  jwt?: string,
  retries: number = DEFAULT_RETRIES,
): Promise<T> {
  logger.verbose(
    `[httpRequest] method: ${method}, url: ${url}, data: ${JSON.stringify(
      data,
      null,
      2,
    )}, jwt: ${jwt}, retries: ${retries}`,
  );
  const config: any = {};

  if (jwt) {
    // If a JWT token is provided, include it in the request headers
    config.headers = {
      Authorization: `Bearer ${jwt}`,
    };
  }

  try {
    const response: AxiosResponse<T> = await axios.request<T>({
      url,
      method,
      data,
      timeout: DEFAULT_TIMEOUT,
      ...config,
    });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else if (!response.data) {
      return {} as T; // If the response data is empty, return an empty object
    }
    logger.verbose(`[httpRequest] Response data: : ${JSON.stringify(response.data, null, 2)}`);
    return response.data as T;
  } catch (error: any) {
    logger.error(`${method} request to ${url} failed: ${error.message}`);
    if (retries > 0) {
      // Retry the request after a delay
      await new Promise((resolve) => setTimeout(resolve, DEFAULT_RETRIES_TIMEOUT));
      return httpRequest(method, url, data, jwt, retries - 1);
    } else {
      // No more retries, log the error
      throw error;
    }
  }
}

// Function to perform a GET request
export async function getRequest<T>(endpoint: string, jwt?: string): Promise<T> {
  logger.verbose(`[getRequest] endpoint: ${endpoint}`);
  return httpRequest('GET', endpoint, undefined, jwt);
}

// Function to perform a POST request
export async function postRequest<T, U>(endpoint: string, data: U, jwt?: string): Promise<T> {
  logger.verbose(`[postRequest] endpoint: ${endpoint}`);
  logger.verbose(`[postRequest] data: ${JSON.stringify(data, null, 2)}`);
  return httpRequest('POST', endpoint, data, jwt);
}

// Function to perform a PUT request
export async function putRequest<T, U>(endpoint: string, data: U, jwt?: string): Promise<T> {
  logger.verbose(`[putRequest] endpoint: ${endpoint}`);
  logger.verbose(`[putRequest] data: ${JSON.stringify(data, null, 2)}`);
  return httpRequest('PUT', endpoint, data, jwt);
}

// Function to perform a DELETE request
export async function deleteRequest<T>(endpoint: string, jwt?: string): Promise<T> {
  logger.verbose(`[deleteRequest] endpoint: ${endpoint}`);
  return httpRequest('DELETE', endpoint, undefined, jwt);
}

// Function to perform a PATCH request
export async function patchRequest<T, U>(endpoint: string, data: U, jwt?: string): Promise<T> {
  logger.verbose(`[patchRequest] endpoint: ${endpoint}`);
  logger.verbose(`[patchRequest] data: ${JSON.stringify(data, null, 2)}`);
  return httpRequest('PATCH', endpoint, data, jwt);
}

// Function to perform a HEAD request
export async function headRequest<T>(endpoint: string, jwt?: string): Promise<T> {
  logger.verbose(`[headRequest] endpoint: ${endpoint}`);
  return httpRequest('HEAD', endpoint, undefined, jwt);
}

// Function to perform an OPTIONS request
export async function optionsRequest<T>(endpoint: string, jwt?: string): Promise<T> {
  logger.verbose(`[optionsRequest] endpoint: ${endpoint}`);
  return httpRequest('OPTIONS', endpoint, undefined, jwt);
}

// Function to perform a CONNECT request
export async function connectRequest<T>(endpoint: string, jwt?: string): Promise<T> {
  logger.verbose(`[connectRequest] endpoint: ${endpoint}`);
  return httpRequest('CONNECT', endpoint, undefined, jwt);
}

// Function to perform a TRACE request
export async function traceRequest<T>(endpoint: string, jwt?: string): Promise<T> {
  logger.verbose(`[traceRequest] endpoint: ${endpoint}`);
  return httpRequest('TRACE', endpoint, undefined, jwt);
}

export default {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest,
  headRequest,
  optionsRequest,
  connectRequest,
  traceRequest,
};
