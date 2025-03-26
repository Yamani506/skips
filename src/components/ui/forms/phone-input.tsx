"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputWithOutLabel } from "./InputWithOutLabel"
// Country codes data with flags
const countries = [
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+962", name: "Jordan", flag: "🇯🇴" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { code: "+963", name: "Syria", flag: "🇸🇾" },
  { code: "+964", name: "Iraq", flag: "🇮🇶" },
  { code: "+967", name: "Yemen", flag: "🇾🇪" },
  { code: "+970", name: "Palestine", flag: "🇵🇸" },
  { code: "+216", name: "Tunisia", flag: "🇹🇳" },
  { code: "+213", name: "Algeria", flag: "🇩🇿" },
  { code: "+212", name: "Morocco", flag: "🇲🇦" },
  { code: "+218", name: "Libya", flag: "🇱🇾" },
  { code: "+249", name: "Sudan", flag: "🇸🇩" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
]

export default function PhoneInput({registre,id,name,error}:any) {
  const [selectedCountryCode, setSelectedCountryCode] = useState(countries[0].code)
  const [phoneNumber, setPhoneNumber] = useState("")

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/\D/g, "")
    setPhoneNumber(value)
  }

  const selectedCountry = countries.find((country) => country.code === selectedCountryCode) || countries[0];

  console.log(selectedCountry.code);

  return (
    <div className="">
      {/* <div className="space-y-2">
        <h2 className="text-2xl font-bold">رقم الجوال</h2>
        <p className="text-muted-foreground">أدخل رقم الجوال الخاص بك</p>
      </div> */}

        <div className="space-y-2 flex flex-col justify-center items-center">
          <Label  className=" w-full text-start">OraginazeNumber </Label>
          <div className="flex">
            <Select value={selectedCountryCode} onValueChange={setSelectedCountryCode}>
              <SelectTrigger
                className="w-[140px] ltr:rounded-r-none rtl:rounded-l-none border-r-0 rtl:border-r-[1px] rtl:border-l-0"
                dir="ltr"
              >
                <SelectValue >
                  <span className="flex items-center">
                    <span className="mr-1">{selectedCountry.flag}</span>
                    <span>{selectedCountry.code}</span>
                  </span>
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="max-h-[300px] bg-black ">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code} className="hover:bg-gray-100 hover:text-black">
                    <span className="flex items-center ">
                      <span className="mr-2">{country.flag}</span>
                      <span>{country.name}</span>
                      <span className="ml-2 text-muted-foreground">{country.code}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* <Input
              id={id}
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className=" ltr:rounded-l-none rtl:rounded-r-none"
              placeholder="5XXXXXXXX"
              dir="ltr"
              register={registred}
              name={name}
              
            /> */}
            <InputWithOutLabel
              id={id}
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className=" ltr:rounded-l-none rtl:rounded-r-none"
              placeholder="5XXXXXXXX"
              dir="ltr"
              register={registre}
              name={name}
              error={error}
            />
          </div>
        </div>
    </div>
  )
}

