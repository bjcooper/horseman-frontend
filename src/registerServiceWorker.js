/* eslint-disable no-console */

import { register } from "register-service-worker";
import { GlobalEvents } from "@/setup/global-events";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.info(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.info("Service worker has been registered.");
    },
    cached() {
      console.info("Content has been cached for offline use.");
    },
    updatefound() {
      console.info("New content is downloading.");
    },
    updated() {
      GlobalEvents.$emit("createAlert", {
        variant: "dark",
        icon: ["fas", "flag"],
        message:
          "An update is available! <a href='javascript:window.location.href=window.location.href'>Click here to update now.</a>",
        dismissable: true,
        repeating: true
      });
    },
    offline() {
      console.info(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
