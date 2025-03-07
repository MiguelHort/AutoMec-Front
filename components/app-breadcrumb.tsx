"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { usePathname } from "next/navigation"

export function BreadcrumbDemo() {


  const pathname = usePathname() // Obtém o caminho atual
  const segments = pathname.split("/").filter((segment) => segment !== "")

  console.log(segments);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        
        {segments.map((segment, index) => (
          <BreadcrumbSeparator key={segment}>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${segments.slice(0, index + 1).join("/")}`}>
                {segment}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbSeparator>
        ))}

      </BreadcrumbList>
    </Breadcrumb>
  )
}
