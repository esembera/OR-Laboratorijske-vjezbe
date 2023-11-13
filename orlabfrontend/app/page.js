"use client";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="container w-full mx-auto">
      <div className="flex flex-col justify-start sm:flex-row sm:items-center sm:justify-center sm:w-full sm:overflow-x-auto items-center gap-3 py-2">
        <div className="flex flex-row w-full justify-end items-center gap-4">
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
      <div className="mt-10">
        <h1 className="text-4xl">Kolegij Otvoreno računarstvo</h1>
        <Divider className="my-4" />
        <section>
          <h2>Repozitorij za laboratorijske vježbe</h2>
          <Divider className="my-4" />
          <ul>
            <li>
              <strong>Autor:</strong> Ernest Šembera
              <Divider className="my-4" />
            </li>
            <li>
              <strong>Verzija skupa:</strong> 1.0
              <Divider className="my-4" />
            </li>
            <li>
              <strong>Jezik skupa:</strong> engleski
              <Divider className="my-4" />
            </li>
            <li>
              <strong>Datum objave:</strong> 2023-30-10
            </li>
            <Divider className="my-4" />
            <li>
              <strong>Format datuma:</strong> ISO 8601
            </li>
            <Divider className="my-4" />
            <li>
              <strong>Licencija:</strong> CC-NC
            </li>
            <Divider className="my-4" />
            <li>
              <strong>Tema:</strong> Modeli Apple iPhonea
            </li>
            <Divider className="my-4" />
            <li>
              <strong>Atributi:</strong>
              <ul>
                <li>
                  Producer, Model, Year, Launch price, Base storage, Screen
                  size, RAM, Battery, Launch OS, Chipset, Weight.
                </li>
                <li>
                  Producer je child od iPhonea, te se sastoji od atributa name i
                  country.
                </li>
              </ul>
            </li>
            <Divider className="my-4" />
            <li>
              <strong>Vremenski period koji pokriva skup podataka:</strong>{" "}
              2014.-2020.
            </li>
            <Divider className="my-4" />
          </ul>
        </section>
      </div>
    </div>
  );
}
