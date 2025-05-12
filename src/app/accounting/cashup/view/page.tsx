import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { Download } from "lucide-react";
import React from "react";
import { BackButton } from "./BackButton";

const CashUpView = () => {
	return (
		<div className="w-full p-4">
			<div className="w-full flex justify-between">
				<div className="flex gap-3">
					<BackButton />
					<div className="pl-1">
						<h2 className="ml-1">{format(new Date(), "dd MMM yyyy, EEE")}</h2>
						<div className="flex items-center gap-2">
							<Avatar>
								<AvatarImage src="https://github.com/shadcn.png" />
							</Avatar>
							<div>BEE BEE <p>ROLE_MANAGEMENT</p></div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-end">
					<Button>
						<Download className="w-4 h-4" /> Download
					</Button>
					<p>CR_CA_07Feb2025_PM_002</p>
				</div>
			</div>
			<div className="w-full flex flex-col gap-4 p-2">
				<MyCard />
				<MyCard />
				<MyCard />
				<MyCard />
				<MyCard />
				<MyCard />
				<MyCard />
				<MyCard />
				<MyCard />
			</div>
		</div>
	);
};

export default CashUpView;

const MyCard = () => {
	return (
		<Card className="w-full shadow-lg">
			<CardHeader className="p-4 flex justify-between border-b border-b-gray-200">
				<h2>EPOS TAKINGS</h2>
				<h2 className="text-lg">
					Total: <span className="font-bold">£ 1712.96</span>
				</h2>
			</CardHeader>
			<CardContent className="p-5 flex items-center justify-between">
				<div className="w-32">
					Food <p className="text-lg font-bold">£ 940.75</p>
				</div>
				<div className="w-32">
					Drinks <p className="text-lg font-bold">£ 940.75</p>
				</div>
				<div className="w-32">
					Total Discount <p className="text-lg font-bold">£ 940.75</p>
				</div>
				<div className="w-32">
					Other <p className="text-lg font-bold">£ 940.75</p>
				</div>
				<div className="w-32">
					Tax <p className="text-lg font-bold">£ 940.75</p>
				</div>
				<div className="w-32">
					Service Charges{" "}
					<p className="text-lg font-bold">£ 940.75</p>
				</div>
				<div className="w-32">
					Tips <p className="text-lg font-bold">£ 940.75</p>
				</div>
			</CardContent>
		</Card>
	);
};
