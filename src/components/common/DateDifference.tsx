import { cn } from "@/lib/utils";
import { formatDate, formatDistanceToNow } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  date: Date | string;
  className?: string;
};

export default function DateDifference({ date, className }: Props) {
  const parsedDate = new Date(date);

  console.log(parsedDate)
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <p
            className={cn(
              "text-xs text-tertiary cursor-pointer hover:underline w-fit",
              className
            )}
          >
            {formatDistanceToNow(parsedDate, { addSuffix: true })}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{formatDate(parsedDate, "EEEE, MMMM dd, yyyy 'at' h:mm aa")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
