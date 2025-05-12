"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormPassword } from "@/components/ui/FormPassword";
import React from "react";
import { useForm } from "react-hook-form";

const ChangeEmployeePin = () => {
	const form = useForm();
	function onsubmit(data: any) {
		console.log(data);
	}
	return (
		<div className="w-full p-4">
			<h1>Change Employee Pin</h1>
			<div className="w-full flex items-center justify-center">
				<Form {...form}>
					<form
						className="p-6 w-[320px] rounded-lg border shadow-md flex flex-col gap-2"
						onSubmit={form.handleSubmit(onsubmit)}
					>
						<FormPassword
							name="oldPin"
							label="Old Pin"
                            className="w-[240px]"
							minLength={6}
						/>
                        <p className="text-xs">Minimum 6 digits</p>
						<FormPassword
							name="newPin"
							label="New Pin"
                            className="w-[240px]"
							minLength={6}
						/>
                        <p className="text-xs">Minimum 6 digits</p>
						<FormPassword
							name="confirmPin"
							label="Confirm Pin"
                            className="w-[240px]"
							minLength={6}
						/>
                        <p className="text-xs">Re-Enter Pin</p>
                        <Button className="mx-auto" type="submit">Save</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default ChangeEmployeePin;
