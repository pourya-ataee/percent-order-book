import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL;
const timeout = import.meta.env.VITE_REQUEST_TIMEOUT;
const axiosClient = axios.create({
	baseURL: baseURL,
	timeout: Number(timeout) || 10000,
});

axiosClient.interceptors.request.use(async (config) => {
	config.headers["Access-Control-Allow-Origin"] = "*";
	config.headers["Access-Control-Allow-Credentials"] = false;
	return config;
});

axiosClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (!error.response) {
			if (typeof window !== "undefined") {
				toast.error("خطای شبکه! لطفاً اتصال اینترنت خود را بررسی کنید");
			}
			return Promise.reject(error);
		}

		const { status } = error.response;
		const errorMessages: Record<number, string> = {
			500: "خطای داخلی سرور! لطفاً بعداً دوباره امتحان کنید",
			404: "صفحه مورد نظر یافت نشد",
		};

		if (typeof window !== "undefined") {
			toast.error(errorMessages[status] || "خطایی رخ داده است. لطفاً دوباره تلاش کنید");
		}

		return Promise.reject(error);
	},
);

const request = async <T, R>(method: AxiosRequestConfig["method"], config: AxiosRequestConfig, mapper: (data: T) => T | R = (d) => d): Promise<T | R> => {
	const response: AxiosResponse = await axiosClient.request({ method, ...config });
	return mapper(response?.data);
};

export const httpClient = {
	get: <T, R = never>(config: AxiosRequestConfig, mapper?: (data: T) => T | R) => request<T, R>("GET", config, mapper),
	post: <T, R = never>(config: AxiosRequestConfig, mapper?: (data: T) => T | R) => request<T, R>("POST", config, mapper),
	put: <T, R = never>(config: AxiosRequestConfig, mapper?: (data: T) => T | R) => request<T, R>("PUT", config, mapper),
	delete: <T, R = never>(config: AxiosRequestConfig, mapper?: (data: T) => T | R) => request<T, R>("DELETE", config, mapper),
};
