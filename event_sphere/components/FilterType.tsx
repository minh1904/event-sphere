'use client';
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const frameworks = [
  { value: '', label: 'Tất cả' },
  { value: 'Doanh nghiệp', label: 'Doanh nghiệp' },
  { value: 'Văn hóa', label: 'Văn hóa' },
  { value: 'Thể thao', label: 'Thể thao' },
  { value: 'Giáo dục', label: 'Giáo dục' },
  { value: 'Xã hội', label: 'Xã hội' },
  { value: 'Quảng bá', label: 'Quảng bá' },
  { value: 'Gây quỹ', label: 'Gây quỹ' },
  { value: 'Âm nhạc/Giải trí', label: 'Âm nhạc/Giải trí' },
];

export function FilterType() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(searchParams.get('type') || '');

  // Đồng bộ giá trị với searchParams khi load trang
  React.useEffect(() => {
    setValue(searchParams.get('type') || '');
  }, [searchParams]);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? '' : currentValue;
    setValue(newValue);
    setOpen(false);

    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set('type', newValue);
    } else {
      params.delete('type');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-transparent border-black"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : 'Danh mục'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Tìm kiếm" />
          <CommandList>
            <CommandEmpty>Không tìm thấy</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
