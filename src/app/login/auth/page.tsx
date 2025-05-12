"use client";
import React from "react";
import "../login.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const LoginAuth = () => {
	return (
		<div className="loginPage w-screen h-screen relative">
			<div className="bg-white w-[450px] h-[480px] absolute z-10 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md flex flex-col items-center p-4 border">
				<Image
					src={
						"https://portal.restaurantonesolution.com/assets/images/ROS_FINAL-07.png"
					}
					className="block aspect-[3/2] object-cover w-fit h-fit"
					alt="ROS logo"
					priority
					width={120}
					height={120}
				/>
				<div className="w-full p-6 flex flex-col gap-2">
					<p className="text-lg">Sign in with your email address</p>
					<Input placeholder="Email" type="email" />
					<Input placeholder="Password" type="password" />
					<Link href={"#"} className="text-sm text-blue-500 underline">Forgot your password?</Link>
					<Button size={"lg"} className="bg-blue-500 w-40 px-4 py-2 mt-4 hover:bg-blue-600">
						Sign in
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LoginAuth;
