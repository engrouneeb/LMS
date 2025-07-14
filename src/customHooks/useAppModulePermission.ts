import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Appstate } from 'reducers/Appstate';
import { DataAccess } from '../../data/DAL';
import { AppModuleScreenTypeEnum, AppModuleTypeEnum } from '../constants';

const { Get } = DataAccess();
/// Menu-to-module/screen mapping
const menuMapping: Record<string, { module: AppModuleTypeEnum; screen: AppModuleScreenTypeEnum }> = {
    // Attendance module
    // AddMakeUpClass: { module: AppModuleTypeEnum.Attendance, screen: AppModuleScreenTypeEnum.AddMakeUpClass },
    // //Courses module
    AssignedStudents: { module: AppModuleTypeEnum.Courses, screen: AppModuleScreenTypeEnum.AssignedStudents },
    ClassNotification: { module: AppModuleTypeEnum.Courses, screen: AppModuleScreenTypeEnum.ClassNotification },
    ClassOverview: { module: AppModuleTypeEnum.Courses, screen: AppModuleScreenTypeEnum.ClassOverview },
    ClassRoster: { module: AppModuleTypeEnum.Courses, screen: AppModuleScreenTypeEnum.ClassRoster },

    //Messages module
    ParentsMessages: { module: AppModuleTypeEnum.Messages, screen: AppModuleScreenTypeEnum.Parents },
    StaffMessages: { module: AppModuleTypeEnum.Messages, screen: AppModuleScreenTypeEnum.Staff },
    StudentsMessages: { module: AppModuleTypeEnum.Messages, screen: AppModuleScreenTypeEnum.Students },
    InstructorsMessages: { module: AppModuleTypeEnum.Messages, screen: AppModuleScreenTypeEnum.Instructors },
    FranchiseMessages: { module: AppModuleTypeEnum.Messages, screen: AppModuleScreenTypeEnum.FranchiseOwners },
    AdminMessages: { module: AppModuleTypeEnum.Messages, screen: AppModuleScreenTypeEnum.Admin },
    ViewInstructorStudentChatMessages: { module: AppModuleTypeEnum.Messages, screen: AppModuleScreenTypeEnum.ViewInstructorStudentChat },
    ViewInstructorParentChatMessages: { module: AppModuleTypeEnum.Messages, screen: AppModuleScreenTypeEnum.ViewInstructorParentChat },
    GroupsMessages: { module: AppModuleTypeEnum.Messages, screen: AppModuleScreenTypeEnum.Groups },
    CreateGroupMessages: { module: AppModuleTypeEnum.Messages, screen: AppModuleScreenTypeEnum.CreateGroup },

    //Student Info module
    StudentInfoOverView: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.Overview },
    UpdateStudentInfo: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.UpdateStudentInfo },
    UpdateFamilyInfo: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.UpdateFamilyInfo },
    ShowContacts: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.ShowContacts },
    UpdateContact: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.UpdateContact },
    AddContact: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.AddContact },
    Skills: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.Skills },
    Attachments: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.Attachments },
    Classes: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.Classes },
    AddToClass: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.AddToClass },
    Events: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.Events },
    Medicals: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.Medicals },
    Feedback: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.Feedback },
    Billing: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.Billing },
    AddPaymentMethod: { module: AppModuleTypeEnum.StudentInfo, screen: AppModuleScreenTypeEnum.AddPaymentMethod },

    // staff info module
    StaffClassOverview: { module: AppModuleTypeEnum.StaffInfo, screen: AppModuleScreenTypeEnum.Overview },
    StaffDetails: { module: AppModuleTypeEnum.StaffInfo, screen: AppModuleScreenTypeEnum.Details },
    StaffSkills: { module: AppModuleTypeEnum.StaffInfo, screen: AppModuleScreenTypeEnum.Skills },
    StaffIntro: { module: AppModuleTypeEnum.StaffInfo, screen: AppModuleScreenTypeEnum.StaffIntro },
    StaffVideo: { module: AppModuleTypeEnum.StaffInfo, screen: AppModuleScreenTypeEnum.Video },
    StaffAssignStudents: { module: AppModuleTypeEnum.StaffInfo, screen: AppModuleScreenTypeEnum.AssignStudents },
    StaffAttachments: { module: AppModuleTypeEnum.StaffInfo, screen: AppModuleScreenTypeEnum.Attachments },
    StaffFeedback: { module: AppModuleTypeEnum.StaffInfo, screen: AppModuleScreenTypeEnum.Feedback },

    // Time Tracker module
    Setup: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.Setup },
    AddApproval: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.AddApproval },
    Wages: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.Wages },
    AddWages: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.AddWages },
    Schedule: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.Schedule },
    CreateSchedule: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.CreateSchedule },
    PublishSchedule: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.PublishSchedule },
    Timesheet: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.Timesheet },
    AddTimesheet: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.AddTimesheet },
    TimeOff: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.TimeOff },
    AddTimeoff: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.AddTimeoff },
    Requests: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.Requests },
    RequestTimesheet: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.RequestTimesheet },
    RequestTimeOff: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.RequestTimeOff },
    RequestExpense: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.RequestExpense },
    RequestCover: { module: AppModuleTypeEnum.TimeTracker, screen: AppModuleScreenTypeEnum.RequestCover },
    //Events module
    EventRoster:{module:AppModuleTypeEnum.Events,screen:AppModuleScreenTypeEnum.EventRoster}
};


export const useAppModulePermission = () => {
    const { permissions } = useSelector((state: Appstate) => state.AppModulePermission);
    // Permission resolution logic
    const filterMenuOptions = (
        menuOptions: any[] | string
    ): any[] | boolean => {
        if (!permissions || permissions.length === 0) {
            return Array.isArray(menuOptions) ? [] : false;
        }
    
        const resolvePermission = (module: number, screen: number): boolean => {
            return permissions.some(
                (permission) =>
                    +permission.module === +module &&
                    +permission.screen === +screen &&
                    permission.grantPermission
            );
        };
    
        if (Array.isArray(menuOptions)) {
            return menuOptions.filter((menu) => {
                const { module, screen } = menu;
                if (module === undefined || screen === undefined) {
                    console.warn(`Missing module or screen in menu:`, menu);
                    return false;
                }
                return resolvePermission(module, screen);
            });
        } else if (typeof menuOptions === 'string') {
            const mapping = menuMapping[menuOptions];
            if (!mapping) {
                console.warn(`No mapping found for ${menuOptions}`);
                return false;
            }
            return resolvePermission(mapping.module, mapping.screen);
        }
    
        return Array.isArray(menuOptions) ? [] : false;
    };


    return { filterMenuOptions };
};
