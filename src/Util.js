export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export const VanType = Object.freeze({
  SIMPLE: { value: "simple", color: "#E17654" },
  RUGGED: { value: "rugged", color: "#115E59" },
  LUXURY: { value: "luxury", color: "#161616" }
})

export const FormStatus = Object.freeze({
  IDLE: "idle",
  SUBMITTING: "submitting"
})
