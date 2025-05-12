"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, PlusCircle } from "lucide-react";
import MonthSwitcher from "@/components/calendar-components/MonthSwitcher";
import LeavesCalendar from "./LeavesCalendar";
import { Components, EventProps } from "react-big-calendar";
import {
  addDays,
  areIntervalsOverlapping,
  eachDayOfInterval,
  format,
  isAfter,
  isEqual,
  isSameDay
} from "date-fns";
import { cn } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import AddEditLeaveSheet, { schema } from "./AddEditLeaveSheet";
import { z } from "zod";
import EmployeesOnLeave from "./EmployeesOnLeave"; // Assuming you have this component

export type Leave = {
  id: string;
  employees: {
    id: string;
    avatar: string;
    name: string;
    comments: string;
  }[];
  start: Date;
  end: Date;
  allDay?: boolean;
  // When vacation is more than one day, range holds the start and end
  range?: {
    start: Date;
    end: Date;
  };
};

const initialLeaves: Leave[] = [
  {
    id: faker.string.nanoid(8),
    employees: [{
      id: faker.string.nanoid(8),
      name: faker.person.firstName(),
      avatar: faker.image.avatar(),
      comments: faker.lorem.sentence({ min: 2, max: 4 }),
    }],
    start: new Date(),
    end: new Date(),
    allDay: true,
  },
];

/**
 * This helper “upserts” a leave entry for a given day.  
 * When editing, it uses vacationId; otherwise it checks for overlapping days.
 */
function mutateLeaves(data: z.infer<typeof schema>, leaves: Leave[]): Leave[] {
  const sameDayLeaveIdx = leaves.findIndex(
    (leave) =>
      data.vacationId
        ? leave.id === data.vacationId
        : isSameDay(leave.start, data.startDate)
  );
  if (sameDayLeaveIdx !== -1) {
    // If the employee already exists on that day then do nothing.
    if (leaves[sameDayLeaveIdx].employees.find((emp) => emp.name === data.employeeName)) {
      return leaves;
    } else {
      // Otherwise, add the new employee.
      leaves[sameDayLeaveIdx].employees.push({
        id: data.employeeId || faker.string.nanoid(8),
        avatar: faker.image.avatar(),
        name: data.employeeName,
        comments: data.comments || ""
      });
      return leaves;
    }
  } else {
    // No leave entry exists for that day – add one.
    leaves.push({
      allDay: true,
      id: faker.string.nanoid(8),
      employees: [{
        id: data.employeeId || faker.string.nanoid(8),
        name: data.employeeName,
        avatar: faker.image.avatar(),
        comments: data.comments || "",
      }],
      start: data.startDate,
      end: data.startDate
    });
    return leaves;
  }
}

/**
 * For vacations with a range, we iterate through each day in the interval
 * and call mutateLeaves on each date.
 */
function generateNewLeaves(data: z.infer<typeof schema>, leaves: Leave[]): Leave[] {
  if (data.vacationType === "single") {
    return mutateLeaves(data, leaves);
  } else {
    if (!data.endDate) return leaves;
    let updatedLeaves = leaves;
    const givenDates = eachDayOfInterval({ start: data.startDate, end: data.endDate });
    for (const d of givenDates) {
      updatedLeaves = mutateLeaves({ ...data, startDate: d }, updatedLeaves);
    }
    return updatedLeaves;
  }
}

/**
 * When editing or deleting a vacation we remove the employee from the
 * previously created leave entries. For range vacations we use the vacation.range.
 */
function removeEmployeeFromLeaves(
  vacation: Leave,
  employeeName: string,
  currentLeaves: Leave[]
): Leave[] {
  // Determine affected dates.
  const datesToUpdate = vacation.range
    ? eachDayOfInterval({ start: vacation.range.start, end: vacation.range.end })
    : [vacation.start];

  const updatedLeaves = currentLeaves
    .map((leave) => {
      if (datesToUpdate.some((d) => isSameDay(leave.start, d))) {
        return { ...leave, employees: leave.employees.filter((emp) => emp.name !== employeeName) };
      }
      return leave;
    })
    .filter((leave) => leave.employees.length > 0);
  return updatedLeaves;
}

const Leaves = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [leaves, setLeaves] = useState<Leave[]>(initialLeaves);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [empsOpen, setEmptsOpen] = useState(false);
  const [currentLeave, setCurrentLeave] = useState<Leave | undefined>();
  const [currentEmployee, setCurrentEmployee] = useState<string | undefined>();
  const today = useMemo(() => new Date(), []);

  const components: Components<Leave, object> = useMemo(() => {
    return {
      event: (props: EventProps<Leave>) => {
        return (
          <div
            role="button"
            onClick={() => {
              setCurrentLeave(props.event);
              setEmptsOpen(true);
            }}
            className="relative w-full !h-[70px] text-black flex items-end justify-end"
          >
            <div>{props.event.employees.map(e => e.name).join(", ")}</div>
          </div>
        );
      },
      header: (props) => <div>{format(props.date, "eeee")}</div>,
      dateCellWrapper: (props) => {
        const isToday = isSameDay(props.value, today);
        const isAfterToday = isAfter(props.value, today);
        const isEvent = leaves.some(
          (leave) => leave.start.toDateString() === props.value.toDateString()
        );
        if (isAfterToday) {
          if (isEvent) {
            return (
              <div className="relative w-full border bg-orange-100">
                {props.children}
              </div>
            );
          }
          return (
            <div className="relative w-full border">
              <Button
                className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-full !h-full p-0 bg-transparent shadow-none group cursor-pointer hover:bg-transparent hover:text-black"
                onClick={() => {
                  setCurrentLeave(undefined);
                  setCurrentEmployee(undefined);
                  setSheetOpen(true);
                }}
              >
                <PlusCircle className="group-hover:opacity-100 opacity-0 w-4 h-4" />
              </Button>
            </div>
          );
        }
        return (
          <div
            className={cn(
              "relative w-full border",
              isToday && "bg-sky-200 after:absolute after:top-0 after:content-['TODAY']",
              isEvent && "bg-orange-100/60",
              (isToday && isEvent) && "bg-orange-100/60 after:absolute after:top-0 after:content-['TODAY']"
            )}
          >
            {props.children}
          </div>
        );
      },
    };
  }, [today, leaves]);

  /**
   * This function is used for both adding and editing vacations.
   * In edit mode, we remove the old vacation (for the given employee) and then re-add with new data.
   */
  function handleSubmit(data: z.infer<typeof schema>) {
    if (data.vacationId) {
      // EDIT MODE
      const vacationToEdit = leaves.find(leave => leave.id === data.vacationId);
      if (vacationToEdit) {
        const leavesAfterRemoval = removeEmployeeFromLeaves(
          vacationToEdit,
          data.employeeName,
          leaves
        );
        const newLeaves =
          data.vacationType === "single"
            ? mutateLeaves(data, leavesAfterRemoval)
            : generateNewLeaves(data, leavesAfterRemoval);
        setLeaves(newLeaves);
        setSheetOpen(false);
      }
    } else {
      // ADD MODE
      const newLeaves =
        data.vacationType === "single"
          ? mutateLeaves(data, leaves)
          : generateNewLeaves(data, leaves);
      setLeaves(newLeaves);
      setSheetOpen(false);
    }
  }

  /**
   * Delete function – removes the employee from all leaves of the vacation.
   */
  function handleDelete(vacation: Leave) {
    // For simplicity, remove using the first employee's name.
    const updatedLeaves = removeEmployeeFromLeaves(vacation, vacation.employees[0].name, leaves);
    setLeaves(updatedLeaves);
  }

  /**
   * Opens the edit sheet for a particular employee on a vacation.
   */
  function handleEditOpen(data: Leave, employeeId: string) {
    setCurrentLeave(data);
    setCurrentEmployee(employeeId);
    setEmptsOpen(false);
    setSheetOpen(true);
  }
  
  function handleAddOpen() {
    setCurrentEmployee(undefined);
    setCurrentLeave(undefined);
    setEmptsOpen(false);
    setSheetOpen(true);
  }
  return (
    <div className="w-full p-4 max-md:p-2">
      <div className="w-full flex items-center justify-between max-md:flex-col">
        <h1>Leaves</h1>
        <div className="flex items-center gap-2 max-md:w-full max-md:justify-between">
          <Button type="button" onClick={handleAddOpen}>
            <Plus className="w-4 h-4" />
            Add Vacation
          </Button>
          <MonthSwitcher date={date} setDate={setDate} />
        </div>
      </div>
      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2 max-md:mx-auto max-md:my-2">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="myleaves">My Leaves</TabsTrigger>
        </TabsList>
        <TabsContent value="employees">
          <LeavesCalendar<Leave>
            date={date}
            onNavigate={setDate}
            components={components}
            events={leaves}
          />
        </TabsContent>
        <TabsContent value="myleaves">
          <LeavesCalendar<Leave>
            date={date}
            onNavigate={setDate}
            components={components}
            events={leaves}
          />
        </TabsContent>
      </Tabs>
      <AddEditLeaveSheet
        open={sheetOpen}
        setOpen={setSheetOpen}
        onSubmit={handleSubmit}
        vacation={currentLeave}
        employeeId={currentEmployee}
      />
      {currentLeave && (
        <EmployeesOnLeave
          open={empsOpen}
          setOpen={setEmptsOpen}
          data={currentLeave}
          onEditOpen={handleEditOpen}
          onDelete={handleDelete}
          onAdd={handleAddOpen}
        />
      )}
    </div>
  );
};

export default Leaves;
