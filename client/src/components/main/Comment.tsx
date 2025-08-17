import type { Comment as CommentType } from "utils/types";

export default function Comment({ comment }: { comment: CommentType }) {
    const { content, creatorId, __v } = comment;

    // Optional: initials for a simple avatar
    const initials = `${creatorId.firstName[0] ?? ""}${creatorId.lastName[0] ?? ""}`.toUpperCase();

    return (
        <div className="w-full bg-white dark:bg-gray-900 shadow-sm border border-border rounded-xl p-4 mb-4">
            <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground font-semibold">
                    {initials}
                </div>
                <div className="flex flex-col">
                    <span className="font-medium text-sm text-foreground">
                        {creatorId.firstName} {creatorId.lastName}
                    </span>
                    <span className="text-xs text-muted-foreground">{creatorId.email}</span>
                </div>
            </div>

            <p className="text-sm text-foreground mb-2">{content}</p>

            {__v > 0 && (
                <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium italic">
                    Edited
                </span>
            )}
        </div>
    );
}
