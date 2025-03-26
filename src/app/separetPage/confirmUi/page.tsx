import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">تم إنشاء الحساب بنجاح</CardTitle>
          <CardDescription>شكراً للتسجيل معنا</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-4 rounded-full bg-green-100 p-3 inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600 h-6 w-6"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <p className="text-lg font-medium">سيتم التواصل معكم قريباً</p>
          <p className="text-muted-foreground mt-2">
            تم استلام بياناتكم بنجاح وسيقوم فريقنا بالتواصل معكم في أقرب وقت ممكن
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/separetPage/contact" className="flex items-center justify-center border-collapse border">
              <ArrowLeft className="mr-2 h-4 w-4 " />
              contact us
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

