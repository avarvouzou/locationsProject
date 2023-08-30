import Header from "@/components/Header";
import CardGrid from "@/components/TripGrid";
import Trip from "@/models/Trip";
import {GetServerSidePropsContext} from "next";
import React from "react";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import { useRouter } from 'next/router'

interface Props {
  trips: Trip[],
  totalPageCount: number,
  term: string,
  currentPage: number
}

const Page = (props: Props) => {
  const {
    term,
    currentPage,
    trips,
    totalPageCount
  } = props
 
  const router = useRouter()

  const handlePageChange = (newPage: number) => {
    router.push({
      query: { page: newPage },
    })
  };

  const handleSearch = (newTerm: string) => {
    router.push({
      query: { term: newTerm },
    })
  };


  return (
    <div style={{ overflow: "hidden", height: "100vh" }}>
      <Header/>
      <SearchBox onSearch={handleSearch} initialValue={term} />
      <CardGrid data={trips} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPageCount}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Import the mock data
  const allTrips = await import('@/mock/data.json');

  // Destructure the query parameters
  let { term = "", page = 0 } = context.query;
  let termString = term as string
  // Convert page to number
  page = Number(page);

  // Filter the data based on the term
  const filteredTrips = allTrips.default.filter(trip => trip.title.toLowerCase().includes(termString.toLowerCase()));

  // Pagination: 8 items per page
  const itemsPerPage = 8;
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;

  // Slice the data to simulate pagination
  const trips = filteredTrips.slice(start, end);

  // Calculate total pages
  const totalPageCount = Math.ceil(filteredTrips.length / itemsPerPage);

  return {
    props: {
      trips: trips,
      totalPageCount: totalPageCount,
      term: term,
      currentPage: page
    }
  };
}

export default Page;
