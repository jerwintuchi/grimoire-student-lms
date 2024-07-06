import { IconBadge } from "@/components/ui/icon-badge"
import { LucideIcon } from "lucide-react"


interface InfoCardProps {
    numberOfItems: number,
    label: string, 
    variant?: "default" | "success",
    icon: LucideIcon,
   
}

export const InfoCard = ({
    icon: Icon,
    variant,
    label,
    numberOfItems
}: InfoCardProps) => {
    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            <IconBadge
            variant={variant}
            icon={Icon}
            />
            <div className="text-gray-500 text-sm">
                <p className="font-medium">{label} {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}</p>
            </div>
        </div>
    )
}