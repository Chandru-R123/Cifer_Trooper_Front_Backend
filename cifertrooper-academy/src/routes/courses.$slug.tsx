import { createFileRoute } from "@tanstack/react-router";
import { getCourseBySlug, type Course } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, GraduationCap, Download, PhoneCall } from "lucide-react";
import { EnrollmentPopup } from "@/components/EnrollmentPopup";

export const Route = createFileRoute("/courses/$slug")({
  component: CourseDetail,
});

function CourseDetail() {
  const { slug } = Route.useParams();
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const { data: course, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourseBySlug(slug),
  });

  if (isLoading) return <div className="container-page py-24 flex items-center justify-center min-h-[60vh]">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <Shield className="size-12 text-accent opacity-20" />
      <span className="text-muted-foreground font-medium">Loading Course Details...</span>
    </div>
  </div>;
  
  if (!course) return <div className="container-page py-24 text-center">
    <h2 className="text-2xl font-display mb-4">Course not found.</h2>
    <Button asChild rounded-full>
      <a href="/courses">Back to Courses</a>
    </Button>
  </div>;

  return (
    <div className="pb-24">
      <EnrollmentPopup 
        isOpen={isEnrollOpen} 
        onClose={() => setIsEnrollOpen(false)} 
        courseTitle={course.title}
      />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-surface border-b border-border">
        <div className="container-page relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Shield className="size-4" />
              <span>Professional Certification</span>
            </div>
            <h1 className="text-4xl md:text-6xl mb-6 font-display tracking-tight leading-[1.1]">{course.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {course.longDescription ?? course.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20" onClick={() => setIsEnrollOpen(true)}>
                Enroll Now
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 group">
                <Download className="mr-2 size-4 group-hover:translate-y-0.5 transition-transform" />
                Download Syllabus
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <img src="/images/pattern/01.png" alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="container-page py-24 relative">
        <div className="absolute left-0 top-0 w-full h-full opacity-[0.03] pointer-events-none -z-10 overflow-hidden">
           <img src="/images/pattern/03.png" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-2 mb-12">
               <h6 className="text-accent font-semibold tracking-widest uppercase text-sm">Learning Path</h6>
               <h2 className="text-4xl font-display flex items-center gap-4">
                <GraduationCap className="text-accent size-10" />
                Course Curriculum
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {/* Support both backend curriculum ({title, lessons[]}) and legacy modules ({id, title, content[]}) */}
              {(course.curriculum?.length
                ? course.curriculum.map((m, i) => ({ id: `m${i}`, title: m.title, content: m.lessons }))
                : course.modules ?? []
              ).map((module) => (
                <AccordionItem 
                  key={module.id} 
                  value={module.id}
                  className="border border-border rounded-2xl px-6 bg-card/50 backdrop-blur-sm overflow-hidden transition-all data-[state=open]:border-accent/50 data-[state=open]:shadow-xl data-[state=open]:bg-card"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <span className="text-left font-medium text-lg md:text-xl">{module.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <ul className="grid sm:grid-cols-2 gap-4">
                      {module.content.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground group">
                          <div className="mt-1.5 size-1.5 rounded-full bg-accent shrink-0 group-hover:scale-150 transition-transform" />
                          <span className="text-[15px] leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-24 space-y-8">
              <div className="p-8 rounded-[2rem] bg-accent text-accent-foreground shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-12 -bottom-12 size-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
                <h3 className="text-2xl font-display mb-4 relative z-10">Start Your Journey</h3>
                <p className="mb-6 opacity-90 relative z-10 leading-relaxed">
                  Join our expert-led sessions and transform your career in cybersecurity. 
                  Hands-on practical training with industry experts.
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full rounded-xl h-12 bg-white text-accent hover:bg-white/90 relative z-10 shadow-lg"
                  onClick={() => setIsEnrollOpen(true)}
                >
                  <PhoneCall className="mr-2 size-4" />
                  Contact for Details
                </Button>
              </div>

              <div className="p-8 rounded-[2rem] border border-border bg-card/50 backdrop-blur shadow-sm">
                <h4 className="font-display text-xl mb-6">Course Includes:</h4>
                <ul className="space-y-5">
                  {[
                    "Hands-on Practical Labs",
                    "Lifetime Access to Materials",
                    "Industry Recognized Certificate",
                    "Job Placement Assistance",
                    "1-on-1 Mentorship Session"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="size-6 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                        <CheckCircle2 className="size-3.5" />
                      </div>
                      <span className="text-muted-foreground font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
