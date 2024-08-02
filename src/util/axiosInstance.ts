/*  2024-08-01 19:33:30

useSuspenseQuery 훅에서 사용되어야 하므로, 리턴 타입이 순수 data 이어야 한다.
cancelToken 과 오브젝트 리턴형을 수정하고 data 만을 리턴하는 형태로 변경한다.

*/

// /src/util/axiosInstance.js
import axios from "axios";

// Axios 인스턴스 생성 및 설정
export const axiosBase = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json",
  },
});

type AxiosRequestPropType = {
  endPoint: string;
  config?: object;
};
export const axiosRequest = async ({
  endPoint,
  config = {},
}: AxiosRequestPropType) => {
  const source = axios.CancelToken.source();
  try {
    const response = await axiosBase.request({
      url: endPoint,
      ...config,
      cancelToken: source.token,
    });
    // Abort 펑션인 cancelToken 을 함께 반환합니다.
    console.log(response.data);
    // return response.data;
    return { data: response.data };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
