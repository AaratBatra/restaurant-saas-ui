import { AutoComplete, Option } from "@/components/ui/autocomplete";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { ArrowLeft, ArrowRight, Trash } from "lucide-react";
import React, { ReactNode, useState } from "react";
const employees: Option[] = [
	{
		value: "smith",
		label: "Smith",
		name: "Smith",
		employeeId: "123456",
		department: "BOH",
		avatar: "https://github.com/shadcn.png",
		display: (
			<div className="w-[400px] flex items-center gap-2">
				<Avatar className="place-self-end">
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt="@shadcn"
					/>
				</Avatar>
				<p>
					Name: <span>Smith</span>
				</p>
				<p>
					Employee ID: <span>123456</span>
				</p>
				<p>
					Department: <span>BOH</span>
				</p>
			</div>
		),
	},
	{
		value: "john",
		label: "John",
		name: "John",
		employeeId: "245678",
		department: "FOH",
		avatar: "https://github.com/shadcn.png",
		display: (
			<div className="w-[400px] flex items-center gap-2">
				<Avatar>
					<AvatarImage
						src="https://github.com/shadcn.png"
						alt="@shadcn"
					/>
				</Avatar>
				<p>
					Name: <span>John</span>
				</p>
				<p>
					Employee ID: <span>245678</span>
				</p>
				<p>
					Department: <span>FOH</span>
				</p>
			</div>
		),
	},
];
// { setFullFormState }: { setFullFormState: Function }
const CashPDQForm = () => {
	const [emps, setEmps] = useState<(Option & { advanceProvided: number })[]>(
		[]
	);
	function handleEmployeeChange(emp: Option) {
		if (!emps.find((e) => e.value === emp.value)) {
			setEmps([...emps, { ...emp, advanceProvided: 0 }]);
		}
	}
	return (
		<div className="w-full flex flex-col gap-10">
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>Till</h3>
					<h3>£ 0.00</h3>
				</div>
				<div className="flex items-center gap-4">
					<FormInput
						name="firstFloor"
						label="First Floor"
						type="number"
                        info="Enter first floor value"
						acceptAmount
					/>
					<FormInput
						name="groundFloor"
						label="Ground Floor"
						type="number"
                        info="Enter ground floor value"
						acceptAmount
					/>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>Petty Cash</h3>
					<h3>£ 0.00</h3>
				</div>
				<div className="grid grid-cols-3 gap-4">
					<FormInput
						name="cashpdqfood"
						label="Food"
						type="number"
                        info="Enter food value"
						acceptAmount
					/>
					<FormInput
						name="cashpdqdrink"
						label="Drink"
						type="number"
                        info="Enter drink value"
						acceptAmount
					/>
					<FormInput
						name="repairs"
						label="Repairs"
						type="number"
                        info="Enter repairs value"
						acceptAmount
					/>
					<FormInput
						name="pps"
						label="PPS"
						type="number"
                        info="Enter pps value"
						acceptAmount
					/>
					<FormInput
						name="misc"
						label="Misc"
						type="number"
                        info="Enter misc value"
						acceptAmount
					/>
					<FormInput
						name="depositReceived"
						label="Deposit Received"
						type="number"
                        info="Enter deposit received value"
						acceptAmount
					/>
					<FormInput
						name="depositPaid"
						label="Deposit Paid"
						type="number"
                        info="Enter deposit paid value"
						acceptAmount
					/>
					<FormInput
						name="voucher"
						label="Voucher"
						type="number"
                        info="Enter voucher value"
						acceptAmount
					/>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>PDQ</h3>
					<h3>£ 0.00</h3>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-6">
						<p>PDQ All</p>
						<div className="flex items-center gap-4">
							<FormInput
								name="amex"
								label="AMEX"
								type="number"
                                info="Enter amex value"
								acceptAmount
							/>
							<FormInput
								name="visa"
								label="VISA"
								type="number"
                                info="Enter visa value"
								acceptAmount
							/>
							<FormInput
								name="mastercard"
								label="MASTERCARD"
								type="number"
                                info="Enter mastercard value"
								acceptAmount
							/>
						</div>
					</div>
					<div className="flex items-center gap-6">
						<p>Stripe</p>
						<div className="flex items-center gap-4">
							<FormInput
								name="stripe"
								label="Amount"
								type="number"
                                info="Enter stripe value"
								acceptAmount
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>Wage Advances</h3>
					<h3>£ 0.00</h3>
				</div>
				<div className="flex flex-col gap-4 mb-16">
					<div className="w-[500px]">
						<AutoComplete
							onValueChange={handleEmployeeChange}
							options={employees}
							emptyMessage="No employees found"
							placeholder="Search by employee name"
						/>
					</div>
					{emps &&
						emps.map((emp) => (
							<div key={emp.employeeId as string} className="w-full flex items-baseline gap-20 ps-4">
								<Avatar className="place-self-end">
									<AvatarImage
										className="place-self-end"
										src={emp.avatar as string}
										alt="@shadcn"
									/>
								</Avatar>
								<p>{emp.employeeId as string}</p>
								<p>{emp.name as string}</p>
								<p>{emp.department as string}</p>
								<FormInput
									name={emp.name as string}
									label={"Advance Provided"}
									type="number"
									acceptAmount
								/>
								<Button
									variant={"ghost"}
									size={"icon"}
									className="text-red-500 rounded-full place-self-end"
									onClick={() =>
										setEmps([
											...emps.filter(
												(e) => e.name !== emp.name
											),
										])
									}
								>
									<Trash className="w-4 h-4" />
								</Button>
							</div>
						))}
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

export default CashPDQForm;
