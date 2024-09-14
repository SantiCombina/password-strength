import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface Props {
    children: React.ReactNode;
    text: string;
}

export function TooltipComponent({children, text}: Props) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>{text}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
