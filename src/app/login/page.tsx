import React from "react";
import "./login.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPage = () => {
	return (
		<div className="loginPage w-screen h-screen relative">
			<div className="bg-white w-[320px] h-[350px] absolute z-10 top-[25%] left-[65%] rounded-lg shadow-md flex flex-col items-center justify-center">
				<h1>
					Welcome to{" "}
					<Image
						src={
							"https://portal.restaurantonesolution.com/assets/images/ROS_FINAL-07.png"
						}
						className="inline object-contain -ml-4 -mt-1 w-fit h-fit"
						alt="ROS logo"
						priority
						width={80}
						height={80}
					/>
				</h1>
				<Image
					src={
						"https://portal.restaurantonesolution.com/assets/images/ROS_FINAL-05.png"
					}
					alt="one solution"
					className="aspect-[7/2] h-fit w-fit object-cover -ml-4"
					width={300}
					height={200}
				/>
                <Link href={"/login/auth"}><Button className="bg-sky-500 w-40 px-4 py-2 mt-4 hover:bg-sky-600">LOGIN</Button></Link>
                
			</div>
		</div>
	);
};

export default LoginPage;
