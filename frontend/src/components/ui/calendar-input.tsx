import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import * as React from "react";

function formatDate(date?: Date): string {
  if (!date || isNaN(date.getTime())) return "";

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}

function parseDate(str: string): Date | undefined {
  const parsed = new Date(str);
  return isNaN(parsed.getTime()) ? undefined : parsed;
}

type CalendarInputProps = Omit<React.ComponentProps<"input">, "onChange"> & {
  dateValue?: Date;
  onChange?: (value?: Date) => void;
};

export default function CalendarInput({
  dateValue,
  onChange,
  ...props
}: CalendarInputProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(dateValue);
  const [inputValue, setInputValue] = React.useState(formatDate(dateValue));

  React.useEffect(() => {
    setDate(dateValue);
    setInputValue(formatDate(dateValue));
  }, [dateValue]);

  const handleSelect = React.useCallback(
    (selected?: Date) => {
      setDate(selected);
      setInputValue(formatDate(selected));
      onChange?.(selected);
      setOpen(false);
    },
    [onChange]
  );

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      const parsed = parseDate(value);
      setDate(parsed);
      onChange?.(parsed);
    },
    [onChange]
  );

  return (
    <div className="relative flex gap-2">
      <Input
        {...props}
        value={inputValue}
        className="bg-background pr-10"
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
