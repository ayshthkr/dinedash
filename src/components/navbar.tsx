'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { User } from "@supabase/supabase-js";



function Navbar({ user }: { user: User | null }) {

  const signedLinks = [{label: 'My Account',link: '/my-account'}, {label: 'SignOut',link: '/signout'}]

  const links = [
    {label: 'Order',link: '/order'},
    {label: 'Near me',link: '/near-me'},
    ...(user == null ? [{label: 'Login',link: '/login'}] : signedLinks)
  ]

  const pathname = usePathname();
  const cl = (href: string) => href == pathname ? 'secondary' : 'outline'

  return <nav className="w-full flex flex-col md:flex-row justify-between items-center md:h-32 border-b-4 border-white/50">
    <div className="h-full">
      <Link href='/' className="flex items-center h-full">
        <img src="dinedash-transparent.png" alt="Logo" className="h-32 md:h-full" />
        <span className="text-3xl font-funky">DineDash</span>
      </Link>
    </div>
    
    <div className="flex flex-col w-full md:w-auto md:flex-row gap-1 md:gap-4">
      {links.map(link => <Link href={link.link} key={link.link} className="w-full p-0.5">
        <Button variant={cl(link.link)} className="w-full">{link.label}</Button>
      </Link>)}
    </div>
    
    
  </nav>
}

export default Navbar;