import { getProgress } from "@/actions/get-progress";
import { CourseProgress } from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { auth } from "@clerk/nextjs";
import { BookOpen } from "lucide-react";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  const { userId } = auth();
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
          position: "asc"
        },
        select: {
          id: true,
        }
      },
      // purchases: {
      //   where: {
      //     userId,
      //   }
      // }
    }
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
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        {course.videoEmbedCode && (
          <div className="p-4">
            <div className="relative aspect-video">
              <div
                style={{
                  width: "100%",
                  height: "100%"
                }}
                dangerouslySetInnerHTML={{ __html: cssAppliedContent(course.videoEmbedCode) }}
              />
            </div>
          </div>
        )}
        
        <div className="p-4">
          <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
            <div className="flex flex-col pt-2">
              <div className="mb-3 flex items-center gap-x-2 text-sm md:text-xs">
                <div className="flex items-center gap-x-1 text-slate-500">
                  <IconBadge size="sm" icon={BookOpen} />
                  <span>
                    {course.chapters.length} {course.chapters.length === 1 ? "Chapter" : "Chapters"}
                  </span>
                </div>
              </div>
              <div className="font-semibold text-lg md:text-2xl mb-2 capitalize transition line-clamp-2">
                {course.title}
              </div>
              <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
              <div className="flex gap-1 flex-wrap">
                <div
                  className="border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-md text-center flex items-center justify-center">
                  {course?.category?.name!}</div>

              </div>

              <div className="mt-4">
                {progressPercentage !== null ? (
                  <CourseProgress variant={progressPercentage === 100 ? "success" : "default"} size="sm"
                    value={progressPercentage} />
                ) : (
                  <p className="text-md md:text-sm font-medium text-slate-700">
                    {formatPrice(course.price || 0)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

  // return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}

export default CourseIdPage;
