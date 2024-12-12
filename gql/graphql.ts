/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  attendancePairs: Array<AttendancePair>;
  attendances: Array<Attendance>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  employees: Array<Employee>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Attendance = {
  __typename?: 'Attendance';
  admin: Admin;
  adminId: Scalars['ID']['output'];
  checkInPair?: Maybe<AttendancePair>;
  checkOutPair?: Maybe<AttendancePair>;
  createdAt: Scalars['DateTime']['output'];
  employee: Employee;
  employeeId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  status: AttendanceStatus;
  timestamp: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AttendancePair = {
  __typename?: 'AttendancePair';
  admin: Admin;
  adminId: Scalars['ID']['output'];
  checkIn?: Maybe<Attendance>;
  checkInId?: Maybe<Scalars['ID']['output']>;
  checkOut?: Maybe<Attendance>;
  checkOutId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  employee: Employee;
  employeeId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum AttendanceStatus {
  CheckedIn = 'CHECKED_IN',
  CheckedOut = 'CHECKED_OUT'
}

export type CreateEmployeeInput = {
  age: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNo: Scalars['String']['input'];
  position: Scalars['String']['input'];
  profileImage?: InputMaybe<Scalars['String']['input']>;
};

export type Employee = {
  __typename?: 'Employee';
  age: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNo: Scalars['String']['output'];
  position: Scalars['String']['output'];
  profileImage?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  checkIn: AttendancePair;
  checkOut: AttendancePair;
  createAttendance: Attendance;
  createAttendancePair: AttendancePair;
  createEmployee: Employee;
  deleteEmployee: Employee;
  updateAttendance: Attendance;
  updateAttendancePair: AttendancePair;
  updateEmployee: Employee;
};


export type MutationCheckInArgs = {
  employeeId: Scalars['ID']['input'];
};


export type MutationCheckOutArgs = {
  employeeId: Scalars['ID']['input'];
};


export type MutationCreateAttendanceArgs = {
  adminId: Scalars['ID']['input'];
  employeeId: Scalars['ID']['input'];
  status: AttendanceStatus;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};


export type MutationCreateAttendancePairArgs = {
  adminId: Scalars['ID']['input'];
  checkInId?: InputMaybe<Scalars['ID']['input']>;
  checkOutId?: InputMaybe<Scalars['ID']['input']>;
  date: Scalars['DateTime']['input'];
  employeeId: Scalars['ID']['input'];
};


export type MutationCreateEmployeeArgs = {
  age: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  input: CreateEmployeeInput;
  name: Scalars['String']['input'];
  phoneNo: Scalars['String']['input'];
  position: Scalars['String']['input'];
  profileImage: Scalars['String']['input'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAttendanceArgs = {
  id: Scalars['ID']['input'];
  status?: InputMaybe<AttendanceStatus>;
};


export type MutationUpdateAttendancePairArgs = {
  checkInId?: InputMaybe<Scalars['ID']['input']>;
  checkOutId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationUpdateEmployeeArgs = {
  age?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  profileImage?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  AttendanceByDate: Array<Attendance>;
  AttendanceByEmployee: Array<Attendance>;
  AttendanceByWeek: Array<Attendance>;
  VerifyAdmin?: Maybe<Scalars['String']['output']>;
  VerifyEmployee?: Maybe<Scalars['String']['output']>;
  admin?: Maybe<Admin>;
  admins: Array<Admin>;
  attendance?: Maybe<Attendance>;
  attendancePair?: Maybe<AttendancePair>;
  attendancePairs: Array<AttendancePair>;
  attendances: Array<Attendance>;
  employee?: Maybe<Employee>;
  employees: Array<Employee>;
  getSignedUrl?: Maybe<Scalars['String']['output']>;
  useAdmin?: Maybe<Admin>;
  useEmployee?: Maybe<Employee>;
};


export type QueryAttendanceByDateArgs = {
  date: Scalars['DateTime']['input'];
};


export type QueryAttendanceByEmployeeArgs = {
  employeeId: Scalars['ID']['input'];
};


export type QueryAttendanceByWeekArgs = {
  week: Scalars['Int']['input'];
};


export type QueryVerifyAdminArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryVerifyEmployeeArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryAdminArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAttendanceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAttendancePairArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetSignedUrlArgs = {
  fileName: Scalars['String']['input'];
  fileType: Scalars['String']['input'];
};
