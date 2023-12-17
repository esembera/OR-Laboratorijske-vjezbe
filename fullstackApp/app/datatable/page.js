"use client";
import { useEffect, useState } from "react";
import { getDatabase } from "@/lib/mongo/db";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function Datatable() {
  const [database, setDatabase] = useState(null);
  const [filteredDatabase, setFilteredDatabase] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Svi atributi");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [producers, setProducers] = useState([]);

  const filterData = (database, filter, search) => {
    if (!database) return null;

    return database.filter((element) => {
      if (filter === "Svi atributi" && search != "") {
        return (
          element.Model.toLowerCase().includes(search.toLowerCase()) ||
          element.Producer.some((producer) =>
            producer.name.toLowerCase().includes(search.toLowerCase())
          ) ||
          element.Year.toString().includes(search.toLowerCase()) ||
          element["Screen size"].toString().includes(search.toLowerCase()) ||
          element.Weight.toString().includes(search.toLowerCase()) ||
          element["Base storage"].toString().includes(search.toLowerCase()) ||
          element.RAM.toString().includes(search.toLowerCase()) ||
          element.Battery.toString().includes(search.toLowerCase()) ||
          element.Chipset.toLowerCase().includes(search.toLowerCase()) ||
          element["Launch OS"].toLowerCase().includes(search.toLowerCase()) ||
          element["Launch price"].toString().includes(search.toLowerCase())
        );
      } else if (filter === "Model") {
        return element.Model.toLowerCase().includes(search.toLowerCase());
      } else if (filter === "Producer") {
        return element.Producer.some((producer) =>
          producer.name.toLowerCase().includes(search.toLowerCase())
        );
      } else if (filter === "Year") {
        return element.Year.toString().includes(search.toLowerCase());
      } else if (filter === "Screen size") {
        return element["Screen size"].toString().includes(search.toLowerCase());
      } else if (filter === "Weight") {
        return element.Weight.toString().includes(search.toLowerCase());
      } else if (filter === "Base storage") {
        return element["Base storage"]
          .toString()
          .includes(search.toLowerCase());
      } else if (filter === "RAM") {
        return element.RAM.toString().includes(search.toLowerCase());
      } else if (filter === "Battery") {
        return element.Battery.toString().includes(search.toLowerCase());
      } else if (filter === "Chipset") {
        return element.Chipset.toLowerCase().includes(search.toLowerCase());
      } else if (filter === "Launch OS") {
        return element["Launch OS"]
          .toLowerCase()
          .includes(search.toLowerCase());
      } else if (filter === "Launch price") {
        return element["Launch price"]
          .toString()
          .includes(search.toLowerCase());
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await getDatabase().then((data) => {
          const temp = JSON.parse(data);
          setDatabase(temp);
          getProducerNames(temp);
          console.log(temp);
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const getProducerNames = (database) => {
    const tempProducers = [];
    database.map((element) => {
      const tempId = element._id;
      tempProducers.push({
        [tempId]: element.Producer.map((producer) => producer.name),
      });
    });
    setProducers(tempProducers);
    console.log(producers);
  };

  useEffect(() => {
    setLoading(true);
    if (database) {
      const newData = filterData(database, filter, search);
      setFilteredDatabase(newData);
      if (newData) {
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
      }
    }
  }, [search, filter, database]);

  const downloadToCSV = () => {
    console.log(filteredDatabase);
    if (filteredDatabase.length !== 0 && filteredDatabase !== null) {
      const csvData = Papa.unparse(filteredDatabase);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "filtered_data.csv");
      return;
    }
    console.log(database);
    const csvData = Papa.unparse(database);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "filtered_data.csv");
  };

  const downloadToJSON = () => {
    if (filteredDatabase !== null && filteredDatabase.length !== 0) {
      const jsonData = JSON.stringify(filteredDatabase);
      const blob = new Blob([jsonData], {
        type: "text/json;charset=utf-8",
      });
      saveAs(blob, "filtered_data.json");
      return;
    }
    const jsonData = JSON.stringify(database);
    const blob = new Blob([jsonData], {
      type: "text/json;charset=utf-8",
    });
    saveAs(blob, "filtered_data.json");
  };

  return (
    <div>
      <div className="flex flex-col justify-start px-4 sm:flex-row sm:items-center sm:justify-center sm:w-full sm:overflow-x-auto items-center gap-3 py-2">
        <div className="flex flex-row items-center gap-3">
          <label htmlFor="search">Pretraga</label>
          <input
            type="text"
            name="search"
            id="pretraga"
            className="border border-gray-300 rounded-md p-1 text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            name="filter"
            id="atribut"
            className="text-black"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="Svi atributi" className="text-black">
              Svi atributi (wildcard)
            </option>
            <option value="Base storage" className="text-black">
              Base storage
            </option>
            <option value="Battery" className="text-black">
              Battery
            </option>
            <option value="Chipset" className="text-black">
              Chipset
            </option>
            <option value="Launch OS" className="text-black">
              Launch OS
            </option>
            <option value="Launch price" className="text-black">
              Launch price
            </option>
            <option value="Model" className="text-black">
              Model
            </option>
            <option value="Producer" className="text-black">
              Producer
            </option>
            <option value="RAM" className="text-black">
              RAM
            </option>
            <option value="Screen size" className="text-black">
              Screen size
            </option>
            <option value="Weight" className="text-black">
              Weight
            </option>
            <option value="Year" className="text-black">
              Year
            </option>
          </select>
          <button
            className="btn btn-outline-primary flex flex-row items-center gap-2"
            onClick={() => {
              setSearch("");
              setFilter("Svi atributi");
            }}
          >
            Obriši pretragu
          </button>
        </div>
        <div className="flex flex-row w-full justify-end items-center gap-4">
          <Link href="/">
            <button className="btn btn-primary">Home</button>
          </Link>
          <button className="btn btn-outline-primary" onClick={downloadToCSV}>
            Download CSV
          </button>
          <button className="btn btn-outline-primary" onClick={downloadToJSON}>
            Download JSON
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <Table aria-label="tablica iphonea" id="tablica">
          <TableHeader>
            <TableColumn align="center">Model</TableColumn>
            <TableColumn align="center">Producer</TableColumn>
            <TableColumn align="center">Year</TableColumn>
            <TableColumn align="center">Screen size</TableColumn>
            <TableColumn align="center">Weight</TableColumn>
            <TableColumn align="center">Base storage</TableColumn>
            <TableColumn align="center">RAM</TableColumn>
            <TableColumn align="center">Battery</TableColumn>
            <TableColumn align="center">Chipset</TableColumn>
            <TableColumn align="center">Launch OS</TableColumn>
            <TableColumn align="center">Launch price</TableColumn>
          </TableHeader>
          <TableBody>
            {search === "" && database
              ? database.map((element) => (
                  <TableRow key={element._id}>
                    <TableCell align="center">{element.Model}</TableCell>
                    <TableCell align="center">
                      {element.Producer.map((producer) => producer.name + ", ")}
                    </TableCell>
                    <TableCell align="center">{element.Year}</TableCell>
                    <TableCell align="center">
                      {element["Screen size"]}"
                    </TableCell>
                    <TableCell align="center">{element.Weight}</TableCell>
                    <TableCell align="center">
                      {element["Base storage"]}
                    </TableCell>
                    <TableCell align="center">{element.RAM}</TableCell>
                    <TableCell align="center">{element.Battery}</TableCell>
                    <TableCell align="center">{element.Chipset}</TableCell>
                    <TableCell align="center">{element["Launch OS"]}</TableCell>
                    <TableCell align="center">
                      {element["Launch price"]} $
                    </TableCell>
                  </TableRow>
                ))
              : filteredDatabase
              ? filteredDatabase.map((element) => (
                  <TableRow key={element._id}>
                    <TableCell align="center">{element.Model}</TableCell>
                    <TableCell align="center">
                      {element.Producer.map((producer) => producer.name + ", ")}
                    </TableCell>
                    <TableCell align="center">{element.Year}</TableCell>
                    <TableCell align="center">
                      {element["Screen size"]}"
                    </TableCell>
                    <TableCell align="center">{element.Weight}</TableCell>
                    <TableCell align="center">
                      {element["Base storage"]}
                    </TableCell>
                    <TableCell align="center">{element.RAM}</TableCell>
                    <TableCell align="center">{element.Battery}</TableCell>
                    <TableCell align="center">{element.Chipset}</TableCell>
                    <TableCell align="center">{element["Launch OS"]}</TableCell>
                    <TableCell align="center">
                      {element["Launch price"]}$
                    </TableCell>
                  </TableRow>
                ))
              : "Nema podataka"}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
