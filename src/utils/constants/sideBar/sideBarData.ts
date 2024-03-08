import { subItemRoute } from "./subItemRoute"
import gauge from "../../../assets/images/sidebar/gauge.svg"
import fileDocument from "../../../assets/images/sidebar/file-document.svg"
import glyph from "../../../assets/images/sidebar/Glyph.svg"
import listAdd from "../../../assets/images/sidebar/listAdd.svg"
import logOut from "../../../assets/images/sidebar/log-out.svg"
import userGroup from "../../../assets/images/sidebar/user-group.svg"
import home from "../../../assets/images/sidebar/home.svg"
import { type SideBarItemProps } from "../../../types/sideBar/SideBarTypes"
import { SideBarDataProps } from "../../../types/utils/ConstantsTypes"

function sideBarData({ locationParms } : SideBarDataProps): SideBarItemProps[] {

    return [
        {
            title: "student",
            subItems: [
                {
                    icon: listAdd,
                    label: "Enrollment",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Enrollment",
                    route: `enrollment?${subItemRoute({location: locationParms.slice(1), sectionType: 'student'})}`, 
                    pathName: "/enrollment/student"
                },
                {
                    icon: glyph,
                    label: "Attendance",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Attendance",
                    route: `attendance?${subItemRoute({location: locationParms.slice(1), sectionType: 'student'})}`, 
                    pathName: "/attendance/student"
                },
                {
                    icon: fileDocument,
                    label: "Performance",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Performance",
                    route: `performance?${subItemRoute({location: locationParms.slice(1), sectionType: 'student'})}`, 
                    pathName: "/performance/student"
                },
                {
                    icon: gauge,
                    label: "Final result",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Final-Result",
                    route: `final-result?${subItemRoute({location: locationParms.slice(1), sectionType: 'student'})}`, 
                    pathName: "/final-result/student"
                },
                {
                    icon: logOut,
                    label: "Transfer",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Student-Transfer",
                    route: `transfer?${subItemRoute({location: locationParms.slice(1), sectionType: 'student'})}`, 
                    pathName: "/transfer/student"
                }
            ]
        },
        {
            title: "staff",
            subItems: [
                {
                    icon: userGroup,
                    label: "Staff registry",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Enrollment-Staff",
                    route:`enrollment?${subItemRoute({location: locationParms.slice(1), sectionType: 'staff'})}`, 
                    pathName: "/enrollment/staff"
                },
                {
                    icon: glyph,
                    label: "Attendance",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Attendance-Staff",
                    route: `attendance?${subItemRoute({location: locationParms.slice(1), sectionType: 'staff'})}`, 
                    pathName: "/attendance/staff"
                },
                {
                    icon: logOut,
                    label: "Transfer",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS-Staff-Transfer",
                    route: `transfer?${subItemRoute({location: locationParms.slice(1), sectionType: 'staff'})}`, 
                    pathName: "/transfer/staff"
                }
            ]
        },
        {
            title: "Home",
            subItems: [
                {
                    icon: home,
                    label: "Home",
                    showBadge: false,
                    disabled: false,
                    appName: "SEMIS",
                    route: `home`,
                    pathName: "/home"
                }
            ]
        }
    ]
}

export { sideBarData }