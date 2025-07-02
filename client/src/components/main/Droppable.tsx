import { useDroppable } from '@dnd-kit/core';
export default function Droppable({children,id}: {children?: React.ReactNode,id: string}) {
    const {isOver, setNodeRef} = useDroppable({
        id
    });
    const style = {
        color: isOver ? 'green' : "black",
        border: isOver ? '2px solid green' : '2px solid black',
        backgroundColor: isOver ? "rgb(0, 255,0,.2)" :'rgb(255, 255, 255,.2)',
    };
    return (
        <section ref={setNodeRef} style={style} className="p-4 rounded-md shadow-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-[clamp(300px, 50%, 600px)] min-w-[300px] flex flex-col justify-center items-center gap-2">
            {children ? children : 'Droppable Area'}
        </section>
    )
}
