import { Blog } from '@/components/main/Blog';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams,useSearchParams } from 'react-router-dom';
import { fetchData } from '../../../utils/fetchData';
import { SkeletonCard } from '@/components/main/SkeletonCard';
import { Button } from '@/components/ui/button';
import { IoMdArrowBack } from 'react-icons/io';
import { ExpandedBlogValidator } from '../../../utils/validators/index';
import NotFoundImage from "../../assets/not_found.svg"
import BlogOverview from '@/components/main/BlogOverview';
import { NavLink } from 'react-router-dom';
export default function BlogView() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [searchParams,] = useSearchParams();
    const tags = searchParams.get('tags');
    const {data,isLoading,isError} = useQuery({
        queryKey: ['blog', id, tags?tags:''],
        queryFn: async () => fetchData(`/blog/${id}/${tags ? `?tags=${tags}` : ''}`, 'GET', "", null),
    });
    const parsedData = ExpandedBlogValidator.safeParse(data);
    if(isLoading){
        return (
            <main className='flex flex-col justify-center items-center w-full min-h-screen'>
                <SkeletonCard/>
            </main>
        )
    }
    if(isError || parsedData.error){
        return (
            <section className='flex flex-col justify-center items-center w-full min-h-screen'>
                <img loading="lazy" src={NotFoundImage} alt="not found" className="w-[300px] h-[300px] mb-2 object-contain"/>
                <Button className="flex gap-2 justify-center items-center my-2 cursor-pointer" onClick={() => navigate(-1)}>
                    <IoMdArrowBack/>
                    <span>Go Back</span>
                </Button>
            </section>
        )
    }
    console.log(parsedData)
    if(parsedData.success){
        return (
            <main className='flex flex-col justify-center items-center w-full min-h-screen gap-2'>
                {
                    parsedData.data.blog ? (
                        <>
                            <Blog blog={parsedData.data.blog}/>
                            <div className='flex flex-wrap gap-2 justify-center'>    
                                {
                                    parsedData.data.blog.tags.map((tag,index) => (
                                        <NavLink to={`/blog/${id}?tags=${tag}`} className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md" key={index}>#{tag}</NavLink>
                                    ))
                                }
                            </div>
                        </>
                    ) : (
                        <img loading="lazy" src={NotFoundImage} alt="not found" className="w-[300px] h-[300px] mb-2 object-contain"/>
                    )
                }
                <Button className="flex gap-2 justify-center items-center mt-2 cursor-pointer mb-2" onClick={() => navigate(-1)}>
                    <IoMdArrowBack/>
                    <span>Go Back</span>
                </Button>
                <section className='flex flex-col gap-2 justify-center items-center mt-2 mb-2'>
                    {
                        parsedData.data.similarBlogs.map((blog,index) => (
                            <BlogOverview blog={blog} key={index}/>
                        ))
                    }
                </section>
            </main>
        )
    }
}
