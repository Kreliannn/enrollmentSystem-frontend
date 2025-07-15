"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheck, GraduationCap, Shield, BookOpen } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
     
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Student Enrollment System</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Streamline your educational institution's enrollment process with our comprehensive management system.
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
                <Link href={""}>   
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
                <CardTitle className="text-xl text-slate-800">Registrar</CardTitle>
                <CardDescription className="text-slate-600">
                  Process enrollments, manage student records, and handle registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="lg">
                  Registrar Login
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">System Features</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Efficient Management</h4>
                <p className="text-slate-600 text-sm">
                  Streamlined processes for handling student enrollments and academic records.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Secure Access</h4>
                <p className="text-slate-600 text-sm">
                  Role-based authentication ensuring data security and appropriate access levels.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Real-time Updates</h4>
                <p className="text-slate-600 text-sm">
                  Instant updates and notifications for enrollment status and important announcements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 mt-12 border-t border-slate-200">
        <div className="container mx-auto text-center">
          <p className="text-slate-600 text-sm">© {new Date().getFullYear()} EduEnroll System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
