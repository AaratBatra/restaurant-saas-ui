"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, Plus, Save, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { navItems } from "./navItems";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDate } from "@/components/ui/FormDate";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormInput } from "@/components/ui/FormInput";
import Image from "next/image";

const schema = z.object({
	date: z.date(),
	time: z.enum(["AM", "PM"]),
	startTime: z.string(),
	endTime: z.string(),
});

const Integration = () => {
	const router = useRouter();
	const [activeNav, setActiveNav] = useState<number>(0);
	return (
		<div className="w-full flex gap-4 h-full">
			<div className="h-full flex-grow-0 flex-shrink-0 basis-40 flex flex-col gap-2 shadow-xl">
				<div className="h-16 w-full flex items-center justify-start px-4">
					<Button
						className="w-6 h-16 font-extrabold hover:bg-transparent"
						variant={"ghost"}
						size={"icon"}
						type="button"
						onClick={() => router.back()}
					>
						<ArrowLeft className="!size-10" />
					</Button>
				</div>
				{navItems.map((item, idx) => (
					<Button
						key={idx}
						className={cn(
							"w-full h-12 justify-start rounded-none",
							activeNav === idx && "nav-item"
						)}
						variant={"ghost"}
						onClick={() => setActiveNav(idx)}
					>
						{item.icon} {item.label}
					</Button>
				))}
			</div>
			<div className="flex-1 px-3">
				<h1>Integrations - {navItems[activeNav].label}</h1>
				{activeNav > 1 ? (
					<div className="w-full h-full no-integration">

					</div>
				) : (
					<div className="flex items-center gap-4">
						<div className="w-60 h-60 shadow-lg rounded-lg text-center p-2 flex flex-col justify-center gap-4 items-center">
							<Image
								src={
									"https://media-exp3.licdn.com/dms/image/C4E0BAQHPw9K691wb-w/company-logo_200_200/0/1519873897120?e=2159024400&v=beta&t=dr3GnYCsTPEBTBkg3jvSgZUPwdu8Zi7sH56Lk3kyZb8"
								}
								alt="ShopWaveProfile"
								className="object-contain mx-auto"
								width={150}
								height={150}
							/>
							<p className="text-gray-300 text-center">
								ShopWave
							</p>
						</div>
						<div className="w-60 h-60 shadow-lg rounded-lg text-center p-2 flex flex-col justify-center gap-4 items-center">
							<Image
								src={
									"https://upload.wikimedia.org/wikipedia/commons/e/ef/Foodics_logo.jpg"
								}
								alt="Foodics Logo"
								className="object-contain mx-auto justify-self-center block "
								width={150}
								height={150}
							/>
							<p className="text-gray-300 text-center justify-self-end">
								Foodics
							</p>
						</div>
						<div className="w-60 h-60 shadow-lg rounded-lg text-center p-2 flex flex-col justify-center gap-4 items-center">
							<Image
								src={
									"https://th.bing.com/th/id/R.296992347c7a2fef35d36c04c69f3969?rik=0xDhPGtm0lEN5Q&riu=http%3a%2f%2fwww.darcyservices.com.au%2fblog%2fwp-content%2fuploads%2f2013%2f09%2fxero-logo.jpg&ehk=hYUbjdYonyY6U5MoMHb2UaCOvaPTpeO5KzFL1na6HSI%3d&risl=&pid=ImgRaw&r=0"
								}
								alt="XeroProfile"
								className="object-contain mx-auto"
								width={150}
								height={150}
							/>
							<p className="text-gray-300 text-center">
								Xero Profile
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Integration;
