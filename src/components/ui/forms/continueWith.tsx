import Link from "next/link";
import GoogleBtn from '@/components/ui/googleBtn'


export default function ContinueWith({linkName,href}:{linkName:string,href:string}) {
  return (
    <>
           
    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-[-1] after:flex after:items-center after:border-t after:border-border mt-2">
          <span className="relative z-10 bg-[rgb(18,18,18)] px-1 rounded-s text-muted-foreground">
            Or continue with
          </span>
        </div>
      <GoogleBtn/>

    <div className="text-center text-sm pt-1">
        Don&apos;t have an account?{" "}
        <Link href={href} className="underline underline-offset-4">
          {linkName}
        </Link>
      </div>
    </>
  )
}
