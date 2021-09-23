import {FiEdit} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'
import {FaSave} from 'react-icons/fa'
import {GiCancel} from 'react-icons/gi'

import './index.css'

const TableRows = props => {
  const {
    userList,
    checkedList,
    onChangeInput,
    handleSave,
    cancel,
    removeRow,
    onChecked,
    editableContactId,
    handleEdit,
    onCheckedMultiple,
    checkHeader,
  } = props

  const ChangeInput = event => {
    onChangeInput(event.target.name, event.target.value)
  }

  const editRow = data => {
    handleEdit(data)
  }

  const saveEdit = id => {
    handleSave(id)
  }

  const cancelEdit = () => {
    cancel()
  }

  const deleteRow = id => {
    removeRow(id)
  }

  const checkRow = id => {
    onChecked(id)
  }

  const checkMultipleRows = () => {
    onCheckedMultiple()
  }

  const renderEditableRow = eachData => (
    <tr key={eachData.id}>
      <td>
        <input type="checkbox" className="checkbox" />
      </td>
      <td>
        <input
          className="input-edit"
          type="text"
          defaultValue={eachData.name}
          name="name"
          onChange={e => ChangeInput(e)}
        />
      </td>
      <td>
        <input
          className="input-edit"
          type="text"
          defaultValue={eachData.email}
          name="email"
          onChange={e => ChangeInput(e)}
        />
      </td>
      <td>
        <input
          className="input-edit"
          type="text"
          defaultValue={eachData.role}
          name="role"
          onChange={e => ChangeInput(e)}
        />
      </td>
      <td className="icon-column">
        <FaSave
          className="action-green-icon"
          onClick={() => saveEdit(eachData.id)}
        />
        <GiCancel className="action-red-icon" onClick={cancelEdit} />
      </td>
    </tr>
  )

  const renderReadOnlyRow = eachData => {
    const selectedRow = checkedList.includes(eachData.id)
      ? 'selected-row'
      : null
    const checkedValue = checkedList.includes(eachData.id)
    return (
      <tr key={eachData.id}>
        <td className={selectedRow}>
          <input
            type="checkbox"
            className="checkbox"
            checked={checkedValue}
            onChange={() => checkRow(eachData.id)}
          />
        </td>
        <td className={selectedRow}>{eachData.name}</td>
        <td className={selectedRow}>{eachData.email}</td>
        <td className={selectedRow}>{eachData.role}</td>
        <td className={selectedRow}>
          <div className="icon-column">
            <FiEdit
              className="action-green-icon"
              onClick={() => editRow(eachData)}
            />

            <MdDelete
              className="action-red-icon"
              onClick={() => deleteRow(eachData.id)}
            />
          </div>
        </td>
      </tr>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              className="checkbox"
              checked={checkHeader}
              onChange={checkMultipleRows}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userList.map(eachData => (
          <>
            {editableContactId === eachData.id
              ? renderEditableRow(eachData)
              : renderReadOnlyRow(eachData)}
          </>
        ))}
      </tbody>
    </table>
  )
}

export default TableRows
