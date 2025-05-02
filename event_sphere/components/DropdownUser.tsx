import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { SignOutButton } from '@/components/ui/SignOutButton';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
        <Avatar className="w-[42px] h-[42px]">
          <AvatarImage src={session?.user?.image} className="rounded-full " />
          <AvatarFallback className=" border border-black ">ES</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 md:mr-8">
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>{session?.user?.email}</DropdownMenuItem>
          <DropdownMenuItem>Quản lý đơn hàng</DropdownMenuItem>
          <DropdownMenuItem>Quản lý sự kiện</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUser;
