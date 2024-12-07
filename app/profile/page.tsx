"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const experiences = [
  {
    title: "Senior Developer",
    company: "Tech Innovators Inc.",
    period: "2021 - Present",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    period: "2018 - 2021",
  },
  {
    title: "Junior Developer",
    company: "StartUp Ventures",
    period: "2016 - 2018",
  },
];

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "TypeScript", level: 75 },
  { name: "GraphQL", level: 70 },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6 md:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full shadow-lg">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${activeTab === "profile" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`px-4 py-2 rounded-md ${activeTab === "experience" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              onClick={() => setActiveTab("experience")}
            >
              Experience
            </button>
            <button
              className={`px-4 py-2 rounded-md ${activeTab === "skills" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>
          </div>
        </div>

        {activeTab === "profile" && (
          <Card className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"></div>
            <CardHeader className="relative">
              <Avatar className="w-32 h-32 absolute -top-16 ring-4 ring-white dark:ring-gray-900">
                <AvatarImage
                  src="/placeholder.svg?height=128&width=128"
                  alt="Jane Doe"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="mt-20">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Jane Doe</h2>
                <p className="text-muted-foreground">Full Stack Developer</p>
                <p className="text-sm">jane.doe@example.com</p>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Passionate developer with a love for creating intuitive and
                efficient web applications. Always eager to learn new
                technologies and solve complex problems.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>React</Badge>
                <Badge>Next.js</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Node.js</Badge>
                <Badge>GraphQL</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "experience" && (
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Experience</h2>
            </CardHeader>
            <CardContent>
              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {experiences.map((exp, index) => (
                  <li key={index} className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                      {exp.period}
                    </time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                      {exp.company}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}

        {activeTab === "skills" && (
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Skills</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {skill.name}
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
