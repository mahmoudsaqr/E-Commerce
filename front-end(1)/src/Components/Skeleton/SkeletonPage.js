import Skeleton from "react-loading-skeleton";

export default function SkeletonPage({height, width, count , Length}) {
    const skeletonLength = Array.from({length:Length}).map((_,key)=><div className={`col-lg-${width} col-md-4 col-5`}>
        <div className="mx-1">
          <Skeleton count={count} style={{ height: `${height}` }} />
        </div>
      </div>)
    return skeletonLength ;
}