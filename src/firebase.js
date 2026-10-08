import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBeZdVHm9xkpmXqzx5PvY70d8KKgjLIMw",
  authDomain: "driveshare-da14f.firebaseapp.com",
  projectId: "driveshare-da14f",
  storageBucket: "driveshare-da14f.firebasestorage.app",
  messagingSenderId: "419778053028",
  appId: "1:419778053028:web:818f165d57e889ae2ff731",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

const RECAPTCHA_CONTAINER_ID = "recaptcha-container";
const CONFIRMATION_RESULT_KEY = "__driveShareConfirmationResult";

let recaptchaVerifier = null;
let recaptchaInitPromise = null;
let confirmationResult = null;
let sendInFlightPromise = null;

export function isTenDigitIndianMobile(value) {
  return /^\d{10}$/.test(value);
}

export function toE164India(tenDigitPhone) {
  return `+91${tenDigitPhone}`;
}

export function getPendingPhone() {
  return (
    sessionStorage.getItem("driveSharePendingPhone") ||
    localStorage.getItem("driveSharePhone") ||
    ""
  );
}

function setConfirmationResult(result) {
  confirmationResult = result;
  if (typeof window !== "undefined") {
    window[CONFIRMATION_RESULT_KEY] = result;
  }
}

export function getConfirmationResult() {
  if (confirmationResult) return confirmationResult;
  if (typeof window !== "undefined") {
    return window[CONFIRMATION_RESULT_KEY] || null;
  }
  return null;
}

export function getAuthErrorMessage(error) {
  const code = error?.code || "";

  switch (code) {
    case "auth/invalid-phone-number":
    case "auth/missing-phone-number":
      return "Please enter a valid 10-digit mobile number.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/quota-exceeded":
      return "SMS limit reached. Please try again later.";
    case "auth/operation-not-allowed":
      return "Phone sign-in is not enabled for this app.";
    case "auth/invalid-verification-code":
      return "Invalid OTP. Please check the code and try again.";
    case "auth/code-expired":
    case "auth/session-expired":
      return "This OTP has expired. Please request a new OTP.";
    case "auth/missing-verification-code":
      return "Please enter all 6 digits of the verification code.";
    case "auth/captcha-check-failed":
      return "Security check failed. Please try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    case "auth/billing-not-enabled":
      return "Firebase phone SMS is not available until billing is enabled on this project.";
    case "auth/invalid-app-credential":
    case "auth/missing-app-credential":
    case "auth/app-not-authorized":
    case "auth/unauthorized-domain":
    case "auth/unauthorized-continue-uri":
      return "This domain is not authorized for Firebase Authentication. Add localhost in Firebase Console → Authentication → Settings → Authorized domains.";
    default:
      return "Something went wrong. Please try again.";
  }
}

function ensureRecaptchaContainer() {
  let container = document.getElementById(RECAPTCHA_CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = RECAPTCHA_CONTAINER_ID;
    container.setAttribute("aria-hidden", "true");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.bottom = "0";
    container.style.width = "auto";
    container.style.height = "auto";
    container.style.overflow = "visible";
    document.body.appendChild(container);
  }
  return container;
}

function replaceRecaptchaContainer() {
  const existing = document.getElementById(RECAPTCHA_CONTAINER_ID);
  const next = document.createElement("div");
  next.id = RECAPTCHA_CONTAINER_ID;
  next.setAttribute("aria-hidden", "true");
  next.style.position = "fixed";
  next.style.left = "-9999px";
  next.style.bottom = "0";
  next.style.width = "auto";
  next.style.height = "auto";
  next.style.overflow = "visible";

  if (existing && existing.parentNode) {
    existing.parentNode.replaceChild(next, existing);
  } else if (typeof document !== "undefined") {
    document.body.appendChild(next);
  }
}

export function clearRecaptchaVerifier() {
  recaptchaInitPromise = null;

  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch {
      // Widget may already be cleared after a failed attempt.
    }
    recaptchaVerifier = null;
  }

  replaceRecaptchaContainer();

  if (typeof window !== "undefined") {
    window.recaptchaVerifier = null;
  }
}

function resetRecaptchaWidget(verifier) {
  try {
    const widgetId = verifier?.widgetId;
    if (typeof window !== "undefined" && window.grecaptcha && widgetId != null) {
      window.grecaptcha.reset(widgetId);
    }
  } catch {
    // Resend can still create a fresh verifier if reset is unavailable.
  }
}

export async function getRecaptchaVerifier() {
  ensureRecaptchaContainer();

  if (recaptchaVerifier) {
    return recaptchaVerifier;
  }

  if (recaptchaInitPromise) {
    return recaptchaInitPromise;
  }

  recaptchaInitPromise = (async () => {
    const verifier = new RecaptchaVerifier(auth, RECAPTCHA_CONTAINER_ID, {
      size: "invisible",
      callback: () => {},
      "expired-callback": () => {
        clearRecaptchaVerifier();
      },
      "error-callback": () => {
        clearRecaptchaVerifier();
      },
    });

    window.recaptchaVerifier = verifier;
    recaptchaVerifier = verifier;
    return verifier;
  })();

  try {
    return await recaptchaInitPromise;
  } catch (error) {
    recaptchaInitPromise = null;
    recaptchaVerifier = null;
    throw error;
  }
}

export async function sendPhoneOtp(tenDigitPhone) {
  if (!isTenDigitIndianMobile(tenDigitPhone)) {
    const invalid = new Error("Please enter a valid 10-digit mobile number.");
    invalid.code = "auth/invalid-phone-number";
    throw invalid;
  }

  if (sendInFlightPromise) {
    return sendInFlightPromise;
  }

  sendInFlightPromise = (async () => {
    const e164 = toE164India(tenDigitPhone);
    const verifier = await getRecaptchaVerifier();

    try {
      const result = await signInWithPhoneNumber(auth, e164, verifier);
      setConfirmationResult(result);
      sessionStorage.setItem("driveSharePendingPhone", tenDigitPhone);
      localStorage.setItem("driveSharePhone", tenDigitPhone);
      resetRecaptchaWidget(verifier);
      return result;
    } catch (error) {
      clearRecaptchaVerifier();
      throw error;
    }
  })();

  try {
    return await sendInFlightPromise;
  } finally {
    sendInFlightPromise = null;
  }
}

export async function confirmPhoneOtp(otp) {
  const code = String(otp || "").replace(/\D/g, "");
  if (code.length !== 6) {
    const missing = new Error("Please enter all 6 digits of the verification code.");
    missing.code = "auth/missing-verification-code";
    throw missing;
  }

  const pending = getConfirmationResult();
  if (!pending) {
    const expired = new Error("This OTP has expired. Please request a new OTP.");
    expired.code = "auth/code-expired";
    throw expired;
  }

  const result = await pending.confirm(code);
  return result;
}

export default app;
