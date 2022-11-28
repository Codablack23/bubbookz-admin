import Head from "next/head"
import Image from "next/image"
import Link from "next/link"

interface LayoutProps{
    children?:JSX.Element,
    pageTitle:string,
    image?:string
}

export default function AccountLayout(props:LayoutProps):JSX.Element{
    return(
        <div className="p-2 py-3 px-12 bub-container bg-grey min-h-screen max-w-full">
         <div className="">
         <Head>
            <title>{props.pageTitle}</title>
        </Head>
        <header>
            <Link href={"/"}>
                <a>
                 <Image
                  src={"/images/Logo.svg"}
                  width={"50px"}
                  height={"50px"}
                  alt={"logo"}/>
                </a>
            </Link>
          </header>
        <div className="mt-3">
          {props.children}
        </div>
         </div>
        </div>
    )
}