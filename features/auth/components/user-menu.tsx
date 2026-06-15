'use client';

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import {cn} from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; 
import { Badge } from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger} 
from '@/components/ui/dropdown-menu';
import { SIGN_IN_PATH } from "../utils";
import { CaretCircleUpIcon, SignOutIcon } from "@phosphor-icons/react";

export const DEFAULT_PLAN = 'Free';

export type userMenuUser = {name?:"string|null", email?:"string|null", image?:"string|null"};

export type userMenuTriggerVariant = 'compact'|'profile';

export type userMenuProps = { user: userMenuUser;
    variant?: userMenuTriggerVariant;
    plan?: string;
    className?: string;
}

export function getDisplayName (user: userMenuUser){
    return user.name?.trim() || user.email?.split("@")[0] || "User";
}

export function getInitials( user: userMenuUser) {
    const source = user.name?.trim() || user.email ||'U';
    const parts = source.split("/\s+/").filter(Boolean);
    if (parts.length >=2 ) { return `${parts[0][0]}${parts[1][0]}`.toUpperCase();}
    return source.slice(0,2).toUpperCase();
}

function UserAvatar ( { user, size = "default",} : 
    { user: userMenuUser; size? : "default"|"sm"|"lg" })    {
    return (
        <Avatar size={size}>
            {user.image ? (<AvatarImage src={user.image} alt={getDisplayName(user)}/>):null}
            <AvatarFallback> {getInitials(user)}</AvatarFallback> 
        </Avatar>
    )
}

export function UserMenu(
    {
        user,
        variant = "profile",
        plan= DEFAULT_PLAN,
        className
    } : userMenuProps) 
    {
        const router = useRouter();
        const displayName = getDisplayName(user);
        const handleSignOut = async () => {
            await authClient.signOut(
                {
                    fetchOptions:
                    {
                        onSuccess: ()=> {
                            router.push(SIGN_IN_PATH);
                        },
                    },
                });
            };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
            className={cn(className)}
            render ={
                variant === "compact" ? (<Button variant="ghost" size="icon" className="rounded-full" arial-label="Open account menu" />) :
                ( <Button variant="ghost" className="h-9 gap-2 px-2" arial-label="Open account menu" />)
            }
            >
            <UserAvatar
                user={user} size={variant === "compact" ? "default": "sm"} />
                {variant === "profile" ? (
                    <>
                    <span className="max-w-32 truncate text-left text-xs font-medium"> {displayName}</span>
                    <CaretCircleUpIcon className="size-4 text-muted-foreground "/>
                    </>

                ) : null
                }
            
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div>
                            <UserAvatar user={user} />
                            <div>
                                <p> {displayName} </p>
                                {user.email ? ( <p> {user.email} </p>) :null }
                                <Badge> 
                                    {plan} plan
                                </Badge>
                            </div>
                        </div>

                    </DropdownMenuLabel>

                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem variant ="distructive" onClick={handleSignOut} >
                        <SignOutIcon />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

type UserMenuWithSessionProps = Omit<userMenuProps, "user">;

export function UserMenuWithSession (props: UserMenuWithSessionProps) {
    const { data : session ,isPending } = authClient.useSession();

    if (isPending || !session?.user) {
        return null;
    }

    return <UserMenu user={session.user} {...props} />;
} 
