"use client";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { Form } from "@/components/ui/form";
import { FormSelect } from "@/components/ui/FormSelect";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { Info } from "lucide-react";
import Link from "next/link";

export default function Home() {
	const form = useForm();
	function onSubmit(data: unknown) {
		console.log(data);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full p-4 flex flex-col gap-4"
			>
				<FloatingInput type="email" label="Email" className="w-60" />
				<FloatingInput type="text" label="Address" className="w-60" />
				<FloatingInput
					type="datetime-local"
					label="Date & Time"
					className="w-60"
				/>
				<FloatingInput type="date" label="Date" className="w-60" />
				<FormSelect
					name="color"
					label="Color"
					selectItems={[
						{ value: "red", label: "Red" },
						{ value: "blue", label: "Blue" },
						{ value: "green", label: "Green" },
					]}
				/>
				<Link href={"/login"}>View login page</Link>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="outline">Modal</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<Info className="w-10 h-10 mx-auto" />
							<AlertDialogTitle>
								Are you absolutely sure?
							</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will
								permanently delete your account and remove your
								data from our servers.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="justify-center">
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</form>
		</Form>
	);
}
