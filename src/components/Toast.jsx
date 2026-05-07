import toast from "react-hot-toast";

function successToast(message, duration, position = "top-center") {
  toast.success(message, {
    duration: duration,
    position: position,
  });
}

function errorToast(message, duration, position = "top-center") {
  toast.error(message, {
    duration: duration,
    position: position,
  });
}

function iconToast(message, duration, position = "top-center", icon = "💋") {
  toast(message, {
    duration: duration,
    position: position,
    icon: icon,
  });
}

export { successToast, errorToast, iconToast };
