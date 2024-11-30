import {Button} from "@nextui-org/react";
import {SunIcon} from "lucide-react";

export const ThemeSwitch = () => {

    return (
        <Button variant="flat" color="primary" isIconOnly={true}>
            <SunIcon className={"w-4 h-4"}/>
        </Button>
    )
};
