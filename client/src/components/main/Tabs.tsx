import { TabsContent, TabsList, TabsTrigger,Tabs as TabsPrimitive } from '@radix-ui/react-tabs'
import React from 'react'

export default function Tabs() {
  return (
        <TabsPrimitive defaultValue="account" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
        </TabsPrimitive>
    )
}
