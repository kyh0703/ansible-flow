import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu'
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '~/shared/ui/sidebar'

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
                Projects
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover w-48 rounded-md border p-1 shadow-md">
                <DropdownMenuItem>1</DropdownMenuItem>
                <DropdownMenuItem>2</DropdownMenuItem>
                <DropdownMenuItem>3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  )
}
