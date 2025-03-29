import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/auth';

const DropdownUser = async () => {
  const session = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="bg-transparent size-6 p-1 rounded-md"
      >
        <AccountCircleSharpIcon
          className="cursor-pointer"
          sx={{ fontSize: 42 }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 md:mr-8">
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
          <DropdownMenuItem>Quản lý đơn hàng</DropdownMenuItem>
          <DropdownMenuItem>Quản lý sự kiện</DropdownMenuItem>
          <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <form>
            <button onClick={async () => signOut()}>Đăng xuất</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;
