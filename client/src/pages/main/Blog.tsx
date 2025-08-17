import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../../../utils/fetchData"
import { useState } from "react"
import type { BlogResponse } from "utils/types"
import {Blog as BlogCard} from "../../components/main/Blog"
import { SkeletonCard } from "@/components/main/SkeletonCard"
import { Button } from "@/components/ui/button"
import { IoMdArrowBack } from "react-icons/io"
import { useNavigate } from "react-router"
import NotFoundImage from "../../assets/not_found.svg"

export default function Blog() {
    const [page,] = useState(1);
    const navigate = useNavigate();
    const { data, isLoading, isError } = useQuery<BlogResponse>({
        queryKey: ['blog', page],
        queryFn: async () => fetchData('/blog', 'GET', "", null)
    });

    return (
        <main className='flex flex-col justify-center items-center w-full min-h-screen'>
            {isLoading ? (
                <SkeletonCard/>
            ) : isError ? (
                <section>
                    <img loading="lazy" src={NotFoundImage} alt="not found" className="w-[clamp(300px, 50vw, 800px)] mb-2 object-contain"/>
                    <Button className="flex gap-2 justify-center items-center mt-2" onClick={() => navigate(-1)}>
                        <IoMdArrowBack/>
                        <span>Go Back</span>
                    </Button>
                </section>
            ) : data?.results?.map(blog => (
                <BlogCard
                    key={blog._id}
                    blog={blog}
                />
            ))}
        </main>
    );
}
