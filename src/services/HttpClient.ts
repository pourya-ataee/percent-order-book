import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
	timeout: Number(process.env.REACT_APP_API_REQUEST_TIMEOUT) || 10000,
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
				toast.error("Network Error");
			}
			return Promise.reject(error);
		}

		const { status } = error.response;
		const errorMessages: Record<number, string> = {
			500: "Internal Server Error",
			404: "404 - Not Found",
		};

		if (typeof window !== "undefined") {
			toast.error(errorMessages[status] || "Something went wrong...");
		}

		return Promise.reject(error);
	},
);

const request = async <T, R>(method: AxiosRequestConfig["method"], config: AxiosRequestConfig, mapper: (data: T) => T | R = (d) => d): Promise<T | R> => {
	const response: AxiosResponse = await axiosClient.request({ method, ...config });
	return mapper(response.data?.data);
};

export const httpClient = {
	get: <T, R = never>(config: AxiosRequestConfig, mapper?: (data: T) => T | R) => request<T, R>("GET", config, mapper),
	post: <T, R = never>(config: AxiosRequestConfig, mapper?: (data: T) => T | R) => request<T, R>("POST", config, mapper),
	put: <T, R = never>(config: AxiosRequestConfig, mapper?: (data: T) => T | R) => request<T, R>("PUT", config, mapper),
	delete: <T, R = never>(config: AxiosRequestConfig, mapper?: (data: T) => T | R) => request<T, R>("DELETE", config, mapper),
};
