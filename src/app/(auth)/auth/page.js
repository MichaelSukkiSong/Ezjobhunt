"use client";

import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebaseui/dist/firebaseui.css";
import Link from "next/link";
import { Icon } from "@chakra-ui/react";
import { MdSettings } from "../../(main)/icons";
import fb from "@/app/services/firebase";

const Page = () => {
  const loadFirebaseui = async () => {
    const auth = fb.getAuth();

    const firebaseui = await import("firebaseui");
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", {
      signInFlow: "popup",
      signInSuccessUrl: "/",
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          signInMethod:
            firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
          // Allow the user the ability to complete sign-in cross device,
          // including the mobile apps specified in the ActionCodeSettings
          // object below.
          forceSameDevice: false,
          // Used to define the optional firebase.auth.ActionCodeSettings if
          // additional state needs to be passed along request and whether to open
          // the link in a mobile app if it is installed.
          emailLinkSignIn: function () {
            return {
              // Additional state showPromo=1234 can be retrieved from URL on
              // sign-in completion in signInSuccess callback by checking
              // window.location.href.
              url: "https://localhost:3000",
              // Custom FDL domain.
              // dynamicLinkDomain: "example.page.link",
              // Always true for email link sign-in.
              handleCodeInApp: true,
              // Whether to handle link in iOS app if installed.
              // iOS: {
              //   bundleId: "com.example.ios",
              // },
              // Whether to handle link in Android app if opened in an Android
              // device.
              // android: {
              //   packageName: "com.example.android",
              //   installApp: true,
              //   minimumVersion: "12",
              // },
            };
          },
        },
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          clientId:
            "759583787906-s090s0l4seelvlieu8tojnvaoh8mm9dr.apps.googleusercontent.com",
        },
      ],
    });
  };

  useEffect(() => {
    loadFirebaseui();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="m-8">
        <div className="w-fit">
          <div className="flex items-center space-x-1">
            <Icon as={MdSettings} className="" />
            <Link href="/">
              <span className="text-xl font-extrabold">Ezjobhunt</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col flex-auto sm:max-w-md mt-8 mb-32">
          <div className="px-10">
            <div className="flex flex-col justify-center mt-10 text-center">
              <span className="font-bold text-2xl">
                Create an account or sign in to continue.
              </span>
            </div>
          </div>
          <div className="my-4" id="firebaseui-auth-container"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
