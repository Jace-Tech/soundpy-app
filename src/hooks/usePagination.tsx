/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"

interface IusePagination { 
  isLoading: boolean;
  isLoadingMore: boolean;
  page: number;
  perPage: number;
  totalContents: number;
  data: any[];
  handlePerPageChange: (arg: number) => void;
  handlePageChange: (arg: number) => void;
  handleFetchRequest: (page: number, perPage: number) => Promise<void>;
  handleFilterRequest: (search: string) => Promise<void>;
  handleFetchMore: () => Promise<void>;
} 

const usePagination = (func: (page: number, __perPage: number, filter?: string) => Promise<any>, _perPage: number = 12): IusePagination => {
  const [page, setPage] = useState<number>(0)
  const [, setMorePage] = useState<number>(0)
  const [totalContents, setTotalContents] = useState<number>(0)
  const [perPage, setPerPage] = useState<any>(_perPage)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingMore] = useState<boolean>(false)
  const [data, setData] = useState<any[]>([])


  const handleFilterRequest = async (filter: string) => {
    try {
      setIsLoading(true)
      const result = await func(page, perPage, filter);
      if(!result.success) return
      setPage(result?.data.page || 0)
      setMorePage(result?.data.page || 0)
      setData(result?.data.contents)
      setIsLastPage(result?.data.isLastPage)
      setTotalContents(result?.data.total || 0)
    }
    catch(error: any) {
      console.log("ERROR: ", error.message)
    }
    finally {
      setIsLoading(false)
    }
  }


  const handleFetchMore = async () => {
    console.log({ isLastPage })

    // if(isLastPage) return
    //  try {
    //   setIsLoadingMore(true)
    //   const result = await func(morePage + 1, perPage);
    //   if(!result.success) return
    //   console.log("RESULT DATA:", JSON.stringify(result, null, 4))
    //   setMorePage(result?.data.page)
    //   setIsLastPage(result?.data.isLastPage)
    //   setData(prev => [...prev, ...result?.data.contents])
    //   setTotalContents(result?.data.total || 0)
    // }
    // catch(error: any) {
    //   console.log("ERROR: ", error.message)
    // }
    // finally {
    //   setIsLoadingMore(false)
    // }
  }

  const handleFetchRequest = async (page: number, perPage: number) => {
    try {
      setIsLoading(true)
      const result = await func(page, perPage) || {};
      if(!result.success) return
      setPage(result?.data.page || 0)
      setData(result?.data.contents)
      setTotalContents(result?.data.total || 0)
    }
    catch(error: any) {
      console.log("ERROR: ", error.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (no: number) => {
    setPage(no)
    handleFetchRequest(no, perPage)
  }

  const handlePerPageChange = (no: number) => {
    setPerPage(no)
    handleFetchRequest(0, no)
  }

  useEffect(() => {
    handleFetchRequest(page, perPage)
  }, [])

  return { isLoading, isLoadingMore, 
    page, totalContents, perPage, data, handlePageChange, handlePerPageChange, handleFetchRequest, handleFilterRequest, handleFetchMore }
}

export default usePagination