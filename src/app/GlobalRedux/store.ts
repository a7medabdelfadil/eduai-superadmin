"use client";
import { configureStore } from "@reduxjs/toolkit";
import { courseSlice } from "../create-course/api/createCourseSlice";
import { feedbackSlice } from "../feedback/api/feedbackSlice"
import { findAccountSlice } from "../(auth)/forget-password/api/findAccountSlice";
import { selectEmailSlice } from "../(auth)/otp/api/validateCode";
import { loginSlice } from "../(auth)/login/api/loginSlice";
import { AllCoursesSlice } from "../resource-management/api/getCoursesSlice";
import { backupsApis } from "../backups/api/backupsApis";
import { schoolsApis } from "../manage-school/api/manageSchool";
import { createSchoolSlice } from "../add-new-school/api/createSchoolApi";
import { dashboardSlice } from "../Dashboard/api/dashboardApi";
import { systemsApis } from "../education-system/api/manageSystems";
import { adminAPi } from "../manage-school/admin/api/adminApis";
import ThemeSlice from "./ThemeSlice";
import { editAdminApi } from "../manage-school/admin/edit-admin/[id]/api/EditAdminApi";
import { SchoolPlansApi } from "../school-plans/api/SchoolPlans";
import { curriculumApis } from "../curriculum-management/api/curriculumApi";
import { ResetPassword } from "../(auth)/reset-password/api/resetPassword";
import { createSchoolPlanApi } from "../create-school-plans/api/createSchoolPlansApi";
import { profileApis } from "@/components/api/profileApi";
import { createSchoolPermissionsSlice } from "../manage-school/features/[id]/api/schoolPermissions";
import { authSlice } from "./AuthSlice";
import { sideBarSlice } from "./SidebarSlice";
import { notifiesSlice } from "../notifies/api/notifies";

export const store = configureStore({
    reducer: { // RootReducer
        theme: ThemeSlice,
        auth: authSlice.reducer,
        sidebar: sideBarSlice.reducer,
        [loginSlice.reducerPath]: loginSlice.reducer,
        [courseSlice.reducerPath]: courseSlice.reducer,
        [feedbackSlice.reducerPath]: feedbackSlice.reducer,
        [findAccountSlice.reducerPath]: findAccountSlice.reducer,
        [selectEmailSlice.reducerPath]: selectEmailSlice.reducer,
        [AllCoursesSlice.reducerPath]: AllCoursesSlice.reducer,
        [backupsApis.reducerPath]: backupsApis.reducer,
        [schoolsApis.reducerPath]: schoolsApis.reducer,
        [createSchoolSlice.reducerPath]: createSchoolSlice.reducer,
        [dashboardSlice.reducerPath]: dashboardSlice.reducer,
        [systemsApis.reducerPath]:systemsApis.reducer,
        [adminAPi.reducerPath]: adminAPi.reducer,
        [editAdminApi.reducerPath]: editAdminApi.reducer,
        [SchoolPlansApi.reducerPath]: SchoolPlansApi.reducer,
        [curriculumApis.reducerPath]: curriculumApis.reducer,
        [ResetPassword.reducerPath]: ResetPassword.reducer,
        [createSchoolPlanApi.reducerPath]: createSchoolPlanApi.reducer,
        [profileApis.reducerPath]: profileApis.reducer,
        [createSchoolPermissionsSlice.reducerPath]: createSchoolPermissionsSlice.reducer,
        [notifiesSlice.reducerPath]: notifiesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().
            concat(loginSlice.middleware).
            concat(courseSlice.middleware).
            concat(feedbackSlice.middleware).
            concat(findAccountSlice.middleware).
            concat(selectEmailSlice.middleware).
            concat(AllCoursesSlice.middleware).
            concat(backupsApis.middleware).
            concat(schoolsApis.middleware).
            concat(createSchoolSlice.middleware).
            concat(dashboardSlice.middleware).
            concat(systemsApis.middleware).
            concat(adminAPi.middleware).
            concat(editAdminApi.middleware).
            concat(SchoolPlansApi.middleware).
            concat(curriculumApis.middleware).
            concat(ResetPassword.middleware).
            concat(createSchoolPlanApi.middleware).
            concat(profileApis.middleware).
            concat(createSchoolPermissionsSlice.middleware).
            concat(notifiesSlice.middleware) 

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;