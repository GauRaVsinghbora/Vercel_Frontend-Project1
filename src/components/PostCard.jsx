import React from 'react'
import { Heart, MessageCircle, Repeat2, Share2 } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function PostCard({
    post={}
}) {

    if (!post) return null;

    const { twitte, file_url, userId, createdAt } = post;
    const isVideo = file_url?.match(/\.(mp4|webm|ogg)$/i);
    return (  
            <div className="border-b border-gray-300 p-4 hover:bg-gray-50 transition-colors">
                {/* Header */}
                <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold">
                            {userId?.username?.[0]?.toUpperCase() || "U"}
                        </div>
                    </div>

                    {/* Post content */}
                    <div className="flex-1">
                        {/* User Info */}
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">
                            {userId?.username}
                            </span>
                            <span className="text-gray-500 text-sm">
                            @{userId?.email?.split("@")[0]}
                            </span>
                            <span className="text-gray-500 text-sm">· {dayjs(createdAt).fromNow()}</span>
                        </div>

                        {/* Tweet Text */}
                        <p className="mt-2 text-gray-800 text-[15px] leading-snug whitespace-pre-wrap">
                            {twitte}
                        </p>

                        {/* Media */}
                        {file_url && (
                            <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                            {isVideo ? (
                                <video
                                src={file_url}
                                controls
                                className="w-full max-h-[500px] object-cover"
                                />
                            ) : (
                                <img
                                src={file_url}
                                alt="post media"
                                className="w-full max-h-[500px] object-cover"
                                loading="lazy"
                                />
                            )}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between mt-3 text-gray-500 text-sm max-w-md">
                            <button className="flex items-center space-x-1 hover:text-blue-500 transition">
                            <MessageCircle size={18} />
                            <span>12</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-green-500 transition">
                            <Repeat2 size={18} />
                            <span>4</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-pink-500 transition">
                            <Heart size={18} />
                            <span>21</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-700 transition">
                            <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )
}

export default PostCard;
