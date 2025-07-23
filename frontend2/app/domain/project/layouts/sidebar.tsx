import { logout } from '@/domain/auth/services'
import { useTheme } from '@/shared/providers/theme-provider'
import { setToken } from '@/shared/services'
import { useUser, useUserActions } from '@/shared/store/user'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { DropdownMenu, DropdownMenuPortal } from '@radix-ui/react-dropdown-menu'
import {
  Check,
  ChevronDown,
  Clock,
  Home,
  LogOut,
  Search,
  Star,
  SunMoon,
  Trash,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'

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
  const { theme, setTheme } = useTheme()
  const user = useUser()
  const { setUser } = useUserActions()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setUser(null)
      setToken(null)
      navigate('/', { replace: true })
    }
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
                    <div className="bg-primary/10 flex h-6 w-6 items-center justify-center overflow-hidden rounded">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name || 'User profile'}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-primary text-xs font-semibold">
                          {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
                        </span>
                      )}
                    </div>
                    <span>{user?.name}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-60" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="space-x-3">
                    <SunMoon className="size-4" />
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme('system')}>
                        <div className="flex w-full items-center justify-between">
                          <span>System</span>
                          {theme === 'system' && <Check className="h-4 w-4" />}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('light')}>
                        <div className="flex w-full items-center justify-between">
                          <span>Light</span>
                          {theme === 'light' && <Check className="h-4 w-4" />}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('dark')}>
                        <div className="flex w-full items-center justify-between">
                          <span>Dark</span>
                          {theme === 'dark' && <Check className="h-4 w-4" />}
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="relative mt-3 flex items-center justify-between gap-2">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search projects..."
            className="bg-muted/50 focus-visible:ring-ring h-8 border-0 pl-9 focus-visible:ring-1"
          />
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
                    to="/projects/trash"
                    className="flex items-center gap-3 px-3 py-2 text-sm"
                  >
                    <Trash className="h-4 w-4" />
                    <span>Trash</span>
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
