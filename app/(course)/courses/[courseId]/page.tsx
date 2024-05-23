import { getPurchase } from "@/actions/get-chapter";
import { getProgress } from "@/actions/get-progress";
import { CourseProgress } from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { auth } from "@clerk/nextjs";
import { BookOpen } from "lucide-react";
import { redirect } from "next/navigation";
import { CourseEnrollButton } from "./chapters/[chapterId]/_components/course-enroll-button";
import { CourseEnrollButtonNew } from "./_components/course-enroll-button";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  let purchase = null;

  if (userId) {
    let { purchase } = await getPurchase({
      userId,
      courseId: params.courseId,
    });
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
        },
      },
      // purchases: {
      //   where: {
      //     userId,
      //   }
      // }
    },
  });

  let progressPercentage = null;

  if (userId && course) {
    progressPercentage = await getProgress(userId, course.id);
  }

  const cssAppliedContent = (body: string) => `
    
      <style>
        iframe {
          width: 100%;
          height: 100%;
        }
      </style>
      ${body}
    
    `;

  if (!course) {
    return redirect("/");
  }

  return (
    <div>
      <div className="flex flex-wrap flex-row max-w-screen-xl mx-auto pb-20 p-6">
        <div className="w-3/5 space-y-6">
          {course.videoEmbedCode && (
            <div className="relative aspect-video">
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                dangerouslySetInnerHTML={{
                  __html: cssAppliedContent(course.videoEmbedCode),
                }}
              />
            </div>
          )}

          <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3">
            <div className="flex flex-col pt-2">
              <div className="mb-3 flex items-center gap-x-2 text-sm md:text-xs">
                <div className="flex items-center gap-x-1 text-slate-500">
                  <IconBadge size="sm" icon={BookOpen} />
                  <span>
                    {course.chapters.length}{" "}
                    {course.chapters.length === 1 ? "Chapter" : "Chapters"}
                  </span>
                </div>
              </div>
              <div className="font-semibold text-lg md:text-2xl mb-2 capitalize transition line-clamp-2">
                {course.title}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {course.description}
              </p>
              <div className="flex gap-1 flex-wrap">
                <div className="border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-md text-center flex items-center justify-center">
                  {course?.category?.name!}
                </div>
              </div>

              <div className="mt-4">
                {progressPercentage !== null ? (
                  <CourseProgress
                    variant={progressPercentage === 100 ? "success" : "default"}
                    size="sm"
                    value={progressPercentage}
                  />
                ) : (
                  <p className="text-md md:text-sm font-medium text-slate-700">
                    {formatPrice(course.price || 0)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 pl-6 space-y-6">
          <div className=" border rounded-md p-6 text-secondary bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900">
            <div className="mb-7">
              <h4 className="font-semibold text-xl mb-4">
                Ready to start building?
              </h4>
              <p className="text-sm text-neutral-200">
                Track your progress, watch with subtitles, change quality &amp;
                speed, and more.
              </p>
            </div>
            <CourseEnrollButtonNew courseId={course.id} price={course.price!} purchase={purchase} />
          </div>
          <div className="flex gap-x-2 items-center">
            <button className="cursor-pointer hover:opacity-75 transition w-full p-4 border rounded-md flex flex-col items-center gap-y-2 bg-white">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 496 512"
                height="33"
                width="33"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
              <span className="text-xs text-muted-foreground">Source code</span>
            </button>
            <a
              href="https://discord.gg/v2kNnzRt33"
              target="_blank"
              className="cursor-pointer hover:opacity-75 transition w-full p-4 border rounded-md flex flex-col items-center gap-y-2 bg-white"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 640 512"
                className="text-indigo-500"
                height="33"
                width="33"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
              </svg>
              <span className="text-xs text-muted-foreground">Discord</span>
            </a>
            <a
              href="https://www.youtube.com/watch?v=dP75Khfy4s4"
              target="_blank"
              className="cursor-pointer hover:opacity-75 transition w-full p-4 border rounded-md flex flex-col items-center gap-y-2 bg-white"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 576 512"
                className="text-rose-500"
                height="33"
                width="33"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
              </svg>
              <span className="text-xs text-muted-foreground">Youtube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
};

export default CourseIdPage;
