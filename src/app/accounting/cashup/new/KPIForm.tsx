import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { Plus, Trash } from "lucide-react";
import React, { useState } from "react";

const KPIForm = () => {
	const [refundBreakdowns, setRefundBreakDowns] = useState<number[]>([1]);
	const [complaints, setComplaints] = useState<number[]>([1]);
	const [discountBreakdowns, setDiscountBreakdowns] = useState<number[]>([1]);
	return (
		<div className="w-full flex flex-col gap-10">
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>Covers</h3>
					<h3>£ 0.00</h3>
				</div>
				<div className="flex items-center gap-4 justify-between">
					<FormInput
						name="tableCovers"
						label="Table Covers"
						type="number"
						info="Enter total table covers value"
						acceptAmount
					/>
					<FormInput
						name="thirdPartyCovers"
						label="Third Party Covers"
						type="number"
						info="Enter total third party value"
						acceptAmount
					/>
					<FormInput
						name="discount"
						label="Discount"
						type="number"
						info="Enter total discount value"
						acceptAmount
					/>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>Covers</h3>
					<h3>£ 0.00</h3>
				</div>
				{refundBreakdowns.map((_, idx) => (
					<div
						className="flex gap-4 items-center justify-between"
						key={idx}
					>
						<FormInput
							name={`billNumber-${idx}`}
							label="Bill Number"
							type="text"
							className="flex-1"
							info="Enter refund breakdown bill number"
						/>
						<FormInput
							name={`reason-${idx}`}
							label="Reason"
							type="text"
							className="flex-1"
							info="Enter refund breakdown reason"
						/>
						<FormInput
							name={`amount-${idx}`}
							label="Amount"
							type="text"
							className="flex-1"
							info="Enter refund breakdown value"
						/>
						{idx < refundBreakdowns.length - 1 ? (
							<Button
								variant={"ghost"}
								size={"icon"}
                                type="button"
								className="rounded-full text-red-500"
								onClick={() =>
									setRefundBreakDowns(
										refundBreakdowns.filter(
											(item) => item !== idx + 1
										)
									)
								}
							>
								<Trash className="w-4 h-4" />
							</Button>
						) : (
							<Button
								className="w-32"
                                type="button"
								onClick={() =>
									setRefundBreakDowns([
										...refundBreakdowns,
										refundBreakdowns.length + 1,
									])
								}
							>
								<Plus className="w-4 h-4" />
								Add
							</Button>
						)}
					</div>
				))}
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>Complaints</h3>
				</div>
				{complaints.map((_, idx) => (
					<div
						className="flex gap-4 items-center justify-between"
						key={idx}
					>
						<FormSelect
							name={`complaint-${idx}`}
							label="Complaint"
							selectItems={[
								{
									value: "Damaged Accessories",
									label: "Damaged Accessories",
								},
								{
									value: "Food had a foreign object",
									label: "Food had a foreign object",
								},
								{
									value: "Food came out at the wrong temperature",
									label: "Food came out at the wrong temperature",
								},
								{
									value: "Lack of maintenance",
									label: "Lack of maintenance",
								},
								{
									value: "Wrong menu received",
									label: "Wrong menu received",
								},
							]}
						/>
						<FormInput
							name={`description-${idx}`}
							label="Reason"
							className="w-[300px]"
							type="text"
						/>
						{idx < complaints.length - 1 ? (
							<Button
								variant={"ghost"}
                                type="button"
								size={"icon"}
								className="rounded-full text-red-500"
								onClick={() =>
									setComplaints(
										complaints.filter(
											(item) => item !== idx + 1
										)
									)
								}
							>
								<Trash className="w-4 h-4" />
							</Button>
						) : (
							<Button
								className="w-32"
                                type="button"
								onClick={() =>
									setComplaints([
										...complaints,
										complaints.length + 1,
									])
								}
							>
								<Plus className="w-4 h-4" />
								Add
							</Button>
						)}
					</div>
				))}
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>Discount Breakdown</h3>
					<h3>£ 0.00</h3>
				</div>
				{discountBreakdowns.map((_, idx) => (
					<div
						className="flex gap-4 items-center justify-between"
						key={idx}
					>
						<FormInput
							name={`billNumber-${idx}`}
							label="Bill Number"
							type="text"
							info="Enter refund breakdown bill number"
						/>
						<FormInput
							name={`reason-${idx}`}
							label="Reason"
							type="text"
							info="Enter refund breakdown reason"
						/>
						<FormInput
							name={`amount-${idx}`}
							label="Amount"
							type="text"
							info="Enter refund breakdown value"
						/>
						{idx < discountBreakdowns.length - 1 ? (
							<Button
								variant={"ghost"}
								size={"icon"}
                                type="button"
								className="rounded-full text-red-500"
								onClick={() =>
									setDiscountBreakdowns(
										discountBreakdowns.filter(
											(item) => item !== idx + 1
										)
									)
								}
							>
								<Trash className="w-4 h-4" />
							</Button>
						) : (
							<Button
								className="w-32"
                                type="button"
								onClick={() =>
									setDiscountBreakdowns([
										...discountBreakdowns,
										discountBreakdowns.length + 1,
									])
								}
							>
								<Plus className="w-4 h-4" />
								Add
							</Button>
						)}
					</div>
				))}
			</div>
			<div className="w-full flex flex-col gap-2">
				<div className="w-full flex items-center justify-between">
					<h3>Void</h3>
				</div>
				<div className="flex items-center gap-4">
					<FormInput
						name="void"
						label="Void"
						type="text"
						info="Enter void value"
					/>
				</div>
			</div>
		</div>
	);
};

export default KPIForm;
