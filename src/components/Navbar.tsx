import Image from "next/image";
import React from "react";
import TimeAndDate from "./TimeAndDate";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
	return (
		<div className="fixed top-0 z-50 w-full bg-white flex items-center justify-between px-2 shadow-md h-16">
			<Image
				src={
					"https://portal.restaurantonesolution.com/assets/images/ROS_FINAL-07.png"
				}
				className="object-cover w-fit h-fit"
				alt="ROS logo"
				priority
                width={110}
                height={110}
			/>
			<div className="flex items-center justify-end gap-4 w-1/3 max-lg:w-fill-available">
				<TimeAndDate className="max-md:hidden" />
				<Select defaultValue="Farhan Rest">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a user" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Users</SelectLabel>
							<SelectItem value="Farhan Rest">
								Farhan Rest
							</SelectItem>
							<SelectItem value="Creams Cardiff">
								Creams Cardiff
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Avatar>
					<AvatarImage
						src="https://portal.restaurantonesolution.com/assets/images/profile.png"
						alt="user"
					/>
					<AvatarFallback>User</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
};

export default Navbar;
