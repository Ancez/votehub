import React from "react";
import logo from "../assets/logo.svg";

export function Header() {
  return (
    <div className="mt-4 flex justify-center items-center">
      <img src={logo} alt="Votehub" className="w-16" />

      <div className="ml-4">
        <h1 className="text-2xl font-bold leading-7 text-gray-50 sm:text-3xl sm:truncate">Votehub</h1>
        <p className="text-gray-200">The blockchain voting station</p>
      </div>
    </div>
  )
}