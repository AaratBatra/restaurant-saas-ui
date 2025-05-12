export type Department = {
    employees: string[];
    id: number;
    name: string;
}

export type Shift = {
    id?: string;
    employee: string;
    department: string;
    start: Date;
    end: Date;
    title: string;
}