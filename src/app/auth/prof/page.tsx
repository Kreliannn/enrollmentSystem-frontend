"use client"
import { useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, BookOpen, Eye, EyeOff, ArrowLeft, UserCheck } from "lucide-react"
import Link from "next/link"
import { errorAlert, successAlert } from "@/app/utils/alert"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { getProfInterface } from "@/app/types/prof.type"
import { useProfStore } from "@/app/store/profStore"

export default function AdminLogin() {

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const {setProf} = useProfStore()

  const router = useRouter()

  const mutation = useMutation({
    mutationFn : (data : {email : string, password : string}) => axios.post(backendUrl("/prof/auth"), data),
    onSuccess : (response) => {
        if(response.data){
           setProf(response.data)
           router.push("/pages/prof/home")
        }else {
            setIsLoading(false)
            errorAlert("invalid credentials")
        }
    }
  }) 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!formData.username || !formData.password) return errorAlert("empty field")
    setIsLoading(true)
    mutation.mutate({ email : formData.username, password : formData.password})
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="  h-screen bg-gradient-to-br w-full from-slate-50 to-slate-100 bg-cover bg-center"  style={{ backgroundImage: "url('/ncstbg1.png')" }}>
      <div className="absolute inset-0 bg-black/60 z-0" />


    <div className="relative z-10">
    <header className="w-full py-6 px-4">
        <div className="container mx-auto flex items-center justify-between">
        <div className=" w-18 h-18 bg-red-500 top-3 left-5 rounded-full shadow-lg">
          <img src={"/ncstLogo.png"} className="w-18 h-18 rounded-full" />
        </div>
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-stone-200 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Login Card */}
          <Card className="shadow-lg border-2">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full w-fit">
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Instructor Login</CardTitle>
              <CardDescription className="text-slate-600">
                Enter your credentials to access the instructor account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-700 font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="h-11 border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-11 pr-10 border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

           
                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

             
            </CardContent>
          </Card>

      
        </div>
      </main>

    </div>
    
     
     
    </div>
  )
}
