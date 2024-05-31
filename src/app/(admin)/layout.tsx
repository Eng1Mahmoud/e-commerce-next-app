import React from "react";
import ".././globals.css";
import { Alert } from "@/components/general/Alert";
import { DrawerContent } from "@/components/admin/DrawerContent";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" dir="rtl">
      <body>
        <Alert />
        <div>
          <div className="drawer md:hidden">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn btn-primary"
              >
                Open drawer
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              
               <DrawerContent/>
            </div>
          </div>
          <div className="flex ">
          <div className="md:w-[20%] md:block bg-[#f2f2f2] hidden shadow-md h-[110vh]">
            <DrawerContent/>
            </div>
            <div className="md:w-[80%] w-[100%]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default layout;
