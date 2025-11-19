import { CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import * as React from "react";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-EU", {
    localeMatcher: "best fit",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  return !!date && !isNaN(date.getTime());
}

type CalendarInputProps = Omit<React.ComponentProps<"input">, "onChange"> & {
  dateValue?: Date;
  onChange?: (value: Date) => void;
};

export default function CalendarInput({
  dateValue,
  onChange,
  ...props
}: CalendarInputProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(dateValue);
  const [inputValue, setInputValue] = React.useState(formatDate(dateValue));

  const changeDate = React.useCallback((date?: Date) => {
    if (date && isValidDate(date)) {
      setDate(date);
      setInputValue(formatDate(date));
    }
  }, []);

  React.useEffect(() => {
    changeDate(dateValue);
  }, [dateValue]);

  return (
    <div className="relative flex gap-2">
      <Input
        {...props}
        value={inputValue}
        className="bg-background pr-10"
        onChange={(e) => {
          const parsed = new Date(e.target.value);
          changeDate(parsed);
        }}
        onClick={() => !open && setOpen(true)}
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
            onSelect={(selected) => {
              setOpen(false);
              changeDate(selected);
              if (selected) {
                onChange?.(selected);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
