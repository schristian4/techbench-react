import { cityDataType } from '../../data/cityDataTypes'
import { DropDownList } from '../DropDown/DropDownComponent'

export const NavBar = ({
  dataObject,
  selectedOption,
  setSelectedOption,
}: {
  dataObject: cityDataType[]
  selectedOption: string
  setSelectedOption: Function
}) => {
  return (
    <nav className="navbar navbar-dark var-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#">
          AlertSite Technical Bench
        </a>
        <i className="check"></i>
      </div>
      <select
        title="City DropDown Menu"
        id="cityDropDown"
        className="form-select dropdown-toggle"
        defaultValue={selectedOption}
        
        onChange={(e) => {
          let optionSelect = e.target.value
          setSelectedOption(optionSelect)
        }}
      >
        <DropDownList dataObject={dataObject} />
      </select>
    </nav>
  )
}
