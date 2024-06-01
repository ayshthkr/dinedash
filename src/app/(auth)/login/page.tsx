import { SubmitButton } from "./submit-button";
import { signInWithGithub, signUp } from "@/app/actions/actions";
import Image from "next/image";
import { CircleUserRoundIcon, GithubIcon } from "lucide-react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <form className="animate-in flex-1 flex flex-col w-full min-h-[40vh] justify-center items-center gap-2 text-foreground">
      <Image
        src={"/dinedash-transparent.png"}
        width={1920}
        height={1080}
        alt="Logo"
        className="w-1/2 sm:w-1/4 h-full border-2 rounded-full"
      />
      <p className="text-3xl font-funky m-2 decor orange">
        Welcome to Dinedash
      </p>
      <SubmitButton formAction={signInWithGithub} pendingText="Signing In...">
        <span className="flex gap-2 items-center">
          <GithubIcon />
          Sign In with Github
        </span>
      </SubmitButton>
      <SubmitButton formAction={signUp} pendingText="Signing In...">
        <span className="flex gap-2 items-center">
          <CircleUserRoundIcon />
          Sign up anonymously
        </span>
      </SubmitButton>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}
