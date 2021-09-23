import {Component} from 'react'

import TableRows from '../TableRows'
import Pagination from '../Pagination'

import './index.css'

class DataList extends Component {
  state = {
    dataList: [],
    editableContactId: '',
    name: '',
    role: '',
    email: '',
    activePage: 1,
    checkedList: [],
    searchInput: '',
    checkHeader: false,
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch(
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
    )
    const data = await response.json()
    this.setState({dataList: data})
  }

  /* ----------------------------Search Input Handlers-------------------------- */

  onChangeSearchInput = event => {
    const searchInput = event.target.value.toLowerCase()
    this.setState({searchInput, activePage: 1})
  }

  /* ----------------------------pagination event handlers--------------------- */

  handleClick = id => {
    this.setState({activePage: Number(id), checkHeader: false, checkedList: []})
  }

  handleTotalDecrementArrow = () => {
    const {activePage} = this.state
    if (activePage !== 1) {
      this.setState({activePage: 1, checkHeader: false, checkedList: []})
    }
  }

  handleDecrementArrow = () => {
    this.setState(prevState => {
      if (prevState.activePage > 1) {
        return {
          activePage: prevState.activePage - 1,
          checkHeader: false,
          checkedList: [],
        }
      }
      return {activePage: prevState.activePage}
    })
  }

  handleIncrementArrow = () => {
    const {dataList} = this.state
    const lastPage = Math.ceil(dataList.length / 10)
    this.setState(prevState => {
      if (prevState.activePage < lastPage) {
        return {
          activePage: prevState.activePage + 1,
          checkHeader: false,
          checkedList: [],
        }
      }
      return {activePage: prevState.activePage}
    })
  }

  handleTotalIncrementArrow = () => {
    const {dataList, activePage} = this.state
    const lastPAge = Math.ceil(dataList.length / 10)
    if (activePage !== lastPAge) {
      this.setState({activePage: lastPAge, checkHeader: false, checkedList: []})
    }
  }

  /* --------------------------------Editable action Events-------------------- */

  onChangeInput = (name, value) => {
    this.setState({[name]: value})
  }

  handleSave = id => {
    const {name, role, email, dataList} = this.state
    const elementIndex = dataList.findIndex(ele => ele.id === id)
    const newDataList = [...dataList]
    newDataList[elementIndex] = {
      ...newDataList[elementIndex],
      name,
      role,
      email,
    }
    console.log(id)
    this.setState({dataList: newDataList})
    this.setState({editableContactId: ''})
  }

  cancel = () => {
    this.setState({editableContactId: ''})
  }
  /* ----------------------delete event handlers--------------------- */

  delete = id => {
    const {dataList} = this.state
    const elementIndex = dataList.findIndex(ele => ele.id === id)
    if (elementIndex !== -1) {
      dataList.splice(elementIndex, 1)
    }
    this.setState({dataList, checkHeader: false})
  }

  handleEdit = eachData => {
    this.setState({
      editableContactId: eachData.id,
      name: eachData.name,
      role: eachData.role,
      email: eachData.email,
    })
  }

  deleteSelected = () => {
    const {checkedList} = this.state
    checkedList.forEach(ele => this.delete(ele))
    this.setState({checkedList: []})
  }

  /* ------------------------Checker Handlers------------------ */

  onChecked = data => {
    const {checkedList} = this.state
    const idIndex = checkedList.findIndex(ele => ele === data)
    if (idIndex !== -1) {
      checkedList.splice(idIndex, 1)
    } else {
      checkedList.push(data)
    }
    this.setState({checkedList})
  }

  onCheckedMultiple = () => {
    const {dataList, activePage} = this.state
    const indexOfLastItem = activePage * 10
    const indexOfFirstItem = indexOfLastItem - 10
    const slicedList = dataList.slice(indexOfFirstItem, indexOfLastItem)
    slicedList.forEach(ele => this.onChecked(ele.id))
    this.setState(prevState => ({checkHeader: !prevState.checkHeader}))
  }

  /* ------------------------Render Function------------------ */

  render() {
    const {
      dataList,
      editableContactId,
      activePage,
      searchInput,
      checkedList,
      checkHeader,
    } = this.state

    const filteredDataList = dataList.filter(
      ele =>
        ele.name.toLowerCase().includes(searchInput) ||
        ele.email.toLowerCase().includes(searchInput) ||
        ele.role.toLowerCase().includes(searchInput),
    )

    const indexOfLastItem = activePage * 10
    const indexOfFirstItem = indexOfLastItem - 10
    const currentDataList = filteredDataList.slice(
      indexOfFirstItem,
      indexOfLastItem,
    )

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(filteredDataList.length / 10); i += 1) {
      pageNumbers.push(i)
    }

    return (
      <div className="table-container">
        <input
          type="search"
          placeholder="Search by name, email or role"
          onChange={this.onChangeSearchInput}
          defaultValue={searchInput}
          className="search-input"
        />
        <TableRows
          userList={currentDataList}
          onChangeInput={this.onChangeInput}
          handleSave={this.handleSave}
          removeRow={this.delete}
          cancel={this.cancel}
          checkedList={checkedList}
          onChecked={this.onChecked}
          onCheckedMultiple={this.onCheckedMultiple}
          handleEdit={this.handleEdit}
          editableContactId={editableContactId}
          checkHeader={checkHeader}
        />
        <button
          className="delete-button"
          type="button"
          onClick={this.deleteSelected}
        >
          Delete Selected
        </button>
        <Pagination
          pageNumbers={pageNumbers}
          handleTotalDecrementArrow={this.handleTotalDecrementArrow}
          handleDecrementArrow={this.handleDecrementArrow}
          handleIncrementArrow={this.handleIncrementArrow}
          handleTotalIncrementArrow={this.handleTotalIncrementArrow}
          handleClick={this.handleClick}
          activePage={activePage}
        />
      </div>
    )
  }
}

export default DataList
