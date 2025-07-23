import { useSuspenseQuery } from "@tanstack/react-query"
import { fetchData } from "../../../utils/fetchData"
import { useState } from "react"
import type { BlogResponse } from "utils/types"
import {Blog as BlogCard} from "../../components/main/Blog"


export default function Blog() {
    const [page] = useState(1);

    const { data } = useSuspenseQuery<BlogResponse>({
        queryKey: ['blog', page],
        queryFn: async () => fetchData('/blog', 'GET', "", null)
    });

    return (
        <main className='flex flex-col justify-center items-center w-full min-h-screen'>
            {data.results.map(blog => (
                <BlogCard
                    key={blog._id}
                    blog={blog}
                />
            ))}
        </main>
    );
}
