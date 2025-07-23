import { Blog } from '@/components/main/Blog';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams,useSearchParams } from 'react-router-dom';
import { fetchData } from '../../../utils/fetchData';
import { SkeletonCard } from '@/components/main/SkeletonCard';
import { Button } from '@/components/ui/button';
import { IoMdArrowBack } from 'react-icons/io';
import { BlogValidator } from '../../../utils/validators';
export default function BlogView() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [searchParams,] = useSearchParams();
    const tags = searchParams.get('tags');
    const {data,isLoading,isError} = useQuery({
        queryKey: ['blog', id],
        queryFn: async () => fetchData(`/blog/${id}/${tags ? `?tags=${tags}` : ''}`, 'GET', "", null)
    });
    const parsedData = BlogValidator.safeParse(data);
    if(parsedData.success){
        return (
            <main className='flex flex-col justify-center items-center w-full min-h-screen'>
                <Blog blog={parsedData.data}/>
            </main>
        )
    }
    if(isLoading){
        return (
            <SkeletonCard/>
        )
    }
    if(isLoading || isError || !data){
        return (
            <section>
                <h1>Blog not found</h1>
                <Button className="flex gap-2 justify-center items-center mt-2" onClick={() => navigate(-1)}>
                    <IoMdArrowBack/>
                    <span>Go Back</span>
                </Button>
            </section>
        )
    }
}
