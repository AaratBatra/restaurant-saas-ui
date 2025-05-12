import React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Shift } from "@/types/ShiftCalendar"
import { format, parse } from "date-fns"

interface ShiftFormProps {
  shift: Shift,
  onSubmit: (shift: Shift) => void,
  onDelete?: (shiftToDelete: Shift) => void,
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

const ShiftForm = ({ shift, onSubmit, onDelete, onClose }: ShiftFormProps) => {
  //console.log("shift", shift);
  const form = useForm({
    defaultValues: {
      title: shift?.title || "New Shift",
      start: format(shift.start, "yyyy-MM-dd'T'HH:mm"),//shift?.start ? new Date(shift.start).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
      end: format(shift.end, "yyyy-MM-dd'T'HH:mm"),
      employee: shift?.employee || "",
      department: shift?.department || "",
    },
  })
  console.log(form.formState.errors)

  const handleSubmit = (data: {
    title: string;
    start: string;
    end: string;
    employee: string;
    department: string;
}) => {
    onSubmit({
      ...data,
      start: parse(data.start, "yyyy-MM-dd'T'HH:mm", new Date()),
      end: parse(data.end, "yyyy-MM-dd'T'HH:mm", new Date()),
      id: shift?.id,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          {onDelete && shift && shift.id && (
            <Button type="button" variant="destructive" onClick={() => onDelete(shift)}>
              Delete
            </Button>
          )}
          <Button type="button" variant="outline" onClick={()=>onClose(false)}>
            Cancel
          </Button>
          <Button type="submit">Save Shift</Button>
        </div>
      </form>
    </Form>
  )
}

export default ShiftForm