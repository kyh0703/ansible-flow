import { ThemeButton } from '@/shared/components/theme-button'
import { useUser } from '@/shared/store/user'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Input } from '@/shared/ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { ChevronDown, Clock, Home, Search, Star } from 'lucide-react'
import { Link, useLocation } from 'react-router'

// function ProjectsSkeleton() {
//   return (
//     <SidebarMenu>
//       {[...Array(5)].map((_, i) => (
//         <SidebarMenuItem key={i}>
//           <div className="flex items-center gap-3 px-3 py-2">
//             <Skeleton className="h-4 w-4 rounded" />
//             <Skeleton className="h-4 flex-1" />
//           </div>
//         </SidebarMenuItem>
//       ))}
//     </SidebarMenu>
//   )
// }

export default function AppSidebar() {
  const user = useUser()
  const location = useLocation()

  if (!user) {
    return null
  }

  return (
    <Sidebar className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 border-r backdrop-blur">
      <SidebarHeader className="border-border/40 border-b p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="bg-muted/50 hover:bg-muted h-10 w-full justify-between rounded-lg px-3 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded">
                      <span className="text-primary text-xs font-semibold">
                        A
                      </span>
                    </div>
                    <span>Acme Inc</span>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded">
                      <span className="text-primary text-xs font-semibold">
                        A
                      </span>
                    </div>
                    <span>Acme Inc</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500/10">
                      <span className="text-xs font-semibold text-blue-500">
                        B
                      </span>
                    </div>
                    <span>Acme Corp.</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search projects..."
              className="bg-muted/50 focus-visible:ring-ring h-8 border-0 pl-9 focus-visible:ring-1"
            />
          </div>
          <ThemeButton />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent className="pt-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === '/projects'}
                >
                  <Link
                    to="/projects"
                    className="flex items-center gap-3 px-3 py-2 text-sm"
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/projects/recent"
                    className="flex items-center gap-3 px-3 py-2 text-sm"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Recent</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/projects/starred"
                    className="flex items-center gap-3 px-3 py-2 text-sm"
                  >
                    <Star className="h-4 w-4" />
                    <span>Starred</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground px-3 text-xs font-semibold tracking-wider">
            <div className="flex w-full items-center justify-between">
              <span>Starred</span>
            </div>
          </SidebarGroupLabel>
          {/* <SidebarGroupContent>
            <Suspense fallback={<ProjectsSkeleton />}>
              <ProjectsList />
            </Suspense>
          </SidebarGroupContent> */}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-border/40 border-t p-4">
        <SidebarMenu></SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
