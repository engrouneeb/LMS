export type StudentInterface = 'Business Student' | 'Franchise Student';
export type ParentInterface = 'Business Parent' | 'Franchise Parent';
export type AdminInterface = 'Business Admin' | 'Franchise Admin';
export type ExecutiveInterface = 'Business Executive' | 'Franchise Executive';
export type CoordinatorInterface =
  | 'Business Coordinator'
  | 'Franchise Coordinator';
export type InstructorInterface =
  | 'Business Instructor'
  | 'Franchise Instructor'
  | 'Teacher';

type RoleInterface =
  | StudentInterface
  | ParentInterface
  | AdminInterface
  | ExecutiveInterface
  | CoordinatorInterface
  | InstructorInterface;

const checkRole = <T extends RoleInterface>(role: T, values: T[]): boolean =>
  values.includes(role);

export const isStudent = (role: StudentInterface) =>
  checkRole(role, ['Business Student', 'Franchise Student']);

export const isParent = (role: ParentInterface) =>
  checkRole(role, ['Business Parent', 'Franchise Parent']);

export const isAdmin = (role: AdminInterface) =>
  checkRole(role, ['Business Admin', 'Franchise Admin']);
export const isFranchiseAdmin = (role: AdminInterface) =>
  checkRole(role, ['Franchise Admin']);

export const isExecutive = (role: ExecutiveInterface) =>
  checkRole(role, ['Business Executive', 'Franchise Executive']);

export const isCoordinator = (role: CoordinatorInterface) =>
  checkRole(role, ['Business Coordinator', 'Franchise Coordinator']);

export const isInstructor = (role: InstructorInterface) =>
  checkRole(role, ['Business Instructor', 'Franchise Instructor', 'Teacher']);

export const isStaff = (role: InstructorInterface) =>
  checkRole(role, [
    'Business Instructor',
    'Franchise Instructor',
    'Teacher',
    'Business Executive',
    'Franchise Executive',
    'Business Coordinator',
    'Franchise Coordinator',
  ]);
