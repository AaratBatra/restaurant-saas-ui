import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

const ThirdPartyForm = () => {
	return (
		<div className="w-full flex flex-col gap-10">
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>Third Party</h3>
					<h3>£ 0.00</h3>
				</div>
				<div className="flex items-center gap-10 flex-wrap">
					<FormInput
						name="uber"
						label="Uber"
						type="number"
						info="Enter uber value"
						acceptAmount
					/>
					<FormInput
						name="supper"
						label="Supper"
						type="number"
						info="Enter supper value"
						acceptAmount
					/>
					<FormInput
						name="deliveroo"
						label="Deliveroo"
						type="number"
						info="Enter deliveroo value"
						acceptAmount
					/>
					<FormInput
						name="yumsprogram"
						label="Yums Program"
						type="number"
						info="Enter yums program value"
						acceptAmount
					/>
				</div>
			</div>
            <div className="flex items-center gap-2 justify-end">
				<Button
					className="border-black px-5 hover:shadow-lg place-self-end"
					variant={"outline"}
				>
					<ArrowLeft className="w-4 h-4" /> Previous
				</Button>
				<Button
					className="border-black px-5 hover:shadow-lg place-self-end"
					variant={"outline"}
				>
					Next <ArrowRight className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
};

export default ThirdPartyForm;
