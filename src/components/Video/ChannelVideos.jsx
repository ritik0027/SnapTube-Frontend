import React, { useState } from "react";
import { EmptyChannelVideo, MyChannelEmptyVideo } from "../index";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllVideos } from "../../app/Slices/videoSlice";
import { getChannelVideos } from "../../app/Slices/dashboardSlice"
import { formatTimestamp, formatVideoDuration } from "../../helpers/formatFigures";
import { Link, useParams } from "react-router-dom";

function ChannelVideos({ owner = false }) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  let { username } = useParams();
  let userId = useSelector((state) => state.user?.userData?._id);
  let currentUser = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (owner) {
      userId = currentUser?._id;
    }
    if (!userId) return;
    dispatch(getChannelVideos()).then((res) => {
      setVideos(res.payload);
      setIsLoading(false);
    });
  }, [username, userId]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-3 pt-4">
        <div className="w-full">
          <div className="relative mb-1 w-full pt-[56%]">
            <div className="absolute inset-0 bg-slate-100/10 rounded animate-pulse"></div>
          </div>
          <div className="mb-1 rounded bg-slate-100/10 animate-pulse h-8 w-full"></div>
          <div className="flex rounded text-gray-200 bg-slate-100/10 animate-pulse h-5 w-full"></div>
        </div>
        <div className="w-full">
          <div className="relative mb-1 w-full pt-[56%]">
            <div className="absolute inset-0 bg-slate-100/10 rounded animate-pulse"></div>
          </div>
          <div className="mb-1 rounded bg-slate-100/10 animate-pulse h-8 w-full"></div>
          <div className="flex rounded text-gray-200 bg-slate-100/10 animate-pulse h-5 w-full"></div>
        </div>
        <div className="w-full">
          <div className="relative mb-1 w-full pt-[56%]">
            <div className="absolute inset-0 bg-slate-100/10 rounded animate-pulse"></div>
          </div>
          <div className="mb-1 rounded bg-slate-100/10 animate-pulse h-8 w-full"></div>
          <div className="flex rounded text-gray-200 bg-slate-100/10 animate-pulse h-5 w-full"></div>
        </div>
        <div className="w-full">
          <div className="relative mb-1 w-full pt-[56%]">
            <div className="absolute inset-0 bg-slate-100/10 rounded animate-pulse"></div>
          </div>
          <div className="mb-1 rounded bg-slate-100/10 animate-pulse h-8 w-full"></div>
          <div className="flex rounded text-gray-200 bg-slate-100/10 animate-pulse h-5 w-full"></div>
        </div>
      </div>
    );
  }

  return videos?.length < 1 ? (
    owner ? (
      <MyChannelEmptyVideo />
    ) : (
      <EmptyChannelVideo />
    )
  ) : (
    <ul
      className={`grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] ${
        videos?.length < 3 && "lg:grid-cols-[repeat(auto-fit,_minmax(300px,0.25fr))]"
      } gap-4 pt-2`}
    >
      {videos.map((video) => (
        <li key={video._id} className="w-full">
          <Link to={`/watch/${video?._id}`}>
            <div className="relative mb-2 w-full pt-[56%]">
              <div className="absolute inset-0">
                <img src={video?.thumbnail} alt={video?.title} className="h-full w-full" />
              </div>
              <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                {formatVideoDuration(video?.duration)}
              </span>
            </div>
            <div className="flex items-center">
              <img src={video.owner[0]?.avatar} className="w-11 rounded-full" />
              <span className="ml-3">
                <h6 className="mb-1 font-semibold">{video?.title}</h6>
                <p className="flex text-sm text-gray-200">
                  {video?.views} Views · {formatTimestamp(video?.createdAt)}
                </p>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ChannelVideos;