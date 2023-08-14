import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { TabPanel } from '@mui/joy';
import { SignIn } from '../SignIn/SignIn';
import { Signup } from '../SignUp/SignUp';
import "./Tabs.scss"
import variables from "../_variables.module.scss"

export default function Mytabs({toast ,Username}) {
    return (
        <div className='tabContainer'>
            <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }} size="md">
                <TabList
                    disableUnderline

                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 1,
                        gap: 0.5,
                        borderRadius: 'xl',
                        bgcolor: variables.inputColor,
                        [`& .${tabClasses.root}[aria-selected="true"]`]: {
                            boxShadow: `0 0 7px ${variables.third} `,
                            bgcolor: variables.third,
                            color: variables.whiteColor
                        },
                        [`.${tabClasses.root}`]: {
                            color: variables.whiteColor
                        },
                        [`& .${tabClasses.root}:hover`]: {
                            bgcolor:variables.third,
                            color: variables.whiteColor
                        },
                        [`& .${tabClasses.root}`]: {
                            width: '120px', 
                          }
                    }}
                >
                    <Tab
                       color={variables.whiteColor}
                        disableIndicator
                    >Sign In</Tab>
                    <Tab
                     disableIndicator
                     color={variables.whiteColor}
                    >Sign Up</Tab>
                </TabList>
                <TabPanel value={0}>
                    <SignIn getUsername={Username}/>
                </TabPanel>
                <TabPanel value={1}>
                    <Signup  toastData={toast} />
                </TabPanel>

            </Tabs>
        </div>
    );
}