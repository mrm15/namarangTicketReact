import Skeleton from "../../../Skeleton/Skeleton";
import "./chatSkeletonStyle.css"

const ChatSkeleton = () => {
    return (
        <div className="chat-skeleton ltr">
            {/* Header */}
            <Skeleton classes="skeleton header width-100" />

            {/* Chat messages */}
            <div className="messages-skeleton">
                <Skeleton classes="skeleton message message-left width-50 h-3" />
                <Skeleton classes="skeleton message message-right width-50 h-5" />
                <Skeleton classes="skeleton message message-left width-60" />
                <Skeleton classes="skeleton message message-right width-40 h-6" />
                <Skeleton classes="skeleton message message-left width-50" />
                <Skeleton classes="skeleton message message-right width-30" />

            </div>

            {/* Footer */}
            <Skeleton classes="skeleton footer width-100" />
        </div>
    )
}

export default ChatSkeleton
