import type {AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import axios from 'axios'

interface ResultData<T> {
  code: number
  data: T
  msg?: string
}

const config = {
  // withCredentials: true
}

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // const token = localStorage.getItem('token') || ''
        return {
          ...config,
          headers: {
            // 'x-access-token': token
          }
        }
      },
      (error: AxiosError) => {
        Promise.reject(error)
      }
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const {data, config} = response
        if (data.code !== 0) {
          return Promise.reject(data)
        }
        return data;
      },
      (error: AxiosError) => {
        const {response} = error;
        if (response) {
          console.log(response)
        }
      }
    )
  }

  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, {params});
  }
  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params);
  }
  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params);
  }
  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, {params});
  }
}

// 导出一个实例对象
export default new RequestHttp(config)
