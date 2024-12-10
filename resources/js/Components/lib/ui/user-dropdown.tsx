import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,} from "@nextui-org/react";
import {User} from "@/types";
import {getAvatarUrl} from "@/Components/utils";

export type UserDropdownProps = {
    user: User | undefined;
    text: {
        signedInAs: string;
        logOut: string;
        logIn: string;
        dashboard: string;
    };
    logout: () => void;
}

/**
 * UserDropdown component for the user dropdown menu.
 * @param user - The user object.
 * @param text - The text for the dropdown menu.
 * @param logout - The function to log out the user.
 * @returns JSX.Element
 */
export function UserDropdown({
                                 text,
                                 user,
                                 logout,
                             }: UserDropdownProps) {
    if (!user) return null;

    return (
        <Dropdown placement='bottom-end'>
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as='button'
                    className='transition-transform shrink-0'
                    color='primary'
                    name={user.name}
                    size='sm'
                    src={getAvatarUrl(user.id.toString())}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
                <DropdownItem key='profile' className='h-14 gap-2'>
                    <p className='font-semibold'>{text.signedInAs}</p>
                    <p className='font-semibold'>
                        {user.email}
                    </p>
                </DropdownItem>
                <DropdownItem key='dashboard' href='/dashboard'>
                    {text.dashboard}
                </DropdownItem>
                <DropdownItem key='logout' color='danger' onPress={logout}>
                    {text.logOut}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
        ;
}
