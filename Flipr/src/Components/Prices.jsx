import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Price() {
  const [PriceData, setPriceData] = useState([]);
  const [NOblesData, setNOblesData] = useState([]);
  const [OrignalData, setOrignalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYears, setSelectedYears] = useState(['all']);
  const [selectedCategory, setSelectedCategory] = useState(['all']);
  const [hoveredData, setHoveredData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(PriceData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = PriceData.slice(
    indexOfFirstRecord,
    indexOfLastRecord > PriceData.length ? undefined : indexOfLastRecord
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleYearChange = (event) => {
    setLoading(true);
    const years = event?.target?.value;
    setSelectedYears(years);
  };
  function findDuplicateIds(array, key) {
    const idCounts = {};
    const duplicateNames = [];
  
    array.forEach((item) => {
      const itemId = item[key];
      idCounts[itemId] = (idCounts[itemId] || 0) + 1;
  
      if (idCounts[itemId] === 2) {
        duplicateNames.push(`${item.firstname} ${item.surname}`);
      }
    });
  
    return Array.from(duplicateNames);
  }
  const handleCategoryChange = (event) => {
    setLoading(true);
    const category = event?.target?.value;
    setSelectedCategory(category);
  };
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.nobelprize.org/v1/prize.json`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
       
        const filteredData =
          selectedYears.includes("all") || selectedCategory.includes("all") 
            ? responseJson.prizes
            : responseJson.prizes.filter((prize) => {
                return (
                  (selectedYears.length === 0 ||
                    selectedYears.includes(prize.year)) &&
                  (selectedCategory.length === 0 ||
                    selectedCategory.includes(prize.category))
                );
              });

        setPriceData(filteredData);
        setOrignalData(responseJson.prizes);
        if (responseJson && responseJson.prizes) {
          const allLaureates = responseJson.prizes.flatMap((prize) => prize.laureates || []);
          const filteredNobles = findDuplicateIds(allLaureates, 'id');
          
          console.log(filteredNobles);
          setNOblesData(filteredNobles);
        }
          // Do something with the filtered prizes
        
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [selectedYears, selectedCategory]);

  const handleMouseEnter = (data) => {
    setHoveredData(data);
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  return (
    <>
      <div className=" flex flex-col w-screen pt-8 h-[100%] ">
        <div className="flex flex-row justify-between px-8 w-[100%] pb-8">
          <h1 className="text-4xl  text-start text-black font-bold  mb-4">
            Multiple Nobel Prices
            <div className="justify-start">
            <div>1.{NOblesData[0]}</div>
            <div>2.{NOblesData[1]}</div>

            <div>3.{NOblesData[2]}</div>

            <div>4.{NOblesData[3]}</div>
          </div>
          </h1>
         
          <div className="">
            <FormControl>
              <InputLabel className="text-black" id="filter-by-year-label">
                Filter by Year:
              </InputLabel>
              <Select
                style={{
                  margin: "2px",
                  border: "5px solid rgb(234, 179, 8)",
                }}
                labelId="filter-by-year-label"
                id="filter-by-year-select"
                className="text-black w-80"
                onChange={handleYearChange}
                value={selectedYears}
              >
                <MenuItem value="all">All</MenuItem>
                {Array.from(new Set(OrignalData?.map((prizes) => prizes.year)))
                  .filter((year) => year >= 1900 && year <= 2018)
                  .map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel
                className="text-black flex justify-center items-center "
                id="filter-by-year-label"
              >
                Filter by Category:
              </InputLabel>
              <Select
                style={{
                  margin: "2px",
                  border: "5px solid rgb(234, 179, 8)",
                }}
                labelId="filter-by-category-label"
                id="filter-by-category-select"
                className="text-black w-80"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                {" "}
                <MenuItem value="all">All</MenuItem>
                {Array.from(
                  new Set(OrignalData?.map((prizes) => prizes.category))
                ).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="mt-auto px-10 flex justify-start space-x-2">
          <button
            className="pagination-btn w-8 h-8"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon
              className="cursor-pointer"
              fontSize="medium"
              style={{ color: "#ff0000" }}
            />
          </button>
          <button
            className="pagination-btn w-8 h-8"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon
              className="cursor-pointer"
              fontSize="medium"
              style={{ color: "#ff0000" }}
            />
          </button>
        </div>
        <p className="mt-auto px-10 pb-4 flex justify-start  text-black">
          Page {currentPage} of {totalPages}
        </p>
          </div>
        </div>
        <div>
          <div className="flex-1  container  ">
            {loading ? (
              <div className=" p-2 mt-8 ml-8 mr-8 mb-8 rounded-lg shadow-lg ">
                <div className="flex justify-center items-center flex-row gap-3">
                  <div className="w-4 h-4 rounded-full  bg-yellow-500 animate-bounce"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 animate-bounce [animation-delay:-.5s]"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white shadow-md rounded overflow-x-auto">
                  <TableContainer component={Paper}>
                    <Table className="min-w-full">
                      <TableHead>
                        <TableRow>
                          <TableCell className="px-6 py-3 text-left bg-yellow-500 font-bold text-yellow md:text-lg lg:text-xl xl:text-2xl border-r w-1/6 border-yellow-700">
                            Year
                          </TableCell>
                          <TableCell className="px-6 py-3 text-left bg-yellow-500 font-bold text-black md:text-lg lg:text-xl xl:text-2xl border-r w-1/6 border-yellow-700">
                            Category
                          </TableCell>
                          <TableCell className="px-6 py-3 text-left bg-yellow-500 font-bold text-black md:text-lg lg:text-xl xl:text-2xl border-r w-1/6 border-yellow-700">
                            Name
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentRecords.map((Prizes) => (
                          <TableRow
                            key={Prizes.id}
                            className={`hover:bg-gray-200 ${
                              hoveredData === Prizes.name ? "bg-gray-200" : ""
                            }`}
                          >
                            <TableCell className="px-6 border-r border-gray py-4">
                              <div
                                className="flex items-center"
                                onMouseEnter={() =>
                                  handleMouseEnter(Prizes.name)
                                }
                                onMouseLeave={handleMouseLeave}
                              >
                                <span className="mr-4 ">{Prizes.year}</span>
                                {hoveredData === Prizes.year && (
                                  <DeleteForeverIcon
                                    className="text-red-400 cursor-pointer"
                                    fontSize="medium"
                                    onClick={() => handleDelete(Prizes.id)}
                                  />
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="px-6 border-r h-20 border-gray py-4">
                              {Prizes.category}
                            </TableCell>
                            <TableCell className="px-6 border-r h-20 border-gray py-4">
                              {Prizes.laureates.map((member, innerIndex) => (
                                <div key={innerIndex}>
                                  {member.firstname + " " + member.surname}
                                  <span className="text-xs">,</span>
                                </div>
                              ))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
}

export default Price;

