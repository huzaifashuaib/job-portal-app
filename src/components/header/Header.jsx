import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, HeartPlus, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSigIn] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (searchParam.get("sign-in")) {
      setShowSigIn(true);
    }
  }, [searchParam]);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSigIn(false);
      setSearchParam({});
    }
  };
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src={"/logo.png"} className="h-20" />
        </Link>
        <div className="flex items-center gap-8">
          <SignedOut>
            <Button variant={"outline"} onClick={() => setShowSigIn(true)}>
              Login
            </Button>
            {/* <SignInButton /> */}
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to={"/post-jobs"}>
                <Button variant={"destructive"} className={"rounded-full "}>
                  <PenBox size={20} className="mr-2" />
                  Post Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "!h-10 !w-10 ring-2 ring-offset-white",
                  avatarImage: "object-cover",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/myjobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/savedJobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 w-full h-full flex justify-center items-center bg-black/90 z-10"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
