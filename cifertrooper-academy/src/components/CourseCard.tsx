import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { Course } from "@/lib/courses";

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const IconComponent = (Icons as any)[course.icon] || Icons.GraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to="/courses/$slug"
        params={{ slug: course.slug }}
        className="group block h-full p-7 rounded-2xl bg-card border border-border hover:border-accent transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="size-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-xl">
             <IconComponent className="size-6" />
          </div>
          <Icons.ArrowUpRight className="size-5 text-muted-foreground group-hover:text-accent group-hover:rotate-12 transition-all" />
        </div>
        <h3 className="text-xl mb-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
      </Link>
    </motion.div>
  );
}

export function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((c, i) => <CourseCard key={c.slug} course={c} index={i} />)}
    </div>
  );
}
