"use client"

import type React from "react"
import { useState , useEffect} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Lock, Phone } from "lucide-react"
import { errorAlert, successAlert } from "@/app/utils/alert"
import { profInterface } from "@/app/types/prof.type"
import { useMutation , useQuery} from "@tanstack/react-query"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { getProfInterface } from "@/app/types/prof.type"


export default function Page() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  })


  const [prof, setProf] = useState<getProfInterface[]>([])

  const { data } = useQuery({
    queryKey : ["profs"],
    queryFn : () => axios.get(backendUrl("/prof"))
  })

  useEffect(() => { data?.data && setProf(data.data) }, [data])


  const mutation = useMutation({
    mutationFn : (data : profInterface) => axios.post(backendUrl("/prof"), data),
    onSuccess : (response) => {
        setFormData({
            name: "",
            email: "",
            password: "",
            contact: "",
          })
        successAlert("Prof Added")
        setProf(response.data)
    },
    onError : () => {
        errorAlert("Email Already Taken")
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if(!formData.name.trim()) return errorAlert("name is empty")
    if(!formData.email.trim()) return errorAlert("email is empty")
    if(formData.email.trim().slice(-10) != "@gmail.com") return errorAlert("not valid email")
    if(!formData.password.trim()) return errorAlert("password is empty")
    if(!formData.contact.trim()) return errorAlert("contact is empty")
    if(formData.contact.trim().length != 11) return errorAlert("contact length is not 11")
    
    const profObj :  profInterface = {
        ...formData,
        schedules : []
    }

    mutation.mutate(profObj)

  }

  return (
    <div className="w-full h-full min-h-screen bg-gray-50">
      <div className="w-full h-32 bg-white shadow-sm border-b flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Professor</h1>
          <p className="text-gray-600">Create a new professor account</p>
        </div>
      </div>

      <div className="flex  p-6 gap-10">
        
        <Card className="w-[40%] ">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">Professor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-sm font-medium">
                  Contact Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="contact"
                    name="contact"
                    type="number"
                    placeholder="Enter contact number"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full mt-6">
                Add Professor
              </Button>
            </form>
          </CardContent>
        </Card>


        <Card className="w-[60%] h-[490px] overflow-auto" >
         
          <CardContent>
            <Table>
              <TableHeader >
                  <TableRow>
                      <TableHead>intructor name</TableHead>
                      <TableHead>email</TableHead>
                      <TableHead>contact</TableHead>
                      <TableHead>Handle Subjects</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {prof?.map((item, index) => (
                      <TableRow key={index}>
                          <TableCell >{item.name}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.contact}</TableCell>
                          <TableCell>{item.schedules.length}</TableCell>
                      </TableRow>
                  ))}

              </TableBody>
            </Table>
          </CardContent>
        </Card>

        
      </div>
    </div>
  )
}
