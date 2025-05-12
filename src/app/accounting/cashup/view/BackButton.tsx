"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
    const router = useRouter();
	return (
		<Button
			className="w-6 h-16 font-extrabold hover:bg-transparent"
			variant={"ghost"}
			size={"icon"}
			type="button"
			onClick={() => router.back()}
		>
			<ArrowLeft className="!size-10" />
		</Button>
	);
};
