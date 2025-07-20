"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheck, GraduationCap, Shield, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="  h-screen bg-gradient-to-br w-full from-slate-50 to-slate-100 bg-cover bg-center "  style={{ backgroundImage: "url('/ncstbg1.png')" }}>
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10">
        <div className="absolute w-24 h-24 bg-red-500 top-3 left-5 rounded-full shadow-lg">
          <img src={"/ncstLogo.png"} className="w-24 h-24 rounded-full" />
        </div>
        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mt-10" >
            {/* Hero Section */}
            <div className="mb-12">
              <h2 className="text-5xl md:text-5xl font-bold text-white mb-4">NCST Enrollment System </h2>
              <p className="text-xl text-stone-400 mb-8 max-w-2xl mx-auto">
                Streamline  educational institution's enrollment process with comprehensive management system.
              </p>
            </div>

            {/* Login Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Admin Login */}
              <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-slate-800">Administrator</CardTitle>
                  <CardDescription className="text-slate-600">
                    Manage system settings, users, and oversee all enrollment activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={"/auth/admin"}>   
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                      Admin Login
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Student Login */}
              <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-green-200">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                    <GraduationCap className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-slate-800">Student</CardTitle>
                  <CardDescription className="text-slate-600">
                    Access your enrollment status, course information, and  records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={"/auth/student"}>   
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                      Student Login
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Registrar Login */}
              <Card className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-purple-200">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                    <UserCheck className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl text-slate-800">Instructor</CardTitle>
                  <CardDescription className="text-slate-600">
                    View Intructor Schedules and Check Subject Class List
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={"/auth/prof"}>   
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="lg">
                      Instructor Login
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

          
          </div>
        </main>
      </div>
     
      
    </div>
  )
}
