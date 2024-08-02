/*  2024-07-31 02:21:00

useSuspenseQuery 로, Suspense 사용이 가능한 컴포넌트가 되었다.

React-Query 의 useQuery 에서 각 항목의 용법과 목적입니다.
queryKey: 
    각 query 를 식별하기 위해 사용한다. queryKey 가 같으면 캐시가 활용되고, 캐시가 없으면 새로운 query 가 생성된다.
    queryKey 가 일치한다면 리턴되는 data 도 일치하도록 설계해야 한다.
queryFn:
    queryKey 에 대한 API 데이터를 가져오는 함수를 정의한다.
    비동기 함수이어야 하며, 이 펑션의 결과가 useQuery 의 리턴 data 가 된다.
retry:
    react-query 는 디폴트로 3번의 fetch retry 를 시도합니다. 이를 막고 싶다면 false 로 설정한다.
suspense:
    true 로 설정하면, useQuery 는 데이터를 가져오는 동안 Suspense 를 발생시킨다.

*/
import { axiosRequest } from "@/util/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

type PostsPropsType = {
  targetDB: string;
};

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

// const ITEMS_PER_PAGE = 10;

const Posts = ({ targetDB }: PostsPropsType) => {
  const config = { method: "GET" };
  const queryResult = useSuspenseQuery<PostType[] | UserType[]>({
    queryKey: [targetDB],
    queryFn: async () => {
      const response = await axiosRequest({ endPoint: `/${targetDB}`, config });
      return response.data;
    },
    retry: false,
  });

  // queryResult에서 필요한 값들을 추출
  const { data } = queryResult;
  console.log(data);

  return (
    <div className="flex flex-col justify-start items-start">
      <h2>{targetDB}</h2>
      <ul className="flex flex-col items-start">
        {data?.map((d: PostType | UserType, i: number) => (
          <li key={i}>{isPostType(d) ? d.title : d.name}</li>
        ))}
      </ul>
    </div>
  );
};

function isPostType(item: PostType | UserType): item is PostType {
  return (item as PostType).title !== undefined;
}

export default Posts;
