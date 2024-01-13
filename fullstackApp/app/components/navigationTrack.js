"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Papa from "papaparse";
import { getDatabase } from "@/lib/mongo/db";
import { saveAs } from "file-saver";

const NavigationTrack = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const getLatestData = async () => {
    setIsLoading(true);
    await getDatabase().then((data) => {
      const jsonData = JSON.parse(data);
      jsonData.forEach((element) => {
        element["@context"] = {
          Year: "https://schema.org/yearBuilt",
          Weight: "https://schema.org/weight",
        };
      });
      const csvData = Papa.unparse(data);
      const blob1 = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      saveAs(blob1, "csv_data.csv");
      const jsonDatawithLd = JSON.stringify(jsonData);
      const blob2 = new Blob([jsonDatawithLd], {
        type: "text/json;charset=utf-8",
      });
      saveAs(blob2, "json_data.json");
      setIsLoading(false);
    });
  };
  if (isLoading)
    return <div>Fetching latest data and preparing it for download...</div>;
  return (
    <div className="container w-full mx-auto">
      <div className="flex flex-col justify-start sm:flex-row sm:items-center sm:justify-center sm:w-full sm:overflow-x-auto items-center gap-3 py-2">
        <div className="flex flex-row justify-start items-center gap-2">
          <Link href="/">
            <button className="text-2xl font-bold">Home</button>
          </Link>
        </div>
        <div className="flex flex-row w-full justify-end items-center gap-4">
          {user && (
            <a href="/api/auth/logout">
              <button className="btn btn-primary">Odjava</button>
            </a>
          )}
          {user && (
            <Link href="/profile">
              <button className="btn btn-primary">Korisnički profil</button>
            </Link>
          )}
          {user && (
            <button className="btn btn-primary" onClick={getLatestData}>
              Osvježi preslike
            </button>
          )}
          {!user && (
            <a href="/api/auth/login">
              <button className="btn btn-primary">Prijava</button>
            </a>
          )}
          <Link href="/datatable">
            <button className="btn btn-primary">Datatable</button>
          </Link>
          <a href="/iphones.csv" download="iphones">
            <button className="btn btn-outline-primary">Download CSV</button>
          </a>
          <a href="/iphones.json" download="iphones">
            <button className="btn btn-outline-primary">Download JSON</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavigationTrack;
