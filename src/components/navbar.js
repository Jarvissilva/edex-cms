"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSchoolOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { RxDot } from "react-icons/rx";
import { PiChalkboardTeacher } from "react-icons/pi";

export default function Navbar({ courses, loggedUser }) {
  const pathname = usePathname();

  const isCourseHead = courses.find((course) =>
    course.heads.includes(loggedUser._id),
  );
  console.log(isCourseHead);

  return (
    <aside className="sticky top-0 flex h-screen w-[15%] flex-col space-y-5 border-r border-gray-200">
      <div
        className="p-4 text-[2rem] font-black
      "
      >
        Edex
      </div>
      <nav className="grow px-2">
        <ul className="space-y-4">
          <NavbarTab
            to="/dashboard"
            title="Dashboard"
            Icon={LuLayoutDashboard}
            styles={
              pathname === "/dashboard"
                ? "bg-blue-600 text-white font-semibold"
                : "hover:bg-sky-50"
            }
          />
          {loggedUser.role === "admin" || "teacher" ? (
            <NavbarTab
              to="/dashboard/courses"
              title="Courses"
              Icon={IoSchoolOutline}
              styles={
                pathname.includes("/dashboard/courses")
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-sky-50"
              }
            >
              {courses.length > 0
                ? pathname.includes("/dashboard/courses") && (
                    <ul className="space-y-2 p-2">
                      {courses.map((course, index) => {
                        if (loggedUser.role === "admin") {
                          return (
                            <NavbarTab
                              key={index}
                              to={`/dashboard/courses/${course._id}`}
                              title={course.short_name}
                              Icon={RxDot}
                              styles={
                                pathname.includes(
                                  `/dashboard/courses/${course._id}`,
                                )
                                  ? "bg-sky-50 font-semibold"
                                  : "hover:bg-sky-50"
                              }
                            />
                          );
                        } else {
                          const foundCourse = course.heads.find(
                            (h) => h === loggedUser._id,
                          );
                          if (foundCourse) {
                            return (
                              <NavbarTab
                                key={index}
                                to={`/dashboard/courses/${course._id}`}
                                title={course.short_name}
                                Icon={RxDot}
                                styles={
                                  pathname.includes(
                                    `/dashboard/courses/${course._id}`,
                                  )
                                    ? "bg-sky-50 font-semibold"
                                    : "hover:bg-sky-50"
                                }
                              />
                            );
                          }
                        }
                      })}
                    </ul>
                  )
                : null}
            </NavbarTab>
          ) : null}
          {loggedUser.role === "admin" || isCourseHead ? (
            <NavbarTab
              to="/dashboard/teachers"
              title="Teachers"
              Icon={PiChalkboardTeacher}
              styles={
                pathname.includes("/dashboard/teachers")
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-sky-50"
              }
            />
          ) : null}
        </ul>
      </nav>
      <div className="p-4">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-4 rounded-md border border-gray-200 bg-sky-50 p-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
            {loggedUser.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold">{loggedUser.name}</p>
            <p className="text-green-500">{loggedUser.role}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}

function NavbarTab({ children, title, to, Icon, styles }) {
  return (
    <>
      <li>
        <Link
          href={to}
          className={`flex items-center gap-2 rounded-md p-2 ${styles}`}
        >
          <Icon size={30} />
          <span className="grow text-left text-lg">{title}</span>
        </Link>
        {children}
      </li>
    </>
  );
}
