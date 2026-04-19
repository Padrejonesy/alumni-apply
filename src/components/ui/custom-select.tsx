import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type Option = {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[] | string[]
  value?: string | string[]
  onChange: (value: any) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  multiple?: boolean
  disabled?: boolean
  className?: string
  required?: boolean
  id?: string
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  multiple = false,
  disabled = false,
  className,
  required = false,
  id
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false)

  // Normalize options to Option[]
  const normalizedOptions = React.useMemo(() => {
    return options.map(opt => 
      typeof opt === 'string' ? { value: opt, label: opt } : opt
    )
  }, [options])

  const selectedValue = multiple 
    ? (Array.isArray(value) ? value : [])
    : (typeof value === 'string' ? value : "")

  const handleSelect = (currentValue: string) => {
    // Command uses lowercase for its selected values internally
    const originalOption = normalizedOptions.find(opt => opt.value.toLowerCase() === currentValue.toLowerCase() || opt.value === currentValue)
    if (!originalOption) return

    const actualValue = originalOption.value

    if (multiple) {
      const currentSelected = Array.isArray(selectedValue) ? selectedValue : []
      if (currentSelected.includes(actualValue)) {
        onChange(currentSelected.filter((v) => v !== actualValue))
      } else {
        onChange([...currentSelected, actualValue])
      }
    } else {
      onChange(actualValue === selectedValue ? "" : actualValue)
      setOpen(false)
    }
  }

  // Visual representation of selected items
  const renderValue = () => {
    if (multiple) {
      const arr = Array.isArray(selectedValue) ? selectedValue : []
      if (arr.length === 0) return <span className="text-[#AEAEB2]">{placeholder}</span>
      return (
        <div className="flex flex-wrap gap-1">
          {arr.map((val) => {
            const opt = normalizedOptions.find((o) => o.value === val)
            return (
              <span key={val} className="bg-[#1D1D1F] text-white text-[12px] px-2 py-0.5 rounded-full flex items-center gap-1">
                {opt?.label || val}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-red-400" 
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(arr.filter(v => v !== val))
                  }}
                />
              </span>
            )
          })}
        </div>
      )
    } else {
      if (!selectedValue) return <span className="text-[#AEAEB2]">{placeholder}</span>
      const opt = normalizedOptions.find((o) => o.value === selectedValue)
      return opt?.label || selectedValue
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between items-center px-4 py-3 bg-white border border-[#E5E5EA] rounded-[10px] text-[15px] text-[#1D1D1F] hover:bg-white hover:text-[#1D1D1F] focus:outline-none focus:border-[#1D1D1F] focus:ring-0 transition-colors duration-200 min-h-[46px] h-auto font-normal",
            className
          )}
        >
          <div className="flex-1 text-left truncate whitespace-normal min-w-0">
            {renderValue()}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {normalizedOptions.map((option) => {
                const isSelected = multiple 
                  ? (Array.isArray(selectedValue) && selectedValue.includes(option.value))
                  : selectedValue === option.value
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
