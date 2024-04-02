"use client";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

// Contents
export function P({ children, styles }) {
  return (
    <p
      className={`space-y-4 text-[clamp(1rem,5vw,1.25rem)] font-normal leading-loose ${styles}`}
    >
      {children}
    </p>
  );
}
export function H1({ children, styles }) {
  return (
    <h1
      className={`text-[clamp(1.5rem,5vw,2rem)] font-black capitalize ${styles}`}
    >
      {children}
    </h1>
  );
}
export function H2({ children, styles }) {
  return (
    <h2 className={`text-[clamp(1.7rem,5vw,2rem)] font-extrabold ${styles}`}>
      {children}
    </h2>
  );
}

// Inputs
export function Input(props) {
  return (
    <div
      className={`flex w-full flex-col items-start justify-start gap-2 ${props.styles}`}
    >
      {props.label && (
        <label
          htmlFor={props.id}
          className={`font-semibold text-gray-700 ${props.required && "before:pr-1 before:text-red-500 before:content-['*']"}`}
        >
          {props.label}
        </label>
      )}
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        className="before:* w-full rounded-md border border-gray-300 p-4 outline-none hover:border-gray-400 focus:border-blue-600"
        defaultValue={props.defaultValue}
      />
    </div>
  );
}
export function SelectInput(props) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      {props.label && (
        <label
          className={`font-semibold text-gray-700 ${props.required && "before:pr-1 before:text-red-500 before:content-['*']"}`}
        >
          {props.label}
        </label>
      )}
      <Select
        isMulti={props.isMulti}
        isDisabled={props?.disabled}
        isClearable={true}
        className="w-full"
        defaultValue={props?.defaultValue}
        name={props.name}
        noOptionsMessage={props?.noOptionsMessage}
        onChange={props?.onChange}
        options={props.options}
        placeholder={props.placeholder}
        required={props.required}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            padding: ".7rem",
            border: "1px solid #e5e7eb",
          }),
        }}
      />
    </div>
  );
}
export function CreatableSelectInput(props) {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      {props.label && (
        <label
          className={`font-semibold text-gray-700 ${props.required && "before:pr-1 before:text-red-500 before:content-['*']"}`}
        >
          {props.label}
        </label>
      )}
      <CreatableSelect
        isMulti
        isClearable
        options={props.options}
        defaultValue={props?.defaultValue}
        name={props.name}
        placeholder={props.placeholder}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            padding: ".7rem",
            border: "1px solid #e5e7eb",
          }),
        }}
        className="w-full"
      />
    </div>
  );
}

// Buttons
export function BackButton() {
  return (
    <button
      className="flex items-center justify-start"
      onClick={() => history.back()}
    >
      <svg
        fill="#000000"
        height="25px"
        width="25px"
        version="1.1"
        id="Layer_1"
        viewBox="0 0 330 330"
      >
        <path
          id="XMLID_92_"
          d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
	l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
	C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
        />
      </svg>{" "}
    </button>
  );
}
export function LinkButton({ children, to, styles }) {
  return (
    <Link
      href={to}
      className={`rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-500 ${styles}`}
    >
      {children}
    </Link>
  );
}
export function SubmitButton({ text, loadingText, form, styles }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-500 ${styles}`}
      type="submit"
      form={form}
      disabled={pending}
    >
      {pending ? loadingText : text}
    </button>
  );
}
