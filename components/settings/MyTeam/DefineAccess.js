import Toogle from "../../ui/Toggle"

const DefineAccess = ({ access, setAccess }) => {
  const toggleView = (isOn, module) => {
    let updated = { ...access }
    if (isOn) {
      updated[module] = [...updated[module], "view"]
    } else {
      updated[module] = updated[module].filter((m) => m !== "view")
    }
    setAccess(updated)
  }

  const toggleEdit = (isOn, module) => {
    let updated = { ...access }
    if (isOn) {
      updated[module] = [...updated[module], "edit"]
    } else {
      updated[module] = updated[module].filter((m) => m !== "edit")
    }
    setAccess(updated)
  }

  const toggleAdd = (isOn, module) => {
    let updated = { ...access }
    if (isOn) {
      updated[module] = [...updated[module], "add"]
    } else {
      updated[module] = updated[module].filter((m) => m !== "add")
    }
    setAccess(updated)
  }

  return (
    <div className="flex flex-col gap-6 py-2 mt-11 content-center">
      {Object.keys(access).map((module) => (
        <div key={module} className="flex justify-between max-w-4xl">
          <span className="text-base text-primary font-bold mr-10">
            {module}
          </span>
          <div className=" flex gap-40">
            <Toogle
              label="View"
              checked={access[module].includes("view")}
              onChange={(isOn) => toggleView(isOn, module)}
            />

            <Toogle
              label="Edit"
              checked={access[module].includes("edit")}
              onChange={(isOn) => toggleEdit(isOn, module)}
            />

            <Toogle
              label="Add"
              checked={access[module].includes("add")}
              onChange={(isOn) => toggleAdd(isOn, module)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default DefineAccess
