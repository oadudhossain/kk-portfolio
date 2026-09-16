import type {Metadata} from "next";
import {profile} from "@/data/profile";
import "./globals.css";
const title="Kaniz Sadia Kabita | Sociology Student at University of Dhaka";
const siteUrl=process.env.NEXT_PUBLIC_SITE_URL;
export const metadata:Metadata={...(siteUrl?{metadataBase:new URL(siteUrl),alternates:{canonical:"/"}}:{}),title,description:profile.description,icons:{icon:"/favicon.svg",shortcut:"/favicon.ico",apple:"/apple-touch-icon.png"},openGraph:{title,description:profile.description,type:"website"},twitter:{card:"summary",title,description:profile.description}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
