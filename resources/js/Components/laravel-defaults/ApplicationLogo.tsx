import {SVGAttributes} from "react";
import {PlayIcon} from "lucide-react";
import {cn} from "@/Components/utils";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <PlayIcon {...props} className={cn(props.className)}/>
    );
}
