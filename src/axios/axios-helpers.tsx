import axios, { AxiosInstance } from '../../node_modules/axios';
import React from 'react';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from './axios-consts';
import AxiosToastContent from './axios-toast-content';

/** Создание настроенного кастомного экземпляра Axios. */
export const createAxiosInstance = (): AxiosInstance => {
  /**
   * Функция для обработки стандартных HTTP-статусных кодов.
   */
  const handleHttpStatusCodes = (
    statusCode: number,
    url: string,
    statusText: string
  ): string => {
    switch (statusCode) {
      case 400:
        return "Неверный запрос (400)";
      case 401:
        return "Необходима аутентификация (401)";
      case 403:
        return "Доступ запрещен (403)";
      case 404:
        return `Ресурс не найден (404): ${url}`;
      case 500:
        return "Внутренняя ошибка сервера (500)";
      default:
        return `Ошибка сервера ${statusCode}: ${statusText}`;
    }
  };

  /**
   * Обработчик ошибок для перехватчика ответов.
   */
  const errorHandler = (error: any) => {
    let message = 'Ошибка';
    let details = '';

    // Если запрос был отменен, не будем выводить об этом ошибку.
    if (axios.isCancel(error)) {
      return;
    }

    // Проверяем, получен ли ответ от сервера
    if (error.response) {
      const statusCode = error.response.status;
      const statusText = error.response.statusText;
      const requestUrl = error.response.config.url;
      const data = error.response.data;

      // Обработка ошибок OData
      if (data && data.error) {
        const oDataErrorMessage = data.error.message.value;
        message = oDataErrorMessage || `Ошибка OData ${statusCode}: ${statusText}`;
        details = JSON.stringify(data.error, null, 2);
      } else {
        // Обработка обычных HTTP ошибок
        message = handleHttpStatusCodes(statusCode, requestUrl, statusText);
        details = JSON.stringify(data, null, 2);
        details = data;
      }
    } else if (error.request) {
      // Запрос отправлен, но ответ не получен
      details = 'Ответ от сервера не получен.';
    } else {
      // Ошибка при формировании запроса
      details = 'Ошибка запроса: ' + error.message;
    }

    toast.error(<AxiosToastContent message={message} details={details} />, TOAST_CONFIG);

    return Promise.reject({ ...error });
  };

  /** Создание экземпляра Axios с настроенными заголовками. */
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "",
    withCredentials: process.env.REACT_APP_WITH_CREDENTIALS === 'true',
    headers: {
      common: {
        'Content-Type': 'application/json;odata=verbose',
        Accept: 'application/json;odata=verbose',
      },
    },
  });

  /**
   * Установка перехватчика ошибок для экземпляра Axios.
   * При любой ошибке ответа будет вызываться errorHandler.
   */
  axiosInstance.interceptors.response.use(
    response => response,
    error => errorHandler(error),
  );

  return axiosInstance;
};
