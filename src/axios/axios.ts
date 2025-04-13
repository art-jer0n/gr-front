import { AxiosService } from './axios-service';
import { AxiosPromise, AxiosRequestConfig, AxiosInstance } from '../../node_modules/axios';
import { createAxiosInstance } from './axios-helpers';

/** Экземпляр кастомного Axios. */
export const Axios: AxiosService = (() => {

  /** Создание настроенного кастомного экземпляра Axios. */
  const axiosInstance: AxiosInstance = createAxiosInstance();

  /**
   * Отправка GET-запроса.
   * @param url URL-адрес ресурса для запроса.
   * @param config Необязательная конфигурация запроса.
   */
  const GET = (url: string, config?: AxiosRequestConfig): AxiosPromise => {
    return axiosInstance.get(url, config);
  };

  /**
   * Отправка POST-запроса.
   * @param url URL-адрес ресурса для запроса.
   * @param data Данные для отправки в теле запроса.
   * @param config Необязательная конфигурация запроса.
   */
  const POST = (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise => {
    return axiosInstance.post(url, data, config);
  };

  /**
   * Отправка PUT-запроса.
   * @param url URL-адрес ресурса для запроса.
   * @param data Данные для отправки в теле запроса.
   * @param config Необязательная конфигурация запроса.
   */
  const PUT = (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise => {
    return axiosInstance.put(url, data, config);
  };

  /**
   * Отправка PATCH-запроса.
   * @param url URL-адрес ресурса для запроса.
   * @param data Данные для отправки в теле запроса.
   * @param config Необязательная конфигурация запроса.
   */
  const PATCH = (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise => {
    return axiosInstance.patch(url, data, config);
  };

  /**
   * Отправка DELETE-запроса.
   * @param url URL-адрес ресурса для запроса.
   * @param config Необязательная конфигурация запроса.
   */
  const DELETE = (url: string, config?: AxiosRequestConfig): AxiosPromise => {
    return axiosInstance.delete(url, config);
  };

  return {
    get: GET,
    post: POST,
    put: PUT,
    patch: PATCH,
    delete: DELETE,
  };
})();
