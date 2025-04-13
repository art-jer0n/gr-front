import { AxiosPromise, AxiosRequestConfig } from '../../node_modules/axios';

/**
 * Интерфейс сервиса axios, определяющий основные запросы.
 */
export interface AxiosService {
  /**
   * Отправка GET-запроса.
   * @param url URL-адрес ресурса для запроса.
   * @param config Необязательная конфигурация запроса.
   */
  get(url: string, config?: AxiosRequestConfig): AxiosPromise;

  /**
   * Отправка POST-запроса.
   * @param url URL-адрес ресурса для запроса.
   * @param data Данные для отправки в теле запроса.
   * @param config Необязательная конфигурация запроса.
   */
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

  /**
   * Отправка PUT-запроса.
   * @param url URL-адрес ресурса для запроса.
   * @param data Данные для отправки в теле запроса.
   * @param config Необязательная конфигурация запроса.
   */
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

  /**
   * Отправка PATCH-запроса.
   * @param url URL-адрес ресурса для запроса.
   * @param data Данные для отправки в теле запроса.
   * @param config Необязательная конфигурация запроса.
   */
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

  /**
   * Отправка DELETE-запроса.
   * @param url URL-адрес ресурса для запроса.
   * @param config Необязательная конфигурация запроса.
   */
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
}
