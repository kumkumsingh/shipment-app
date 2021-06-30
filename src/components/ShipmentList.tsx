import * as React from 'react'
import { Header } from 'semantic-ui-react'
import { fetchShipment } from '../services/shipment'
import { useEffect, useContext, useState } from 'react'
import { AppContext } from '../provider/storeContext'
import 'react-toastify/dist/ReactToastify.css'
import ShipmentListItem from './ShipmentListItem'
import './style.css'

const ShipmentList = () => {
  const { state, dispatch } = useContext(AppContext)
  const [currentPage, setcurrentPage] = useState<number>(1)
  const itemsPerPage = 2
  const pageNumberLimit = 5
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState<number>(2)
  const [minPageNumberLimit, setminPageNumberLimit] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShipment()
      dispatch({ type: 'FETCH_SHIPMENT', payload: data })
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    setcurrentPage(1)
  }, [state?.shipments])

  const pages = []
  for (let i = 1; i <= Math.ceil(state?.shipments?.length / itemsPerPage); i++) {
    pages.push(i)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = state?.shipments?.slice(indexOfFirstItem, indexOfLastItem)

  const handleClick = (id: string) => {
    setcurrentPage(Number(id))
  }

  const renderPageNumbers = pages.map((pageNum) => {
    if (parseInt(`${pageNum}`) < maxPageNumberLimit + 1 && parseInt(`${pageNum}`) > minPageNumberLimit) {
      return (
        <li
          key={pageNum}
          id={`${pageNum}`}
          onClick={() => handleClick(`${pageNum}`)}
          className={currentPage === parseInt(`${pageNum}`) ? 'active' : undefined}
        >
          {pageNum}
        </li>
      )
    } else {
      return null
    }
  })

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1)

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1)

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  const renderData = currentItems?.map((item, i) => {
    return (
      <div key={i}>
        <ShipmentListItem shipment={item} />
      </div>
    )
  })

  return (
    <React.Fragment>
      <Header as="h2" textAlign="center" color="blue">
        Your shipment lists
      </Header>
      <div className="detail-conatiner">{renderData}</div>
      {currentItems?.length >= 1 ? (
        <ul className="pageNumbers">
          <li>
            <button onClick={handlePrevbtn} disabled={currentPage === pages[0]}>
              Prev
            </button>
          </li>
          {renderPageNumbers}
          <li>
            <button onClick={handleNextbtn} disabled={currentPage === pages[pages.length - 1]}>
              Next
            </button>
          </li>
        </ul>
      ) : (
        <p style={{textAlign:'center'}}> Oops !! No shipments found , please create your shipment list &#x1F60a;</p>
      )}
    </React.Fragment>
  )
}

export default ShipmentList
