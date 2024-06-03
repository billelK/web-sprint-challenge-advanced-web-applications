// Import the Spinner component into this file and test
import '@testing-library/jest-dom'
import { render,screen } from "@testing-library/react"
import React from "react"
import Spinner from "./Spinner"
// that it renders what it should for the different props it can take.
test('sanity', () => {
  render(<Spinner on={true}/>)
  expect(screen.queryByTestId("spinner-text")).toBeInTheDocument()
  screen.debug() 
})
